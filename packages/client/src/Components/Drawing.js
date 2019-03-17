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
        map: PropTypes.object.isRequired,
        handleToggle: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired,
        drawingData: PropTypes.array.isRequired,
        updateDrawingData: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired
    };

    state = {
        shapes: ['line', 'arrow', 'square', 'circle', 'polygon'],
        selectedButton: null,
        loadedListener: null,
        isInShapeCreateMode: false,
        refresh: true,
        fillOrNotToggle1: false,
        fillOrNotToggle2: false,
        showShapeBox: false
    };

    color = undefined;

    fill = undefined;

    handleRequestSave = data => {
        const { name, toggleModal } = this.props;
        this.setState({
            fillOrNotToggle1: false,
            fillOrNotToggle2: false
        });
        saveHandle(name, data, toggleModal);
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
        const { map, updateDrawingData } = this.props;
        const icons = ['line', 'arrow', 'square', 'circle', 'polygon'];
        const overlays = [Line, Arrow, Rect, Circle, Polygon]; // Change name of index to actual overlay name of import
        let Shape;

        let moveEvent;
        let figure;
        let lineData = [];
        let isClick = false;

        for (let index = 0; index < icons.length; index++) {
            if (selectedIcon === icons[index]) {
                Shape = overlays[index];
            }
        }

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
                    Shape.name === 'Rect'
                    || Shape.name === 'Circle'
                    || Shape.name === 'Line'
                ) {
                    updateDrawingData({
                        figure,
                        lineData,
                        shapeType: Shape.name
                    });
                    lineData.pop();
                    this.fill = undefined;
                    this.color = undefined;
                    naver.maps.Event.removeListener(moveEvent);
                    naver.maps.Event.removeListener(leftClick);
                    this.setState({ isInShapeCreateMode: false });
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

        const rightClick = naver.maps.Event.addListener(
            map,
            'rightclick',
            e => {
                if (Shape.name === 'Polygon' || Shape.name === 'Arrow') {
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
                            shapeType: Shape.name
                        });
                    }
                    this.setState({ isInShapeCreateMode: false });
                    naver.maps.Event.removeListener(moveEvent);
                    naver.maps.Event.removeListener(leftClick);
                }
                naver.maps.Event.removeListener(rightClick);
            }
        );
        this.setState({
            loadedListener: {
                leftClick,
                rightClick
            }
        });
    };

    selectButton = selectedIcon => {
        const { isInShapeCreateMode } = this.state;
        this.setState({ selectedButton: selectedIcon });
        this.setState({ 
          selectedButton: selectedIcon,
          isInShapeCreateMode: !isInShapeCreateMode,
          fillOrNotToggle1: false,
          fillOrNotToggle2: false
        });
        this.createShapeTest(selectedIcon); // Enter parameter for different shape
        this.showShape();
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

    showShape = () => {
        const { showShapeBox } = this.state;
        this.setState({
            showShapeBox: !showShapeBox
        });
    };

    decideFactor = factorNum => {
        const colorList = [
            'Crimson',
            'DarkOrange',
            'SeaGreen',
            'Navy',
            'Indigo',
            'Peru',
            'HotPink',
            'SlateGray',
            'red'
        ];
        this.color = colorList[factorNum];
    };

    render() {
        const {
            map,
            handleToggle,
            drawingData,
            // NearByFactorItems,
            updateDrawingData
        } = this.props;
        const {
            selectedButton,
            shapes,
            isInShapeCreateMode,
            fillOrNotToggle1,
            fillOrNotToggle2,
            showShapeBox
        } = this.state;
        const doNotShowTips = JSON.parse(
            sessionStorage.getItem('doNotShowTipsForDrawing')
        );
        const newToggleBox = Object.keys(constants.newToggleBox);

        return (
            <div id="drawingComponentContainer">
                {shapes.map(shape => {
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
                {isInShapeCreateMode ? (
                    <div
                        className={'selectOption ' + (showShapeBox ? '' : 'c')}
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
                                        key={idx++}
                                        onClick={() => this.decideFactor(idx)}
                                        onKeyPress={this.decideFactor}
                                        role="button"
                                        tabIndex="0"
                                    >
                                        {factor}
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
                        onClick={() => handleToggle()}
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
