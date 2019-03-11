import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import axios from 'axios';
// import { FaLine } from 'react-icons/fa';
import Button from '../Module/Button';
import Line from '../CustomOverlay/Line';
import Circle from '../CustomOverlay/Circle';
import Rect from '../CustomOverlay/Rect';
import MyDrawingElement from './MyDrawingElement';

class Drawing extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        map: PropTypes.object.isRequired,
        closeFn: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired
    };

    state = {
        index: 0,
        theNumberOfFigure: [],
        shapes: ['line', 'arrow', 'square', 'circle', 'polygon'],
        selectedButton: null,
        loadedListener: null,
        isInShapeCreateMode: false
    };

    handleRequestSave = (parseURL, body) => {
        const { toggleModal } = this.props;
        const basicURL = 'http://localhost:3001/';
        const isLogin = localStorage.getItem('isLogin');
        if (JSON.parse(isLogin)) {
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

    checkDrawStatus = () => {
        const { index, theNumberOfFigure } = this.state;
        this.setState({
            theNumberOfFigure: [...theNumberOfFigure, index + 1],
            index: index + 1
        });
    };

    removeListener = () => {
        const naver = window.naver;
        const { leftClick } = this.state;
        const { rightClick } = this.state;
        naver.maps.Event.removeListener(leftClick);
        naver.maps.Event.removeListener(rightClick);
    };

    createShapeTest = (selectedIcon) => {
        let startPos;
        const naver = window.naver;
        const { map } = this.props;
        const icons = ['line', 'arrow', 'square', 'circle', 'polygon'];
        const overlays = [Line, Circle, Rect, Circle, Circle]; // Change name of index to actual overlay name of import
        let Shape;

        let moveEvent;
        let path;
        const lineData = [];
        let shapePoint = {};
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
            startPos = { coord, offset };
            if (Shape.name === 'Line') {
                isClick = true;
                // 화면상의 절대 좌표
                shapePoint.x = e.originalEvent.clientX;
                shapePoint.y = e.originalEvent.clientY;
                lineData.push(shapePoint);
                lineData.push(shapePoint);
                shapePoint = {};
                // 처음 그리는 경우
                if (lineData.length === 2) {
                    path = new Shape({
                        position: startPos,
                        lineData: lineData,
                        naverMap: map
                    });
                } else {
                    path.draw(lineData);
                }
                path.setMap(map);
            }
            // naver.maps.Event.removeListener(leftClick);
        });

        // eslint-disable-next-line prefer-const
        moveEvent = naver.maps.Event.addListener(map, 'mousemove', e => {
            if (isClick) {
                const tempPoint = {};
                tempPoint.x = e.originalEvent.clientX;
                tempPoint.y = e.originalEvent.clientY;
                lineData[lineData.length - 1] = tempPoint;
                path.draw(lineData);
            }
        });

        const rightClick = naver.maps.Event.addListener(
            map,
            'rightclick',
            e => {
                this.checkDrawStatus();
                if (Shape.name === 'Line') {
                    naver.maps.Event.removeListener(moveEvent);
                } else {
                    const { coord, offset } = e;
                    const endPos = { coord, offset };
                    new Shape({
                        position: { startPos, endPos },
                        naverMap: map,
                        zoom: ''
                    }).setMap(map);
                }
                naver.maps.Event.removeListener(leftClick);
                naver.maps.Event.removeListener(rightClick);
                this.setState({ isInShapeCreateMode: false });
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
        console.log('selectedIcon: ', selectedIcon);
        this.setState({ selectedButton: selectedIcon });
        this.setState({ isInShapeCreateMode: true });
        this.createShapeTest(selectedIcon); // Enter parameter for different shape
    };

    render() {
        const { drawingData, map, closeFn } = this.props;
        const { theNumberOfFigure, selectedButton, shapes, isInShapeCreateMode } = this.state;
        return (
            <div id="drawingComponentContainer">
                {shapes.map(shape => {
                    console.log('Drawing', shape);
                    console.log(selectedButton === shape);

                    return (
                        <Button
                            map={map}
                            icons={shape}
                            selectButton={this.selectButton}
                            isSelected={selectedButton === shape && isInShapeCreateMode ? true : false}
                        />
                    );
                })}
                <div id="myDrawingsContainer">
                    {theNumberOfFigure.map(el => {
                        return <MyDrawingElement key={'Idrew' + el} />;
                    })}
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
                        onClick={() => closeFn()}
                    >
                        {`닫기`}
                    </button>
                </div>
            </div>
        );
    }
}

export default Drawing;
