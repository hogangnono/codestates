import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
// import Toolbox from './Toolbox';
import CircleButton from './Components/CircleButton';
import './App.less';
import Circle from './CustomOverlay/Circle';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'jihun',
            factor: '',
            map: undefined, // Will set state to naver map instance
            circleToggle: true, // Indicates whether to create circle
            toggleColor: true
        };

    }

    componentDidMount() {
        const naver = window.naver;
        const map = new naver.maps.Map(
            d3.select('#map').node(),
            this.mapOption()
        );

        this.setState({ map: map });

        this.mainPageLoad(map);
    }

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

    mainPageLoad = (map) => {
        const { name, factor } = this.state;
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
                        return new Circle({
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

    mouseClick = (e) => {
        const { circleToggle } = this.state;
        console.log('circleToggle ', circleToggle);
        const { toggleColor } = this.state;
        console.log('toggleColor ', toggleColor);
        if (e.type === 'contextmenu' && circleToggle !== true) {

            this.setState({ toggleColor: !toggleColor });
            this.setState({ circleToggle: !circleToggle });
        }
    }

    render() {
        const { map } = this.state;
        const { circleToggle } = this.state;
        const { toggleColor } = this.state;
        console.log('in App.js states: ', this.state);
        return (
            <div id="wrapper">
                <div id="map" onClick={this.mouseClick} onContextMenu={this.mouseClick} onKeyDown={this.mouseClick}>
                </div>
                <CircleButton map={map} circleToggle={circleToggle} toggleColor={toggleColor} />
            </div>
        );
    }
}

export default App;
