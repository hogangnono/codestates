import React, { Component } from 'react';
// import '../App.less';
import PropTypes from 'prop-types';
import '../Drawing.less';


class Button extends Component {
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
        const { map } = this.props;
        const { Shape } = this.props;
        const { toggle } = this.state;

        if (toggle === true) {
            const leftClick = naver.maps.Event.addListener(map, 'click', e => {
                const { coord, offset } = e;
                startPos = { coord, offset };

                naver.maps.Event.removeListener(leftClick);
            });

            const rightClick = naver.maps.Event.addListener(map, 'rightclick', e => {
                const { coord, offset } = e;
                const endPos = { coord, offset };
                new Shape({
                    position: { startPos, endPos },
                    naverMap: map,
                    zoom: ''
                }).setMap(map);

                naver.maps.Event.removeListener(rightClick);
            });

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
    }

    render() {
        // const { toggle } = this.state;
        // const btnClass = toggle ? 'lightPurple' : 'darkPurple';
        const { title } = this.props;

        return (
            <div>
                <span type="button" className="drawingTools" onClick={this.createShape} onKeyPress={() => { }} ref={this.setWrapperRef}>
                    {title}
                </span>
            </div>
        );
    }
}

Button.propTypes = {
    children: PropTypes.element.isRequired
};

export default Button;
