/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
// import newToggleBox from '../../category';
import FilterContainer from './Components/FilterContainer';
import LoginModal from './Components/LoginModal';
import NearbyList from './Components/NearbyList';
import DrawContainer from './Components/DrawContainer';
import * as MakeSecret from './Module/simpleEncryption';
import './less/App.less';

import Circle from './CustomOverlay/Circle';

class App extends Component {
    constructor(props) {
        super(props);
        this.bound = undefined;
        this.drawList = {};
        this.newToggleBox = {
            상권: false,
            '신축/재개발': false,
            교육: false,
            업무지구: false,
            주택단지: false,
            '도로개통/확장': false,
            지하철개통: false,
            기타: false
        };
        this.state = {
            name: undefined,
            // factor: undefined,
            drawingData: [],
            map: undefined,
            showFilter: false,
            showModal: false,
            deactiveFilter: '',
            deactiveDraw: 'deactive',
            MyInfoButton: false,
            showDraw: false,
            factors: []
        };
    }

    componentDidMount = async () => {
        const naver = window.naver;
        const map = await new naver.maps.Map(
            d3.select('#map').node(),
            this.mapOption()
        );

        this.setState({ map });
        this.bound = map.getBounds();
        this.mainPageLoad(map);
        naver.maps.Event.addListener(map, 'idle', e => {
            this.bound = map.getBounds();
            // Object.entries(this.newToggleBox).forEach(([key, value]) => {
            //     if (!value) {
            //     } else {
            //         this.mainPageLoad(map);
            //     }
            // });
            this.mainPageLoad(map);
            this.deleteDraw();
        });

        const userName = localStorage.getItem('token');
        if (userName) {
            const decryptedName = MakeSecret.Decrypt(JSON.parse(userName));
            this.setState({ name: decryptedName });
        }
    };

