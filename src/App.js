import React, { Component } from 'react';
import Toolbox from './Toolbox';
import * as d3 from 'd3';
import Layer from './Layer';
import './App.css'

class App extends Component {
  state = {
    map: undefined
  }
  componentDidMount() {
    let naver = window.naver;
    let mapOptions = {
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
    }
    let map = new naver.maps.Map('map', mapOptions);
    this.setState({ map })
    naver.maps.Event.addListener(map, 'click', function (e) {
      let marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(e.coord.lat(), e.coord.lng()),
        map: map
      });
      console.log(e.coord.lat() + ', ' + e.coord.lng());
    });
  }
  render() {
    return (
      <div id='wrapper'>
        <div id='map' style={{ height: '100vh' }}></div>
        <Toolbox map={this.state.map}></Toolbox>
        <Layer></Layer>
      </div>
    );
  }
}

export default App;
