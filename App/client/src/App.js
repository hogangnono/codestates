/* eslint-disable linebreak-style */
import React, { Component } from "react";
import * as d3 from "d3";
import axios from "axios";
import Toolbox from "./Toolbox";
import CustomOverlay from "./CustomOverlay";
import "./App.css";

class App extends Component {
  state = {
    map: undefined,
    name: "jihun",
    factor: ""
  };

  componentDidMount() {
    this.drawingComponent();
    this.mainPageLoad();
  }

  drawingComponent = () => {
    let startPos;
    const naver = window.naver;
    const map = new naver.maps.Map(d3.select("#map").node(), this.mapOption());
    this.setState({ map });

    naver.maps.Event.addListener(map, "click", e => {
      console.log("click");
      // coord: lat, lng of map
      // offset: x, y of screen
      const { coord, offset } = e;
      startPos = { coord, offset };
    });

    naver.maps.Event.addListener(map, "rightclick", e => {
      console.log("right click");
      const { coord, offset } = e;
      const endPos = { coord, offset };
      new CustomOverlay({
        position: { startPos, endPos },
        naverMap: map
      }).setMap(map);
    });
  };

  mapOption = () => {
    const naver = window.naver;
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
      },
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT
      },
      scaleControl: true,
      scaleControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT
      },
      mapDataControl: true,
      mapDataControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT
      }
    };
    return mapOptions;
  };

  mainPageLoad = () => {
    const { name, factor } = this.state;
    const naver = window.naver;
    const map = new naver.maps.Map(d3.select("#map").node(), this.mapOption());

    axios
      .post("http://127.0.0.1:3001/user/load", {
        name,
        factor
      })
      .then(async result => {
        const resultData = await result.data;
        if (result.status === 200 || result.status === 201) {
          resultData.map(el => {
            const parseFigures = JSON.parse(el.figures);
            const startPos = parseFigures.startPos;
            const endPos = parseFigures.endPos;
            return new CustomOverlay({
              position: { startPos, endPos },
              naverMap: map
            }).setMap(map);
          });
        } else if (result.status === 204) {
          alert("호재 데이터 정보 없음");
        }
      })
      .catch(error => {
        if (error.response.status === 500) {
          console.log(error);
          alert("load fail");
        } else {
          alert("error!");
        }
      });
  };

  render() {
    const { map } = this.state;
    return (
      <div id="wrapper">
        <div id="map" style={{ height: "100vh" }} />
        <Toolbox map={map} />
      </div>
    );
  }
}

export default App;
