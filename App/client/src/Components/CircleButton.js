import React, { Component } from 'react';
import '../App.less';
import PropTypes from 'prop-types';
import Circle from '../CustomOverlay/Circle';


class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: props.map, // Set this up as props
            toggleColor: props.toggleColor,
            circleToggle: props.circleToggle,
            leftClick: undefined,
            rightClick: undefined
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { toggleColor } = this.state;
        const { circleToggle } = this.state;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (event.button === 2 && circleToggle !== true) {
                console.log('context menu');
                this.setState({ toggleColor: !toggleColor });
                this.setState({ circleToggle: !circleToggle });
            }
        }
    }

    drawingComponent = () => {
        let startPos;
        const naver = window.naver;
        const { map } = this.props;
        const { circleToggle } = this.state;

        console.log('in drawingComponent() map: ', map);

        if (circleToggle === true) {
            const leftClick = naver.maps.Event.addListener(map, 'click', e => {
                const { coord, offset } = e;
                startPos = { coord, offset };

                naver.maps.Event.removeListener(leftClick);
            });

            const rightClick = naver.maps.Event.addListener(map, 'rightclick', e => {
                const { coord, offset } = e;
                const endPos = { coord, offset };
                new Circle({
                    position: { startPos, endPos },
                    naverMap: map,
                    zoom: ''
                }).setMap(map);

                naver.maps.Event.removeListener(rightClick);
            });

            this.setState({ rightClick: rightClick });
            this.setState({ leftClick: leftClick });
        }
        this.setState({ circleToggle: !circleToggle }); // Complete shape and turn off toggle
    };

    ellipseState() {
        const { circleToggle } = this.state;
        this.setState({ circleToggle: !circleToggle });
    }

    removeListener() {
        const naver = window.naver;
        const { leftClick } = this.state;
        const { rightClick } = this.state;
        naver.maps.Event.removeListener(leftClick);
        naver.maps.Event.removeListener(rightClick);
    }

    changeColor() {
        const { toggleColor } = this.state;
        this.setState({ toggleColor: !toggleColor });
    }

    circleToggleAndEllipseAndChangeColor = () => {
        const { map } = this.state;
        this.changeColor();
        this.drawingComponent(map);
        this.ellipseState();
        this.removeListener();
    }

    render() {
        const { toggleColor } = this.state;
        const btnClass = toggleColor ? 'lightPurple' : 'darkPurple';

        return (
            <button type="button" className={btnClass} onClick={this.circleToggleAndEllipseAndChangeColor} ref={this.setWrapperRef}>
                Circle
            </button>
        );
    }
}

CircleButton.propTypes = {
    children: PropTypes.element.isRequired
};

export default CircleButton;
