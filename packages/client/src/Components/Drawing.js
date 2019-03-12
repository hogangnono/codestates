import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import axios from 'axios';
// import { FaLine } from 'react-icons/fa';
import Button from '../Module/Button';
import Line from '../CustomOverlay/Line';
import Arrow from '../CustomOverlay/Arrow';
import Circle from '../CustomOverlay/Circle';
import Rect from '../CustomOverlay/Rect';
import Polygon from '../CustomOverlay/Polygon';
import MyDrawingElement from './MyDrawingElement';

class Drawing extends Component {
    static propTypes = {
        map: PropTypes.object.isRequired,
        handleToggle: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired,
        drawingData: PropTypes.array.isRequired
        // updateDrawingData: PropTypes.func.isRequired
    };

    state = {
        shapes: ['line', 'arrow', 'square', 'circle', 'polygon'],
        selectedButton: null,
        loadedListener: null,
        isInShapeCreateMode: false,
        refresh: true
    };

    handleRequestSave = (parseURL, body) => {
        const { toggleModal, drawingData } = this.props;
        const basicURL = 'http://localhost:3001/';
        const token = localStorage.getItem('token');
        if (JSON.parse(token)) {
            if (!drawingData.length) {
                return alert(
                    '그린 도형이 없습니다.\n도형을 그리고 저장버튼을 눌러주세요 :)'
                );
            }
            axios
                .post(basicURL + parseURL, body)
                .then(result => {
                    console.log('저장성공!');
                })
                .catch(err => {
                    console.log('err: ', err);
                });
        } else {
            alert('저장을 위해선 로그인이 필요합니다 :)');
            toggleModal();
        }
    };

    removeListener = () => {
        const naver = window.naver;
        const { leftClick } = this.state;
        const { rightClick } = this.state;
        naver.maps.Event.removeListener(leftClick);
        naver.maps.Event.removeListener(rightClick);
    };

    createShapeTest = selectedIcon => {
        let startPos;
        const naver = window.naver;
        const { map } = this.props; // delete updateDrawingData
        const icons = ['line', 'arrow', 'square', 'circle', 'polygon'];
        const overlays = [Line, Arrow, Rect, Circle, Polygon]; // Change name of index to actual overlay name of import
        let Shape;

        let moveEvent;
        let figure;
        const lineData = [];
        let shapePoint = {};
        let isClick = false;
        let tempPoint = {};

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
            startPos = { coord, offset };
            // 화면상의 절대 좌표
            shapePoint.x = e.originalEvent.clientX;
            shapePoint.y = e.originalEvent.clientY;
            lineData.push(shapePoint);
            isClick = true;

            if (lineData.length === 1) {
                lineData.push(shapePoint);
                figure = new Shape({
                    position: startPos,
                    lineData: lineData,
                    naverMap: map
                });
            } else {
                if (Shape.name === 'Rect' || Shape.name === 'Circle') {
                    updateDrawingData({ ...lineData, shapeType: Shape.name });
                    naver.maps.Event.removeListener(moveEvent);
                } else {
                    figure.draw(lineData);
                    updateDrawingData({ ...lineData, shapeType: Shape.name });
                }
            }
            shapePoint = {};
            figure.setMap(map);
        });

        moveEvent = naver.maps.Event.addListener(map, 'mousemove', e => {
            tempPoint = {};
            tempPoint.x = e.originalEvent.clientX;
            tempPoint.y = e.originalEvent.clientY;
            // 직선일 경우
            if (isClick) {
                lineData[lineData.length - 1] = tempPoint;
                figure.draw(lineData);
            }
        });


        const rightClick = naver.maps.Event.addListener(map, 'rightclick', e => {
            if (Shape.name === 'Line' || Shape.name === 'Polygon' || Shape.name === 'Arrow') {
                naver.maps.Event.removeListener(moveEvent);
                updateDrawingData({ ...lineData, shapeType: Shape.name });
            }
              naver.maps.Event.removeListener(leftClick);
              naver.maps.Event.removeListener(rightClick);

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
    }

    render() {

        const {
            map,
            handleToggle,
            drawingData
        } = this.props;
        const {
            selectedButton,
            shapes,
            isInShapeCreateMode
        } = this.state;
        const doNotShowTips = JSON.parse(sessionStorage.getItem('doNotShowTipsForDrawing'));

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
                    {/* {drawingData.map((shape, index) => {
                        const newIndex = index + 1;
                        return (
                            <MyDrawingElement
                                key={'Idrew' + newIndex}
                                drawingData={drawingData}
                            />
                        );
                    })} */}
                </div>
                <div id="saveCloseBtns">
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => {
                            this.handleRequestSave('user/save', drawingData);
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
                { doNotShowTips
                    ? null
                    : (
                        <div className="tipModalForDrawing">
                            <div className="arrowBoxForDrawing">
                                <p>필터별로 부동산 호재정보를 보고싶다면</p>
                                <p>그리기 모드를 닫고 필터 메뉴를 선택해주세요!</p>
                                <div className="doNotShowTipsForDrawing" onClick={this.doNotShowTips} onKeyDown={this.doNotShowTips} role="button" tabIndex="0">다시 보지 않기</div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Drawing;
