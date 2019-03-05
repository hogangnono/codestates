import React, { Component } from 'react';
// import * as d3 from 'd3';
// import axios from 'axios';
import '../App.less';
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
        // this.circleToggleAndEllipseAndChangeColor = this.circleToggleAndEllipseAndChangeColor.bind(this);
    }

    componentDidMount() {
        // const { map } = this.props;
        // console.log(map);
        // const { nmap } = this.props;
        // console.log(nmap);
        // this.setState({ map: map });
    }

    drawingComponent = () => {
        let startPos;
        const naver = window.naver;
        const { map } = this.state;
        const { circleToggle } = this.state;

        if (circleToggle === true) {
            const leftClick = naver.maps.Event.addListener(map, 'click', e => {
                // coord: lat, lng of map
                // offset: x, y of screen
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
        this.changeColor();
        this.drawingComponent();
        this.ellipseState();
        this.removeListener();
    }

    // mouseClick = (e) => {
    //     const { circleToggle } = this.state;
    //     const { toggleColor } = this.state;
    //     if (e.type === 'contextmenu' && circleToggle !== true) {

    //         this.setState({ toggleColor: !toggleColor });
    //         this.setState({ circleToggle: !circleToggle });
    //     }
    // }

    render() {
        const { toggleColor } = this.state;
        const btnClass = toggleColor ? 'lightPurple' : 'darkPurple';
        console.log('in CircleButton.js props: ', this.props);
        return (
            <button type="button" className={btnClass} onClick={this.circleToggleAndEllipseAndChangeColor}>
                Circle
            </button>
        );
    }
}

export default CircleButton;
