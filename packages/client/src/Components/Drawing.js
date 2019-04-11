import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import Button from '../Module/Button';
import Line from '../CustomOverlay/Line';
import Arrow from '../CustomOverlay/Arrow';
import Circle from '../CustomOverlay/Circle';
import Rect from '../CustomOverlay/Rect';
import Polygon from '../CustomOverlay/Polygon';
import MyDrawingElement from './MyDrawingElement';
import saveHandle from '../Module/saveHandle';
import * as constants from '../constants';

class Drawing extends Component {
    static propTypes = {
        map: PropTypes.object,
        handleToggle: PropTypes.func.isRequired,
        toggleLoginModal: PropTypes.func.isRequired,
        drawingData: PropTypes.array.isRequired,
        updateDrawingData: PropTypes.func.isRequired,
        initDrawingListAfterSave: PropTypes.func.isRequired,
        showDraw: PropTypes.func.isRequired,
        showDrawingSetTitleDescriptionModal: PropTypes.func.isRequired,
        descriptionModalShow: PropTypes.func.isRequired,
        descriptionModalHide: PropTypes.func.isRequired
    };

    state = {
        selectedButton: null,
        loadedListener: null,
        isInShapeCreateMode: false,
        refresh: true,
        fillOrNotToggle1: false,
        fillOrNotToggle2: false,
        isSelectStatus: {
            Line: false,
            Arrow: false,
            Rect: false,
            Circle: false,
            Polygon: false
        }
    };

    color = undefined;

    factorId = undefined;

    fill = undefined;

    handleRequestSave = data => {
        const {
            toggleLoginModal,
            initDrawingListAfterSave,
            showDraw,
            showDrawingSetTitleDescriptionModal
        } = this.props;
        this.setState({
            fillOrNotToggle1: false,
            fillOrNotToggle2: false
        });
        saveHandle(
            data,
            null,
            toggleLoginModal,
            initDrawingListAfterSave,
            showDraw,
            showDrawingSetTitleDescriptionModal
        );
    };

    removeListener = () => {
        const naver = window.naver;
        const { leftClick } = this.state;
        const { rightClick } = this.state;
        naver.maps.Event.removeListener(leftClick);
        naver.maps.Event.removeListener(rightClick);
    };

    createShapeTest = selectedIcon => {
        let position;
        const naver = window.naver;
        const { map, updateDrawingData, descriptionModalShow } = this.props;
        const icons = Object.values(constants.typeOfShape);
        const overlays = [Line, Arrow, Rect, Circle, Polygon]; // Change name of index to actual overlay name of import
        let Shape;
        let shapeIndex;
        let moveEvent;
        let figure;
        let lineData = [];
        let isClick = false;

        for (let index = 0; index < icons.length; index++) {
            if (selectedIcon === icons[index]) {
                Shape = overlays[index];
                shapeIndex = index;
            }
        }
        const shapeName = constants.typeOfShape[shapeIndex];
        const { loadedListener } = this.state;

        if (loadedListener !== null) {
            naver.maps.Event.removeListener(loadedListener.leftClick);
            naver.maps.Event.removeListener(loadedListener.rightClick);
        }

        const leftClick = naver.maps.Event.addListener(map, 'click', e => {
            const { coord, offset } = e;
            position = { coord, offset };
            lineData.push(position);
            isClick = true;
            // 처음 클릭시
            if (lineData.length === 1) {
                lineData.push(position);
                // 호재와 채우기를 선택한 경우
                if (this.fill && this.color) {
                    figure = new Shape({
                        factorId: this.factorId,
                        fill: this.fill,
                        color: this.color,
                        lineData: lineData,
                        naverMap: map
                    });
                    figure.setMap(map);
                } else {
                    if (!this.fill && !this.color) {
                        alert('도형 옵션과 호재를 선택해주세요');
                    } else if (!this.fill) {
                        alert('도형 옵션을 선택해주세요');
                    } else if (!this.color) {
                        alert('호재를 선택해주세요');
                    }
                    lineData = [];
                    isClick = false;
                }
            } else {
                if (
                    shapeName === 'Rect'
                    || shapeName === 'Circle'
                    || shapeName === 'Line'
                ) {
                    updateDrawingData({
                        figure,
                        lineData,
                        shapeType: shapeName
                    });
                    lineData.pop();
                    this.fill = undefined;
                    this.color = undefined;
                    naver.maps.Event.removeListener(moveEvent);
                    naver.maps.Event.removeListener(leftClick);
                    this.setState({
                        isInShapeCreateMode: false
                    });
                    this.selectButton();
                    descriptionModalShow();
                } else {
                    figure.draw(lineData);
                }
                figure.setMap(map);
            }
        });

        moveEvent = naver.maps.Event.addListener(map, 'mousemove', e => {
            // 클릭 후 이동시
            if (isClick) {
                const { coord, offset } = e;
                position = { coord, offset };
                lineData[lineData.length - 1] = position;
                figure.draw(lineData);
            }
        });

        const rightClick = naver.maps.Event.addListener(map, 'rightclick', e => {
            if (shapeName === 'Polygon' || shapeName === 'Arrow') {
                // 해당 포인트를 지워줌
                lineData.pop();
                // 첫 클릭 이후 우클릭을 한 경우
                if (lineData.length === 1) {
                    figure.onRemove();
                } else {
                    figure.draw(lineData);
                    updateDrawingData({
                        figure,
                        lineData,
                        shapeType: shapeName
                    });
                }
                this.setState({
                    isInShapeCreateMode: false
                });
                this.selectButton();
                descriptionModalShow();
                naver.maps.Event.removeListener(moveEvent);
                naver.maps.Event.removeListener(leftClick);
            }
            naver.maps.Event.removeListener(rightClick);
        });
        this.setState({
            loadedListener: {
                leftClick,
                rightClick
            }
        });
    };

