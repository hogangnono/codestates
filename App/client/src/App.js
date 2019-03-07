import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import Toolbox from './Toolbox';
import LoginModal from './LoginModal';
import NearbyList from './NearbyList';
import './App.less';
import Circle from './CustomOverlay/Circle';

class App extends Component {
    constructor(props) {
        super(props);
        this.bound = undefined;
        this.drawList = {};
        this.state = {
            name: undefined,
            factor: undefined,
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
        this.bound = map.getBounds();
        this.mainPageLoad(map);
        naver.maps.Event.addListener(map, 'idle', e => {
            this.bound = map.getBounds();
            console.log(this.bound);
            this.mainPageLoad(map);
            this.DataDelete();
        });
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
        const { name, factor } = this.state;
        const bound = this.bound;
        axios
            .post('http://127.0.0.1:3001/user/load', {
                name,
                factor,
                bound
            })
            .then(async result => {
                const data = result.data;
                const resultData = await data[0];
                // eslint-disable-next-line no-unused-vars
                const userData = await data[1];
                // if there is user data

                if (result.status === 200 || result.status === 201) {
                    resultData.map(el => {
                        const { startPos, endPos, zoomLevel } = JSON.parse(
                            el.figures
                        );
                        if (!(el.id in this.drawList)) {
                            const overlay = new Circle({
                                position: { startPos, endPos },
                                naverMap: map,
                                zoom: zoomLevel
                            });
                            overlay.setMap(map);
                            this.drawList[el.id] = overlay;
                        }
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

    DataDelete = () => {
        Object.entries(this.drawList).forEach(el => {
            const key = el[0];
            const value = el[1];
            const position = {};
            // reference point
            position.x = (value._startPos.coord.x + value._endPos.coord.x) / 2;
            position.y = (value._startPos.coord.y + value._endPos.coord.y) / 2;
            if (
                position.y < this.bound._min._lat - 0.01
                || position.y > this.bound._max._lat + 0.01
                || position.x < this.bound._min._lng - 0.01
                || position.x > this.bound._max._lng + 0.01
            ) {
                value.setMap(null);
                delete this.drawList[key];
            }
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
                    <NearbyList map={map} />
                    <ul id="loginFavorContainer">
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
                    </ul>
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
