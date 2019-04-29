import React, { Component } from 'react';
import * as d3 from 'd3';
import drawData from './Module/loadHandle';
import FilterContainer from './Components/FilterContainer';
import LoginModal from './Components/LoginModal';
import DrawContainer from './Components/DrawContainer';
import './less/App.less';
import * as constants from './constants';
import * as MakeSecret from './Module/simpleEncryption';
import NearbyFactorDialog from './Components/NearbyFactorDialog';
import DrawingSetTitleDescription from './Components/drawingSetTitleDescriptionModal';

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
            NearByFactorItems: [],
            showDrawingSetTitleDescriptionModal: false,
            drawingSetTitle: null,
            drawingSetDescription: null,
            descriptionModalState: false,
            descriptionValue: '',
            descriptionTitle: '',
            legendToggle: false
            // NearByFilteringItems: []
        };
    }

    componentDidMount = async () => {
        const naver = window.naver;
        const map = await new naver.maps.Map(d3.select('#map').node(), {
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
        });

        this.setState({ map });
        this.bound = map.getBounds();
        this.mainPageLoad(map);
        naver.maps.Event.addListener(map, 'idle', e => {
            const { showDraw } = this.state;
            this.bound = map.getBounds();
            // 그리기 모드가 아닌 경우에만 데이터를 불러옴
            if (!showDraw) {
                this.mainPageLoad(map);
                this.deleteDraw();
            }
        });
        const name = JSON.parse(localStorage.getItem('token'));
        if (name) {
            this.setState({
                name: MakeSecret.Decrypt(name)
            });
        }
    };

    isDelete = false;

    handleUserNameOnChange = username => {
        this.setState({ name: username });
    };

    showDrawingSetTitleDescriptionModal = value => {
        this.setState({ showDrawingSetTitleDescriptionModal: value });
    };

    changeDrawingSetTitle = text => {
        this.setState({ drawingSetTitle: text });
    };

    changeDrawingSetDescription = text => {
        this.setState({ drawingSetDescription: text });
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

    toggleAllDraw = () => {
        const { showDraw, map } = this.state;
        if (showDraw) {
            Object.entries(this.drawList).forEach(([key, value]) => {
                value.setMap(null);
                delete this.drawList[key];
            });
            this.isDelete = true;
        } else {
            if (this.isDelete) {
                this.mainPageLoad(map);
                this.isDelete = false;
            }
        }
    };

    deleteDraw = () => {
        Object.entries(this.drawList).forEach(([key, value]) => {
            const startPos = {};
            const endPos = {};
            // reference point
            startPos.x = value._lineData[0].coord.x;
            startPos.y = value._lineData[0].coord.y;
            endPos.x = value._lineData[value._lineData.length - 1].coord.x;
            endPos.y = value._lineData[value._lineData.length - 1].coord.y;

            if (
                (startPos.x < this.bound._min._lng - 0.01
                    || this.bound._max._lng + 0.01 < startPos.x
                    || startPos.y < this.bound._min._lat - 0.01
                    || this.bound._max._lat + 0.01 < startPos.y)
                && (endPos.x < this.bound._min._lng - 0.01
                    || this.bound._max._lng + 0.01 < endPos.x
                    || endPos.y < this.bound._min._lat - 0.01
                    || this.bound._max._lat + 0.01 < endPos.y)
            ) {
                value.setMap(null);
                delete this.drawList[key];
            }
        });
    };

    toggleLoginModal = () => {
        const { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };

    toggleDraw = () => {
        const { showDraw } = this.state;
        this.setState({ descriptionModalState: false });
        this.setState({ showDraw: !showDraw });
    };

    toggleLegend = () => {
        const { legendToggle } = this.state;
        this.setState({ legendToggle: !legendToggle });
    };

    showFilter = () => {
        const { showFilter, activeFilter } = this.state;
        if (activeFilter === 'active') {
            this.setState({
                showFilter: !showFilter,
                activeFilter: ''
            });
        } else {
            this.setState({
                showFilter: !showFilter,
                activeFilter: 'active'
            });
        }
    };

    showDraw = () => {
        const { showDraw, drawingData, activeDraw } = this.state;
        if (drawingData.length) {
            const pressedConfirm = confirm(
                '저장하지 않고 그리기 창을 닫으면 그린 정보는 모두 사라집니다!\n그래도 그리기 창을 닫으시겠어요?'
            );
            if (pressedConfirm) {
                for (let index = 0; index < drawingData.length; index++) {
                    drawingData[index].figure.onRemove();
                }
                this.setState({ drawingData: [] });
                this.setState({ descriptionModalState: false });
            } else if (!pressedConfirm) {
                return;
            }
        }

        if (activeDraw === 'active') {
            this.setState({
                showDraw: !showDraw,
                activeDraw: ''
            });
        } else {
            this.setState({
                showDraw: !showDraw,
                activeDraw: 'active'
            });
        }
    };

    initDrawingListAfterSave = () => {
        this.setState({ drawingData: [] });
    };

    initUserName = () => {
        this.setState({ name: undefined });
    };

    myInfoToggle = () => {
        const { MyInfoButton } = this.state;
        this.setState({ MyInfoButton: !MyInfoButton });
        this.factorLoad(null, !MyInfoButton);
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

    handleChangeDescription = event => {
        this.setState({ descriptionValue: event.target.value });
    };

    handleChangeTitle = event => {
        this.setState({ descriptionTitle: event.target.value });
    };

    descriptionModal = () => {
        const {
            descriptionModalState,
            descriptionValue,
            descriptionTitle
        } = this.state;
        if (descriptionModalState) {
            return (
                <div className="descriptionModal">
                    <div className="descriptionHeader"> </div>
                    <textarea
                        placeholder="제목을 지어주세요:D"
                        className="descriptionInputTitle"
                        type="text"
                        value={descriptionTitle}
                        onChange={this.handleChangeTitle}
                    />
                    <textarea
                        placeholder="호재 내용을 채워주세요:D"
                        className="descriptionInput"
                        type="text"
                        value={descriptionValue}
                        onChange={this.handleChangeDescription}
                    />
                    <button
                        className="descriptionCloser"
                        type="button"
                        onClick={this.descriptionModalHide}
                    >
                        닫기
                    </button>
                    <button
                        className="descriptionSave"
                        type="button"
                        onClick={this.descriptionModalSave}
                    >
                        저장
                    </button>
                </div>
            );
        } else {
            return <div />;
        }
    };

    descriptionModalHide = () => {
        this.setState({
            descriptionModalState: false,
            descriptionValue: '',
            descriptionTitle: ''
        });
    };

    descriptionModalSave = () => {
        const { descriptionValue, descriptionTitle, drawingData } = this.state;
        this.setState({ descriptionModalState: false });
        const arrayOfShapes = drawingData;
        arrayOfShapes[arrayOfShapes.length - 1].title = descriptionTitle;
        arrayOfShapes[arrayOfShapes.length - 1].value = descriptionValue;
        this.setState({ drawingData: arrayOfShapes });
    };

    descriptionModalShow = () => {
        this.setState({ descriptionModalState: true });
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
            NearByFactorItems,
            legendToggle,
            showDrawingSetTitleDescriptionModal,
            drawingSetTitle,
            drawingSetDescription
        } = this.state;

        this.toggleAllDraw();
        return (
            <div id="wrapper">
                <div id="map">
                    <NearbyFactorDialog
                        mapLoad={map}
                        NearByFactorItems={NearByFactorItems}
                    />
                    <div id="loginFavorContainer">
                        <div
                            className="loginFavorBtn"
                            onClick={this.toggleLoginModal}
                            onKeyPress={this.toggleLoginModal}
                            role="button"
                            tabIndex="0"
                        >
                            {`My`}
                        </div>
                        <div
                            className={`loginFavorBtn ${activeFilter}`}
                            onClick={() => {
                                if (activeDraw === '') {
                                    this.showFilter();
                                }
                            }}
                            onKeyPress={() => this.showFilter}
                            role="button"
                            tabIndex="0"
                        >
                            {`필터`}
                        </div>
                        <div
                            className={`loginFavorBtn ${activeDraw}`}
                            onClick={() => {
                                if (activeFilter === '') {
                                    this.showDraw();
                                    this.descriptionModalHide();
                                }
                            }}
                            onKeyPress={() => this.showDraw}
                            role="button"
                            tabIndex="0"
                        >
                            {`그리기`}
                        </div>
                    </div>
                    {showModal ? (
                        <LoginModal
                            name={name}
                            toggleLoginModal={this.toggleLoginModal}
                            handleUserNameOnChange={this.handleUserNameOnChange}
                            initUserName={this.initUserName}
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
                            handleUserNameOnChange={this.handleUserNameOnChange}
                            drawingData={drawingData}
                            updateDrawingData={this.updateDrawingData}
                            toggleLoginModal={this.toggleLoginModal}
                            NearByFactorItems={NearByFactorItems}
                            initDrawingListAfterSave={
                                this.initDrawingListAfterSave
                            }
                            showDraw={this.showDraw}
                            showDrawingSetTitleDescriptionModal={
                                this.showDrawingSetTitleDescriptionModal
                            }
                            descriptionModalShow={this.descriptionModalShow}
                            descriptionModalHide={this.descriptionModalHide}
                        />
                    </div>
                    {showDrawingSetTitleDescriptionModal ? (
                        <DrawingSetTitleDescription
                            changeDrawingSetTitle={this.changeDrawingSetTitle}
                            changeDrawingSetDescription={
                                this.changeDrawingSetDescription
                            }
                            drawingData={drawingData}
                            toggleLoginModal={this.toggleLoginModal}
                            initDrawingListAfterSave={
                                this.initDrawingListAfterSave
                            }
                            showDraw={this.showDraw}
                            showDrawingSetTitleDescriptionModal={
                                this.showDrawingSetTitleDescriptionModal
                            }
                            drawingSetTitle={drawingSetTitle}
                            drawingSetDescription={drawingSetDescription}
                        />
                    ) : null}
                    <div
                        className="legend"
                        onClick={this.toggleLegend}
                        onKeyPress={this.toggleLegend}
                        role="button"
                        tabIndex="0"
                    />
                    <div
                        className={
                            'colorList ' + (legendToggle ? 'invisible' : '')
                        }
                    >
                        {Object.keys(constants.newToggleBox).map(
                            (color, index) => {
                                return (
                                    <div className="eachColor" key={index}>
                                        <div className="legendColorBox">
                                            <div className="colorCircle" />
                                        </div>
                                        <div className="legendTextBox">
                                            {color}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
                <div>
                    <this.descriptionModal />
                </div>
            </div>
        );
    }
}

export default App;
