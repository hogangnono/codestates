import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import Toolbox from './Toolbox';
import LoginModal from './LoginModal';
import './App.less';
import Circle from './CustomOverlay/Circle';
// import Button from './Components/Button'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            // factor: '',
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
                position: naver.maps.Position.LEFT_BOTTOM
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
                position: naver.maps.Position.BOTTOM_RIGHT
            }
        };
        return mapOptions;
    };

    mainPageLoad = map => {
        const { name, bound } = this.state;
        axios
            .post('http://127.0.0.1:3001/user/load', {
                name,
                bound
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
        const { showModal } = this.state;
        this.setState({ showModal: !showModal });
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
                    <div id="loginFavorContainer">
                        <div
                            className="loginFavorBtn"
                            onClick={this.showModal}
                            onKeyPress={this.showModal}
                            role="button"
                            tabIndex="0"
                        >
                            {`My`}
                        </div>
                        <div
                            className="loginFavorBtn"
                            onClick={this.showFilterDrawingTool}
                            onKeyPress={this.showFilterDrawingTool}
                            role="button"
                            tabIndex="0"
                        >
                            {`호재`}
                        </div>
                    </div>
                    {showModal ? (
                        <LoginModal showModal={this.showModal} />
                    ) : null}
                    {showFilterDrawingTool ? (
                        <Toolbox mapLoad={map} drawingData={drawingData} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
