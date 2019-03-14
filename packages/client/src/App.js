import React, { Component } from 'react';
import * as d3 from 'd3';
import drawData from './loadHandle';
import FilterContainer from './Components/FilterContainer';
import LoginModal from './Components/LoginModal';
import DrawContainer from './Components/DrawContainer';
import * as MakeSecret from './Module/simpleEncryption';
import './less/App.less';
import * as constants from './constants';
// import MainButton from './Components/MainButton';
import NearbyFactorDialog from './Components/NearbyFactorDialog';

class App extends Component {
    constructor(props) {
        super(props);
        this.bound = undefined;
        this.drawList = {};
        this.newToggleBox = constants.newToggleBox;
        this.state = {
            name: undefined,
            drawingData: [],
            map: undefined,
            showFilter: false,
            showModal: false,
            activeFilter: 'active',
            activeDraw: '',
            MyInfoButton: false,
            showDraw: false,
            factors: [],
            NearByFactorItems: []
            // NearByFilteringItems: []
        };
    }

    componentDidMount = async () => {
        const naver = window.naver;
        const map = await new naver.maps.Map(d3.select('#map').node(), {
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
        });

        this.setState({ map });
        this.bound = map.getBounds();
        this.mainPageLoad(map);
        naver.maps.Event.addListener(map, 'idle', e => {
            this.bound = map.getBounds();
            this.mainPageLoad(map);
            // this.deleteDraw();
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

    mainPageLoad = map => {
        const { name, factors } = this.state;
        const bound = this.bound;
        const nearbyData = async val => {
            await this.setState({
                NearByFactorItems: val
            });
        };
        drawData(name, bound, factors, false, this.drawList, map, nearbyData);
    };

    deleteDraw = () => {
        Object.entries(this.drawList).forEach(([key, value]) => {
            const position = {};
            // reference point
            position.x = value._centerPoint.center_lng;
            position.y = value._centerPoint.center_lat;
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
        const { showFilter, activeDraw } = this.state;

        if (activeDraw === '') {
            this.setState({
                showFilter: !showFilter,
                activeDraw: ''
            });
        } else {
            this.setState({
                showFilter: !showFilter,
                activeDraw: 'active'
            });
        }
    };

    showDraw = () => {
        const { showDraw, drawingData, activeFilter } = this.state;
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

        if (activeFilter === '') {
            this.setState({
                showDraw: !showDraw,
                activeFilter: ''
            });
        } else {
            this.setState({
                showDraw: !showDraw,
                activeFilter: 'active'
            });
        }
    };

    myInfoToggle = () => {
        const { MyInfoButton } = this.state;
        this.setState({ MyInfoButton: !MyInfoButton });
        this.factorLoad(undefined, !MyInfoButton);
    };

    updateDrawingData = (shapeData, order = false, index) => {
        const { drawingData } = this.state;
        this.setState({ drawingData: [...drawingData, shapeData] });
        if (order) {
            const newDrawingData = [...drawingData];
            newDrawingData.splice(index, 1);
            this.setState({ drawingData: newDrawingData });
        }
    };

    deleteDrawingData = index => {
    }

    mainToggle = (stateName, toggle) => {
        this.setState({ [stateName]: !toggle });
    };


    factorLoad = (category, toggle = false) => {
        const { name, map } = this.state;
        const bound = this.bound;
        const factors = [];
        let nearbyData;

        // 기존 지도에 있던 정보를 지워줌
        Object.entries(this.drawList).forEach(([key, value]) => {
            value.setMap(null);
            delete this.drawList[key];
        });
        // 유저 호재 보기
        if (toggle) {
            const toggleObj = {};
            Object.entries(this.newToggleBox).forEach(([key, value]) => {
                toggleObj[key] = false;
            });
            this.newToggleBox = toggleObj;
        }
        // 필터링 하기
        if (category) {
            const toggleCategory = {
                [category]: !this.newToggleBox[category]
            };
            this.newToggleBox = {
                ...this.newToggleBox,
                ...toggleCategory
            };
            Object.entries(this.newToggleBox).forEach(([key, value]) => {
                if (value) {
                    factors.push(key);
                }
            });
            this.setState({
                factors: factors
            });
            nearbyData = async val => {
                await this.setState({
                    NearByFactorItems: val
                });
            };
        }
        // TODO:
        drawData(name, bound, factors, toggle, this.drawList, map, nearbyData);
    };

    render() {
        const {
            map,
            name,
            drawingData,
            showFilter,
            showDraw,
            showModal,
            activeFilter,
            activeDraw,
            MyInfoButton,
            NearByFactorItems
        } = this.state;
        // const mainButton = [
        //     {
        //         className: '',
        //         cond: true,
        //         name: 'My',
        //         onClick: () => this.mainToggle('showModal', showModal)
        //     },
        //     {
        //         className: deactiveFilter,
        //         cond: deactiveFilter === '',
        //         name: '필터',
        //         onClick: () => this.mainToggle('showFilter', showFilter)
        //     },
        //     {
        //         className: deactiveDraw,
        //         cond: deactiveDraw === '',
        //         name: '그리기',
        //         onClick: () => this.mainToggle('showDraw', showDraw)
        //     }
        // ];
        return (
            <div id="wrapper">
                <div id="map">
                    <NearbyFactorDialog
                        mapLoad={map}
                        NearByFactorItems={NearByFactorItems}
                    />

                    <div id="loginFavorContainer">
                        {/* mainButton.map(bt => (
                            <MainButton
                                className={bt.className} // 추가되는 클래스명
                                name={bt.name} // 'my' | 'filer'...
                                cond={bt.cond} // 클릭 함수 실행 조건
                                onClick={bt.onClick}
                                key={bt.name}
                            />
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
                            className={`loginFavorBtn ${activeFilter}`}
                            onClick={() => {
                                if (activeFilter === '') {
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
                            className={`loginFavorBtn ${activeDraw}`}
                            onClick={() => {
                                if (activeDraw === '') {
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
                            NearByFactorItems={NearByFactorItems}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