    handleUserNameOnChange = username => {
        this.setState({ name: username });
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
        const { name, factors } = this.state;
        const bound = this.bound;
        axios
            .post('http://127.0.0.1:3001/user/load', {
                name,
                factors,
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
                        } else {
                            this.drawList[el.id].setMap(null);
                            delete this.drawList[el.id];
                        }
                    });
                } else if (result.status === 204) {
                    alert('호재 데이터 정보 없음');
                }
            })
            .catch(error => {
                if (error.response.status === 500) {
                    alert('load fail');
                } else {
                    alert('error!');
                }
                alert(error);
            });
    };

    deleteDraw = () => {
        Object.entries(this.drawList).forEach(([key, value]) => {
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

    toggleModal = () => {
        const { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };

    toggleDraw = () => {
        const { showDraw } = this.state;
        this.setState({ showDraw: !showDraw });
    };

    showFilter = () => {
        const { showFilter, deactiveDraw } = this.state;

        if (deactiveDraw === '') {
            this.setState({
                showFilter: !showFilter,
                deactiveDraw: 'deactive'
            });
        } else {
            this.setState({
                showFilter: !showFilter,
                deactiveDraw: ''
            });
        }
    };

    showDraw = () => {
        const { showDraw, drawingData, deactiveFilter } = this.state;
        if (drawingData.length) {
            const pressedConfirm = confirm(
                '저장하지 않고 그리기 창을 닫으면 그린 정보는 모두 사라집니다!\n그래도 그리기 창을 닫으시겠어요?'
            );
            if (pressedConfirm) {
                this.setState({ drawingData: [] });
            } else if (!pressedConfirm) {
                return;
            }
        }

        if (deactiveFilter === '') {
            this.setState({
                showDraw: !showDraw,
                deactiveFilter: 'deactive'
            });
        } else {
            this.setState({
                showDraw: !showDraw,
                deactiveFilter: ''
            });
        }
    };

    myInfoToggle = () => {
        const { MyInfoButton } = this.state;
        this.setState({ MyInfoButton: !MyInfoButton });
        const a = !MyInfoButton;
        this.factorLoad(undefined, a);
    };

    updateDrawingData = shapeData => {
        const { drawingData } = this.state;
        this.setState({ drawingData: [...drawingData, shapeData] });
    };

    mainToggle = (stateName, toggle) => {
        this.setState({ [stateName]: !toggle });
    };

    factorLoad = (category, toggle = false) => {
        const { name, map } = this.state;
        const bound = this.bound;
        const factors = [];
        Object.entries(this.drawList).forEach(([key, value]) => {
            value.setMap(null);
            delete this.drawList[key];
        });
        if (toggle) {
            const toggle = {};
            Object.entries(this.newToggleBox).forEach(([key, value]) => {
                toggle[key] = false;
            });
            this.newToggleBox = toggle;
        }
        if (category) {
            const toggleCategory = { [category]: !this.newToggleBox[category] };
            this.newToggleBox = { ...this.newToggleBox, ...toggleCategory };
            Object.entries(this.newToggleBox).forEach(([key, value]) => {
                if (value) {
                    factors.push(key);
                }
            });
            this.setState({
                factors: factors
            });
        }
        axios
            .post('http://127.0.0.1:3001/user/load', {
                name,
                bound,
                factors
            })
            .then(async result => {
                const data = await result.data;
                const resultData = await data[0];
                const userData = await data[1];
                if (result.status === 200 || result.status === 201) {
                    if (userData && toggle) {
                        userData.map(async el => {
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
                            } else {
                                this.drawList[el.id].setMap(null);
                                delete this.drawList[el.id];
                            }
                        });
                    } else if (resultData && !toggle) {
                        resultData.map(async el => {
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
                            } else {
                                this.drawList[el.id].setMap(null);
                                delete this.drawList[el.id];
                            }
                        });
                    }
                } else if (result.status === 204) {
                    alert('호재 데이터 정보 없음');
                }
            })
            .catch(error => {
                alert(error);
            });
    };

    render() {
        const {
            map,
            name,
            drawingData,
            showFilter,
            showDraw,
            showModal,
            deactiveFilter,
            deactiveDraw,
            MyInfoButton
        } = this.state;
        // const mainButton = [
        //     { name: 'My', stateName: 'showModal', toggleName: showModal },
        //     { name: '필터', stateName: 'showFilter', toggleName: showFilter },
        //     { name: '그리기', stateName: 'showDraw', toggleName: showDraw }
        // ];
        return (
            <div id="wrapper">
                <div id="map">
                    <NearbyList mapLoad={map} />
                    <div id="loginFavorContainer">
                        {/* mainButton.map(bt => (
                            <div
                                className="loginFavorBtn"
                                onClick={() => this.mainToggle(bt.stateName, bt.toggleName)
                                }
                                onKeyPress={() => this.mainToggle(bt.stateName, bt.toggleName)
                                }
                                role="button"
                                tabIndex="0"
                                key={bt.name}
                            >
                                {bt.name}
                            </div>
                            )) */}
                        <div
                            className="loginFavorBtn"
                            onClick={this.toggleModal}
                            onKeyPress={this.toggleModal}
                            role="button"
                            tabIndex="0"
                        >
                            {`My`}
                        </div>
                        <div
                            className={`loginFavorBtn ${deactiveFilter}`}
                            onClick={() => {
                                if (deactiveFilter === '') {
                                    this.showFilter();
                                }
                            }}
                            onKeyPress={this.showFilter}
                            role="button"
                            tabIndex="0"
                        >
                            {`필터`}
                        </div>
                        <div
                            className={`loginFavorBtn ${deactiveDraw}`}
                            onClick={() => {
                                if (deactiveDraw === '') {
                                    this.showDraw();
                                }
                            }}
                            onKeyPress={this.showDraw}
                            role="button"
                            tabIndex="0"
                        >
                            {`그리기`}
                        </div>
                    </div>
                    {showModal ? (
                        <LoginModal
                            name={name}
                            toggleModal={this.toggleModal}
                            handleUserNameOnChange={this.handleUserNameOnChange}
                        />
                    ) : null}
                    <div className={!showFilter ? 'block' : 'none'}>
                        <FilterContainer
                            MyInfoButton={MyInfoButton}
                            myInfoToggle={this.myInfoToggle}
                            factorLoad={this.factorLoad}
                            showFilter={this.showFilter}
                        />
                    </div>
                    <div className={showDraw ? 'block' : 'none'}>
                        <DrawContainer
                            handleToggle={this.showDraw}
                            mapLoad={map}
                            name={name}
                            handleUserNameOnChange={this.handleUserNameOnChange}
                            drawingData={drawingData}
                            updateDrawingData={this.updateDrawingData}
                            toggleModal={this.toggleModal}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
