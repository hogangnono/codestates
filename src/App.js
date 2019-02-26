import React, { Component } from 'react';

class App extends Component {
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
      <div id='map' style={{ height: '100vh' }}></div>
    );
  }
}

export default App;
