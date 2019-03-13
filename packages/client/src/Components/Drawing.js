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
import * as post from '../postSlackApi';

class Drawing extends Component {
    static propTypes = {
        map: PropTypes.object,
        handleToggle: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired,
        drawingData: PropTypes.array.isRequired,
        updateDrawingData: PropTypes.func.isRequired,
        name: PropTypes.string
    };

    state = {
        shapes: ['line', 'arrow', 'square', 'circle', 'polygon'],
        selectedButton: null,
        loadedListener: null,
        isInShapeCreateMode: false,
        refresh: true
    };

    handleRequestSave = data => {
        const { name, toggleModal } = this.props;
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
        const lineData = [];
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
                figure = new Shape({
                    lineData: lineData,
                    naverMap: map
                });
            } else {
                if (Shape.name === 'Rect' || Shape.name === 'Circle') {
                    console.log('React 또는 Circle', figure);
                    updateDrawingData({
                        figure,
                        lineData,
                        shapeType: Shape.name
                    });
                    naver.maps.Event.removeListener(moveEvent);
                    naver.maps.Event.removeListener(leftClick);
                } else {
                    figure.draw(lineData);
                    console.log('React 도 아니고 Circle도 아닌 것의 figure', {
                        figure,
                        lineData,
                        shapeType: Shape.name
                    });
                    updateDrawingData({
                        figure,
                        lineData,
                        shapeType: Shape.name
                    });
                }
            }
            figure.setMap(map);
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
                if (
                    Shape.name === 'Line'
                    || Shape.name === 'Polygon'
                    || Shape.name === 'Arrow'
                ) {
                    naver.maps.Event.removeListener(moveEvent);
                    console.log('Line 또는 Polygon 또는 Arrow', {
                        figure,
                        lineData,
                        shapeType: Shape.name
                    });
                    updateDrawingData({
                        figure,
                        lineData,
                        shapeType: Shape.name
                    });
                }
                naver.maps.Event.removeListener(leftClick);
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
        // console.log('selectedIcon: ', selectedIcon);
        this.setState({ selectedButton: selectedIcon });
        this.setState({ isInShapeCreateMode: true });
        this.createShapeTest(selectedIcon); // Enter parameter for different shape
    };

    doNotShowTips = () => {
        const { refresh } = this.state;
        sessionStorage.setItem('doNotShowTipsForDrawing', JSON.stringify(true));
        this.setState({ refresh: !refresh });
    };

    render() {
        const {
            map,
            handleToggle,
            drawingData,
            NearByFactorItems
        } = this.props;
        const { selectedButton, shapes, isInShapeCreateMode } = this.state;
        const doNotShowTips = JSON.parse(
            sessionStorage.getItem('doNotShowTipsForDrawing')
        );
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
                <div id="myDrawingsContainer">
                    <MyDrawingElement drawingData={drawingData} />
                </div>
                <div id="saveCloseBtns">
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => {
                            this.handleRequestSave(drawingData);
                            post.slackApi('hogangnono', NearByFactorItems);
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
