import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import Toolbox from './Toolbox';
import CustomOverlay from './CustomOverlay';
import LoginModal from './LoginModal';
import './App.less';

class App extends Component {
    state = {
        name: '',
        factor: '',
        bound: '',

        map: undefined, // Will set state to naver map instance
        circleToggle: true, // Indicates whether to create circle
        naver: undefined, // Will set state to window.naver

        leftClick: undefined, // Will set state to leftClick listener
        rightClick: undefined, // Will set state to rightClick listener
        toggleColor: true,

        // mouseEvent: undefined, // Will set mouse event here from listener
        drawingData: [],
        showFilterDrawingTool: false,
        showModal: false,
        mouseEvent: undefined // Will set mouse event here from listener
    };

    componentDidMount = async () => {
        const naver = window.naver;
        const map = await new naver.maps.Map(
            d3.select('#map').node(),
            this.mapOption()
        );
        this.setState({ map, naver });
        this.mainPageLoad(map);
    };

    drawingComponent = () => {
        let startPos;
        const naver = window.naver;
        const { map, drawingData } = this.state;
        const { circleToggle } = this.state;
        const shapeData = {};

        if (circleToggle === true) {
            const leftClick = naver.maps.Event.addListener(map, 'click', e => {
                // coord: lat, lng of map
                // offset: x, y of screen
                const { coord, offset } = e;
                startPos = { coord, offset };
                shapeData.startPos = startPos;
                naver.maps.Event.removeListener(leftClick);
            });

            const rightClick = naver.maps.Event.addListener(
                map,
                'rightclick',
                e => {
                    const { coord, offset } = e;
                    const endPos = { coord, offset };
                    // this.setState({ endPos });
                    // console.log('endPos', endPos);

                    const getZoomLevel = new CustomOverlay({
                        position: { startPos, endPos },
                        naverMap: map,
                        zoom: ''
                    });
                    getZoomLevel.setMap(map);
                    shapeData.endPos = endPos;
                    shapeData.zoomLevel = getZoomLevel._zoom;
                    this.setState({ drawingData: [...drawingData, shapeData] });
                    naver.maps.Event.removeListener(rightClick);
                }
            );

            this.setState({ rightClick: rightClick });
            this.setState({ leftClick: leftClick });
        }
        this.setState({ circleToggle: !circleToggle }); // Complete shape and turn off toggle
    };

    ellipseState() {
        const { circleToggle } = this.state;
        this.setState({ circleToggle: !circleToggle });
    }

    removeListener() {
        const naver = window.naver;
        const { leftClick } = this.state;
        const { rightClick } = this.state;
        naver.maps.Event.removeListener(leftClick);
        naver.maps.Event.removeListener(rightClick);
    }

    changeColor() {
        const { toggleColor } = this.state;
        this.setState({ toggleColor: !toggleColor });
    }

    circleToggleAndEllipseAndChangeColor = () => {
        this.changeColor();
        this.drawingComponent();
        this.ellipseState();
        this.removeListener();
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
