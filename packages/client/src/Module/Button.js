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
        updateDrawingData: PropTypes.func.isRequired
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
        let startPos;
        const naver = window.naver;
        const { map, Shape, updateDrawingData } = this.props;
        const { toggle } = this.state;

        if (toggle === true) {
            const leftClick = naver.maps.Event.addListener(map, 'click', e => {
                const { coord, offset } = e;
                startPos = { coord, offset };

                naver.maps.Event.removeListener(leftClick);
            });

            const rightClick = naver.maps.Event.addListener(
                map,
                'rightclick',
                e => {
                    const { coord, offset } = e;
                    const endPos = { coord, offset };
                    const shapeData = {
                        position: { startPos, endPos },
                        naverMap: map,
                        zoom: ''
                    };
                    new Shape(shapeData).setMap(map);
                    updateDrawingData(shapeData);

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
