import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import axios from 'axios';
import Button from '../Module/Button';
import Circle from '../CustomOverlay/Circle';
import MyDrawingElement from './MyDrawingElement';
import buttonState from '../Module/shapeButtonStates';

class Drawing extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        map: PropTypes.object.isRequired,
        closeFn: PropTypes.func.isRequired
    };

    state = {
        index: 0,
        theNumberOfFigure: [],
        lineButtonToggle: false, // ButtonToggle values will be set when clicked.
        arrowButtonToggle: false, // ""
        squareButtonToggle: false, // ""
        circleButtonToggle: false, // ""
        polygonButtonToggle: false // ""
    }

    handleAxios = (parseURL, body) => {
        const basicURL = 'http://localhost:3001/';
        axios
            .post(basicURL + parseURL, body)
            .then(result => {
                console.log('저장성공!');
            })
            .catch(err => {
                console.log('err: ', err);
            });
    };

    checkDrawStatus = () => {
        const { index, theNumberOfFigure } = this.state;
        this.setState({
            theNumberOfFigure: [...theNumberOfFigure, index + 1],
            index: index + 1
        });
    }

    render() {
        const { drawingData, map, closeFn } = this.props;
        const { theNumberOfFigure,
            polygonButtonToggle,
            lineButtonToggle,
            squareButtonToggle,
            circleButtonToggle,
            arrowButtonToggle } = this.state;

        const lineButtonState = buttonState.line.bind(this);
        const arrowButtonState = buttonState.arrow.bind(this);
        const squareButtonState = buttonState.square.bind(this);
        const circleButtonState = buttonState.circle.bind(this);
        const polygonButtonState = buttonState.polygon.bind(this);

        return (
            <div id="drawingComponentContainer">
                <div onClick={lineButtonState} onKeyPress={() => { }}>
                    <Button map={map} Shape={Circle} icons="line" drewStatus={this.checkDrawStatus} toggle={lineButtonToggle} />
                </div>
                <div onClick={arrowButtonState} onKeyPress={() => { }}>
                    <Button map={map} Shape={Circle} icons="arrow" drewStatus={this.checkDrawStatus} toggle={arrowButtonToggle} />
                </div>
                <div onClick={squareButtonState} onKeyPress={() => { }}>
                    <Button map={map} Shape={Circle} icons="square" drewStatus={this.checkDrawStatus} toggle={squareButtonToggle} />
                </div>
                <div onClick={circleButtonState} onKeyPress={() => { }}>
                    <Button map={map} Shape={Circle} icons="circle" drewStatus={this.checkDrawStatus} toggle={circleButtonToggle} />
                </div>
                <div onClick={polygonButtonState} onKeyPress={() => { }}>
                    <Button map={map} Shape={Circle} icons="polygon" drewStatus={this.checkDrawStatus} toggle={polygonButtonToggle} />
                </div>
                <div id="myDrawingsContainer">
                    {theNumberOfFigure.map(el => {
                        return (
                            <MyDrawingElement key={'Idrew' + el} />
                        );
                    })}
                </div>
                <div id="saveCloseBtns">
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => {
                            this.handleAxios('user/save', drawingData);
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