    selectButton = selectedIcon => {
        const { isInShapeCreateMode, isSelectStatus } = this.state;
        const { descriptionModalHide } = this.props;
        const resetStatus = { ...isSelectStatus };
        for (const key in resetStatus) {
            if (key === selectedIcon && resetStatus[key]) {
                resetStatus[key] = false;
            } else if (key === selectedIcon) {
                resetStatus[key] = !resetStatus[key];
            } else {
                resetStatus[key] = false;
            }
        }
        const newStatus = Object.assign({ ...isSelectStatus }, resetStatus);
        this.setState({
            selectedButton: selectedIcon,
            isInShapeCreateMode: !isInShapeCreateMode,
            isSelectStatus: newStatus,
            fillOrNotToggle1: false,
            fillOrNotToggle2: false
        });
        this.createShapeTest(selectedIcon); // Enter parameter for different shape
        descriptionModalHide();
    };

    doNotShowTips = () => {
        const { refresh } = this.state;
        sessionStorage.setItem('doNotShowTipsForDrawing', JSON.stringify(true));
        this.setState({ refresh: !refresh });
    };

    fillOrnot = fillval => {
        this.fill = fillval;
        const { fillOrNotToggle1, fillOrNotToggle2 } = this.state;
        if (fillval === 'fill') {
            this.setState({
                fillOrNotToggle1: !fillOrNotToggle1
            });
        } else {
            this.setState({
                fillOrNotToggle2: !fillOrNotToggle2
            });
        }
    };

    decideFactor = factorNum => {
        this.factorId = factorNum + 1;
        this.color = constants.colorList[factorNum];
    };

