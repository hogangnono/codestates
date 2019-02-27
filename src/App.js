import React, { Component } from 'react';
import Toolbox from './Toolbox';
import * as d3 from 'd3';
import CustomOverlay from './CustomOverlay'
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
    let map = new naver.maps.Map(d3.select('#map').node(), mapOptions);
    this.setState({ map })
    naver.maps.Event.addListener(map, 'zoom_changed', function (e) {
      console.log('줌 바뀜')
    })

    function resolutionHeightWidth() {
      console.log('resized!');
      return { width: window.innerWidth, height: window.innerHeight };
    }

    window.addEventListener('resize', resolutionHeightWidth);

    /**
     * Add Shape to Map with Cursor
     */
    naver.maps.Event.addListener(map, 'click', (e) => {
      const resolution = resolutionHeightWidth();
      const newCircle = new CustomOverlay(
        {
          position: new naver.maps.LatLng(e.latlng.y, e.latlng.x),
          map,
        }
      );
    });

    // naver.maps.Event.addListener(map, 'click', function (e) { //클릭한 위치에 오버레이를 추가합니다.
    //   console.log('클릭');
    //   // new naver.maps.Marker({
    //   //   map: map,
    //   //   position: e.coord
    //   // });
    //   new CustomOverlay({
    //     position: e.coord
    //   }).setMap(map);
    // });
  }
  render() {
    return (
      <div id='wrapper'>
        <div id='map' style={{ height: '100vh' }}></div>
        <Toolbox map={this.state.map}></Toolbox>
      </div>
    );
  }
}

export default App;
