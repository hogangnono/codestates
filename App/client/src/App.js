import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
// import Toolbox from './Toolbox';
import CustomOverlay from './CustomOverlay';
import LoginModal from './LoginModal';
import './App.less';

class App extends Component {
<<<<<<< HEAD
    constructor(props) {
        super(props);
        this.state = {
            // mapLoad: undefined,
            name: '',
            factor: '',

            map: undefined, // Will set state to naver map instance
            circleToggle: true, // Indicates whether to create circle
            naver: undefined, // Will set state to window.naver

            leftClick: undefined, // Will set state to leftClick listener
            rightClick: undefined, // Will set state to rightClick listener

            toggleColor: true,

            mouseEvent: undefined // Will set mouse event here from listener
        };
    }
=======
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
>>>>>>> c085460b61915ba3ff644e4f8c63ceac0f27e402

    componentDidMount = async () => {
        const naver = window.naver;
        const map = await new naver.maps.Map(
            d3.select('#map').node(),
            this.mapOption()
        );
<<<<<<< HEAD

=======
>>>>>>> c085460b61915ba3ff644e4f8c63ceac0f27e402
        this.setState({ map, naver });
        this.mainPageLoad(map);
    };

    drawingComponent = () => {
        let startPos;
<<<<<<< HEAD

        const naver = window.naver;
        const { map } = this.state;
        const { circleToggle } = this.state;
=======
        const naver = window.naver;
        const { map, drawingData } = this.state;
        const { circleToggle } = this.state;
        const shapeData = {};
>>>>>>> c085460b61915ba3ff644e4f8c63ceac0f27e402

        if (circleToggle === true) {
            const leftClick = naver.maps.Event.addListener(map, 'click', e => {
                // coord: lat, lng of map
                // offset: x, y of screen
                const { coord, offset } = e;
                startPos = { coord, offset };
<<<<<<< HEAD

=======
                shapeData.startPos = startPos;
>>>>>>> c085460b61915ba3ff644e4f8c63ceac0f27e402
                naver.maps.Event.removeListener(leftClick);
            });

            const rightClick = naver.maps.Event.addListener(
                map,
                'rightclick',
                e => {
                    const { coord, offset } = e;
                    const endPos = { coord, offset };
<<<<<<< HEAD
                    new CustomOverlay({
                        position: { startPos, endPos },
                        naverMap: map,
                        zoom: ''
                    }).setMap(map);

=======
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
>>>>>>> c085460b61915ba3ff644e4f8c63ceac0f27e402
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
<<<<<<< HEAD
        const { name, factor } = this.state;
=======
        const { name, bound } = this.state;
>>>>>>> c085460b61915ba3ff644e4f8c63ceac0f27e402
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
<<<<<<< HEAD
                if (error.response.status === 500) {
                    console.log(error);
                    alert('load fail');
                } else {
                    console.log(error);
                    alert('error!');
                }
            });
    };

    mouseClick = e => {
        const { circleToggle } = this.state;
        const { toggleColor } = this.state;
        if (e.type === 'contextmenu' && circleToggle !== true) {
            this.setState({ toggleColor: !toggleColor });
            this.setState({ circleToggle: !circleToggle });
        }
    };

    render() {
        const { toggleColor } = this.state;
        const btnClass = toggleColor ? 'lightPurple' : 'darkPurple';
        return (
            <div id="wrapper">
                <div
                    id="map"
                    onClick={this.mouseClick}
                    onContextMenu={this.mouseClick}
                    onKeyDown={this.mouseClick}
                >
                    {/* <Toolbox mapLoad={mapLoad} /> */}
                </div>
                <button
                    type="button"
                    className={btnClass}
                    onClick={this.circleToggleAndEllipseAndChangeColor}
                >
                    {`Circle`}
                </button>
=======
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
>>>>>>> c085460b61915ba3ff644e4f8c63ceac0f27e402
            </div>
        );
    }
}

export default App;
