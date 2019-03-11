/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
    FaSlash,
    FaCircle,
    FaSquareFull,
    FaDrawPolygon,
    FaArrowLeft
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import '../less/Drawing.less';

class Button extends Component {
    static propTypes = {
        icons: PropTypes.string.isRequired,
        map: PropTypes.object.isRequired,
        Shape: PropTypes.func.isRequired,
        drewStatus: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            map: props.map, // Set this up as props
            toggle: true,
            leftClick: undefined,
            rightClick: undefined
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { toggle } = this.state;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (event.button === 2 && toggle !== true) {
                this.setState({ toggle: !toggle });
            }
        }
    }

    drawingComponent = () => {
        // let startPos;
        const naver = window.naver;
        const { map, drewStatus } = this.props;
        const { Shape } = this.props;
        const { toggle } = this.state;
        let moveEvent;
        let startPos;
        let path;
        const lineData = [];
        let shapePoint = {};
        let isClick = false;
        let isFirst = true;
        let isCircle = false;
        let newDrawing;
        let tempPoint = {};

        if (toggle === true) {
            const leftClick = naver.maps.Event.addListener(map, 'click', e => {
                const { coord, offset } = e;
                startPos = { coord, offset };
                // 화면상의 절대 좌표
                shapePoint.x = e.originalEvent.clientX;
                shapePoint.y = e.originalEvent.clientY;
                // 직선을 그릴 경우
                if (Shape.name === 'Line') {
                    lineData.push(shapePoint);
                    lineData.push(shapePoint);
                    isClick = true;
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
                } else {
                    // 원을 처음 클릭한 경우
                    if (isFirst) {
                        lineData.push(shapePoint);
                        lineData.push(shapePoint);
                        shapePoint = {};
                        isCircle = true;
                        newDrawing = new Shape({
                            position: { startPos },
                            lineData: lineData,
                            naverMap: map
                        });

                        newDrawing.setMap(map);
                    } else {
                        naver.maps.Event.removeListener(moveEvent);
                    }
                    isFirst = !isFirst;
                }
                // naver.maps.Event.removeListener(leftClick);
            });
            moveEvent = naver.maps.Event.addListener(map, 'mousemove', e => {
                tempPoint = {};
                tempPoint.x = e.originalEvent.clientX;
                tempPoint.y = e.originalEvent.clientY;
                // 직선일 경우
                if (isClick) {
                    lineData[lineData.length - 1] = tempPoint;
                    path.draw(lineData);
                }
                if (isCircle) {
                    lineData[lineData.length - 1] = tempPoint;
                    newDrawing.draw(lineData);
                }
            });
            const rightClick = naver.maps.Event.addListener(
                map,
                'rightclick',
                e => {
                    drewStatus();
                    if (Shape.name === 'Line') {
                        naver.maps.Event.removeListener(moveEvent);
                    }
                    naver.maps.Event.removeListener(leftClick);
                    naver.maps.Event.removeListener(rightClick);
                }
            );

            this.setState({ rightClick: rightClick });
            this.setState({ leftClick: leftClick });
        }
        this.setState({ toggle: !toggle }); // Complete shape and turn off toggle
    };

    toggleState() {
        const { toggle } = this.state;
        this.setState({ toggle: !toggle });
    }

    removeListener() {
        const naver = window.naver;
        const { leftClick } = this.state;
        const { rightClick } = this.state;
        naver.maps.Event.removeListener(leftClick);
        naver.maps.Event.removeListener(rightClick);
    }

    createShape = () => {
        const { map } = this.state;
        this.drawingComponent(map);
        this.toggleState();
        this.removeListener();
    };

    render() {
        // const { toggle } = this.state;
        // const btnClass = toggle ? 'lightPurple' : 'darkPurple';
        const { icons } = this.props;
        return (
            <div>
                <span
                    role="button"
                    tabIndex="0"
                    className="drawingTools"
                    onClick={this.createShape}
                    onKeyPress={this.createShape}
                    ref={this.setWrapperRef}
                >
                    {icons === 'line' ? (
                        <FaSlash className="rotateIcon1" />
                    ) : icons === 'arrow' ? (
                        <FaArrowLeft className="rotateIcon2" />
                    ) : icons === 'square' ? (
                        <FaSquareFull />
                    ) : icons === 'circle' ? (
                        <FaCircle />
                    ) : (<FaDrawPolygon />)}
                </span>
            </div>
        );
    }
}
// <Shape className="rotateIcon1 rotateIcon2" />

// Button.propTypes = {
//     children: PropTypes.element.isRequired
// };

export default Button;
