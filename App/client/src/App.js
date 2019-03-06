/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import Toolbox from './Toolbox';
import CustomOverlay from './CustomOverlay';
// import CustomPolygon from './CustomPolygon';
// import CustomRect from './CustomRect';
// import CustomArrow from './CustomArrow';
import LoginModal from './LoginModal';
import './App.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.bound = '';
        this.drawList = {};
        this.state = {
            name: 'jihun',
            factor: '',
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
    }

    componentDidMount = async () => {
        const naver = window.naver;
        const map = await new naver.maps.Map(
            d3.select('#map').node(),
            this.mapOption()
        );
        this.setState({ map, naver });
        this.bound = map.getBounds();
        this.mainPageLoad(map);
        naver.maps.Event.addListener(map, 'idle', e => {
            this.bound = map.getBounds();
            this.mainPageLoad(map);
            this.DataDelete();
        });
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
        const bound = this.bound;
        axios
            .post('http://127.0.0.1:3001/user/load', {
                name,
                factor,
                bound
            })
            .then(async result => {
                console.log('load data');
                console.log(result.data.length);
                const resultData = await result.data;
                if (result.status === 200 || result.status === 201) {
                    resultData.map(el => {
                        const { startPos, endPos, zoomLevel } = JSON.parse(
                            el.figures
                        );
                        if (!(el.id in this.drawList)) {
                            const overlay = new CustomOverlay({
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
            position.x = (value._startPos.coord.x + value._endPos.coord.x) / 2;
            position.y = (value._startPos.coord.y + value._endPos.coord.y) / 2;
            if (position.y < this.bound._min._lat - 0.01 || position.y > this.bound._max._lat + 0.01
                || position.x < this.bound._min._lng - 0.01 || position.x > this.bound._max._lng + 0.01) {
                value.setMap(null);
                delete this.drawList[key];
            }
        });

    }

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
