import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Drawing.less';
import axios from 'axios';
import Button from './Components/Button';
import Circle from './CustomOverlay/Circle';
import MyDrawingElement from './MyDrawingElement';

class Toolbox extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        map: PropTypes.object.isRequired,
        closeFn: PropTypes.func.isRequired
    };

    state = {
        index: 0,
        theNumberOfFigure: []
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
        const { theNumberOfFigure } = this.state;
        return (
            <div id="drawingComponentContainer">
                <Button map={map} Shape={Circle} icons="line" drewStatus={this.checkDrawStatus} />
                <Button map={map} Shape={Circle} icons="arrow" drewStatus={this.checkDrawStatus} />
                <Button map={map} Shape={Circle} icons="square" drewStatus={this.checkDrawStatus} />
                <Button map={map} Shape={Circle} icons="circle" drewStatus={this.checkDrawStatus} />
                <Button map={map} Shape={Circle} icons="polygon" drewStatus={this.checkDrawStatus} />
                <div id="myDrawingsContainer">
                    { theNumberOfFigure.map(el => {
                        return (
                            <MyDrawingElement key={'Idrew' + el} />
                        );
                    }) }
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

export default Toolbox;