    render() {
        const {
            map,
            handleToggle,
            drawingData,
            updateDrawingData
        } = this.props;
        const {
            selectedButton,
            isInShapeCreateMode,
            isSelectStatus,
            fillOrNotToggle1,
            fillOrNotToggle2
        } = this.state;
        const shapeStatus = Object.values(isSelectStatus).some(el => el === true);
        const doNotShowTips = JSON.parse(
            sessionStorage.getItem('doNotShowTipsForDrawing')
        );
        const newToggleBox = Object.keys(constants.newToggleBox);

        if (isInShapeCreateMode) {
            const mapDiv = document.querySelector('#map').childNodes[6];
            if (mapDiv.style.cursor !== 'crosshair') {
                mapDiv.style.cursor = 'crosshair';
            }
            window.naver.maps.Event.addListener(map, 'mouseup', e => {
                const { isInShapeCreateMode } = this.state;
                if (
                    isInShapeCreateMode
                    && mapDiv.style.cursor !== 'crosshair'
                ) {
                    mapDiv.style.cursor = 'crosshair';
                } else if (
                    !isInShapeCreateMode
                    && mapDiv.style.cursor !== 'grab'
                ) {
                    mapDiv.style.cursor = 'grab';
                }
            });
            window.naver.maps.Event.addListener(map, 'mousedown', e => {
                const { isInShapeCreateMode } = this.state;
                if (
                    isInShapeCreateMode
                    && mapDiv.style.cursor !== 'crosshair'
                ) {
                    mapDiv.style.cursor = 'crosshair';
                } else if (
                    !isInShapeCreateMode
                    && mapDiv.style.cursor !== 'grabbing'
                ) {
                    mapDiv.style.cursor = 'grabbing';
                }
            });
        } else {
            if (map) {
                const mapDiv = document.querySelector('#map').childNodes[6];
                if (mapDiv.style.cursor !== 'grab') {
                    mapDiv.style.cursor = 'grab';
                }
            }
        }
        return (
            <div id="drawingComponentContainer">
                {Object.values(constants.typeOfShape).map(shape => {
                    return (
                        <Button
                            map={map}
                            key={shape}
                            icons={shape}
                            selectButton={this.selectButton}
                            isSelected={
                                selectedButton === shape && isInShapeCreateMode
                                    ? true
                                    : false
                            }
                        />
                    );
                })}
                {shapeStatus ? (
                    <div
                        className={'selectOption ' + (shapeStatus ? '' : 'invisible')}
                    >
                        <div className="fillOrNot">
                            <div
                                className={
                                    'lineOrFillBox '
                                    + (fillOrNotToggle1 ? 'a' : '')
                                }
                                onClick={() => this.fillOrnot('fill')}
                                onKeyPress={this.fillOrnot}
                                role="button"
                                tabIndex="0"
                            >
                                Fill
                            </div>
                            <div
                                className={
                                    'lineOrFillBox '
                                    + (fillOrNotToggle2 ? 'b' : '')
                                }
                                onClick={() => this.fillOrnot('none')}
                                onKeyPress={this.fillOrnot}
                                role="button"
                                tabIndex="0"
                            >
                                Outline
                            </div>
                        </div>
                        <div className="factorContainerBox">
                            {newToggleBox.map((factor, idx) => {
                                return (
                                    <div
                                        className="factorBox"
                                        onClick={() => this.decideFactor(idx - 1)}
                                        onKeyPress={this.decideFactor}
                                        role="button"
                                        tabIndex="0"
                                        key={idx}
                                    >
                                        <div className="factorContain">
                                            <div className="factorColorBox" />
                                            <div className="factorText">
                                                {factor}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
                <div id="myDrawingsContainer">
                    <MyDrawingElement
                        drawingData={drawingData}
                        updateDrawingData={updateDrawingData}
                    />
                </div>
                <div id="saveCloseBtns">
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => {
                            this.handleRequestSave(drawingData);
                            // puppeteer.captureImage();
                        }}
                    >
                        {`저장`}
                    </button>
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => {
                            handleToggle();
                        }}
                    >
                        {`닫기`}
                    </button>
                </div>
                {doNotShowTips ? null : (
                    <div className="tipModalForDrawing">
                        <div className="arrowBoxForDrawing">
                            <p>
                                필터별로 부동산 호재정보를 보고싶다면 그리기
                                모드를 닫고 필터 메뉴를 선택해주세요!
                            </p>
                            <div
                                className="doNotShowTipsForDrawing"
                                onClick={this.doNotShowTips}
                                onKeyDown={this.doNotShowTips}
                                role="button"
                                tabIndex="0"
                            >
                                다시 보지 않기
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Drawing;
