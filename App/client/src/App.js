/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import Toolbox from './Toolbox';
// import CustomOverlay from './CustomOverlay';
// import CustomPolygon from './CustomPolygon';
// import CustomRect from './CustomRect';
// import CustomArrow from './CustomArrow';
import LoginModal from './LoginModal';
import './App.less';
import Circle from './CustomOverlay/Circle';
// import Button from './Components/Button'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            factor: '',
            drawingData: [],
            showFilterDrawingTool: false,
            showModal: false
        };
    }

    componentDidMount = async () => {
        const naver = window.naver;
        const map = await new naver.maps.Map(
            d3.select('#map').node(),
            this.mapOption()
        );

        this.setState({ map: map });
        this.mainPageLoad(map);
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

    mainPageLoad = map => {
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
                // if (error.response.status === 500) {
                //     console.log(error);
                //     alert('load fail');
                // } else {
                //     console.log(error);
                //     alert('error!');
                // }
                alert(error);
            });
    };

    showFilterDrawingTool = () => {
        const { showFilterDrawingTool } = this.state;
        this.setState({ showFilterDrawingTool: !showFilterDrawingTool });
    };

    showModal = () => {
        console.log('my버튼을 눌렀다!');
        this.setState({ showModal: true });
    };

    render() {
        const {
            map,
            drawingData,
            showFilterDrawingTool,
            showModal
        } = this.state;
        return (
            <div id="wrapper">
                <div id="map">
                    <ul id="loginFavorContainer">
                        <li
                            className="loginFavorBtn"
                            onClick={this.showModal}
                            onKeyPress={() => { }}
                        >
                            {`My`}
                        </li>
                        <li
                            className="loginFavorBtn"
                            onClick={this.showFilterDrawingTool}
                            onKeyPress={() => { }}
                        >
                            {`호재`}
                        </li>
                    </ul>
                    {showModal ? <LoginModal /> : null}
                    {showFilterDrawingTool ? (
                        <Toolbox mapLoad={map} drawingdata={drawingData} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
