import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import Toolbox from './Toolbox';
import CustomOverlay from './CustomOverlay';
import './App.less';

class App extends Component {
    state = {
        mapLoad: undefined,
        name: '',
        factor: ''
    };

    componentDidMount() {
        const naver = window.naver;
        const map = new naver.maps.Map(
            d3.select('#map').node(),
            this.mapOption()
        );
        this.setState({ mapLoad: map });
        this.drawingComponent(naver, map);
        this.mainPageLoad(map);
    }

    drawingComponent = (naverPos, mapPos) => {
        let startPos;
        const naver = naverPos;
        const map = mapPos;
        naver.maps.Event.addListener(map, 'click', e => {
            console.log('click');
            // coord: lat, lng of map
            // offset: x, y of screen
            const { coord, offset } = e;
            startPos = { coord, offset };
        });

        naver.maps.Event.addListener(map, 'rightclick', function (e) {
            console.log('right click');
            // only there is a start point
            if (startPos) {
                const { coord, offset } = e;
                const endPos = { coord, offset };
                new CustomOverlay({
                    position: { startPos, endPos },
                    naverMap: map
                }).setMap(map);
                // delete start postion prevent for multiple right click
                // makes multipile figures
                startPos = undefined;
            }
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

    mainPageLoad = mapPos => {
        const { name, factor } = this.state;
        const map = mapPos;
        axios
            .post('http://127.0.0.1:3001/user/load', {
                name,
                factor
            })
            .then(async result => {
                const resultData = await result.data;
                if (result.status === 200 || result.status === 201) {
                    resultData.map(el => {
                        const { startPos, endPos, zoomLevel } = JSON.parse(
                            el.figures
                        );
                        return new CustomOverlay({
                            position: { startPos, endPos },
                            naverMap: map,
                            zoom: zoomLevel
                        }).setMap(map);
                    });
                } else if (result.status === 204) {
                    alert('호재 데이터 정보 없음');
                }
            })
            .catch(error => {
                if (error.response.status === 500) {
                    console.log(error);
                    alert('load fail');
                } else {
                    console.log(error);
                    alert('error!');
                }
            });
    };

    render() {
        const { mapLoad } = this.state;
        return (
            <div id="wrapper">
                <div id="map" />
                <Toolbox mapLoad={mapLoad} />
            </div>
        );
    }
}

export default App;
