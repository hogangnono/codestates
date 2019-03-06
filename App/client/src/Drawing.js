import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Drawing.less';
import axios from 'axios';
import {
    FaSlash,
    FaCircle,
    FaSquareFull,
    FaDrawPolygon,
    FaArrowLeft
} from 'react-icons/fa';
import upwardsPointer from './img/upwards-pointer.png';
import downwardsPointer from './img/downwards-pointer.png';

class Toolbox extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired
    };

    state = {
        myDrawingsVisible: true
    };

    _foldMyDrawings = () => {
        const { myDrawingsVisible } = this.state;
        this.setState({ myDrawingsVisible: !myDrawingsVisible });
    };

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

    render() {
        const { myDrawingsVisible } = this.state;
        const visible = (
            <div
                onClick={this._foldMyDrawings}
                onKeyPress={this._foldMyDrawings}
                role="button"
                tabIndex="0"
            >
                <img className="drawingPointer" src={upwardsPointer} alt="▴" />
            </div>
        );
        const invisible = (
            <div
                onClick={this._foldMyDrawings}
                onKeyPress={this._foldMyDrawings}
                role="button"
                tabIndex="0"
            >
                <img
                    className="drawingPointer"
                    src={downwardsPointer}
                    alt="▼"
                />
            </div>
        );
        const { drawingData } = this.props;
        return (
            <div id="drawingComponentContainer">
                <span className="drawingTools">
                    <FaSlash className="rotateIcon1" />
                </span>
                <span className="drawingTools">
                    <FaArrowLeft className="rotateIcon2" />
                </span>
                <span className="drawingTools">
                    <FaSquareFull />
                </span>
                <span className="drawingTools">
                    <FaCircle />
                </span>
                <span className="drawingTools">
                    <FaDrawPolygon />
                </span>
                <div id="myDrawingsContainer">
                    <span className="subTitle">저장된 호재 그림</span>
                    {myDrawingsVisible ? visible : invisible}
                </div>
                {myDrawingsVisible ? (
                    <div className="userFactorList">
                        <p className="drawingList">drawing1</p>
                    </div>
                ) : null}
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
                    <button type="button" className="saveCloseBtn">
                        {`닫기`}
                    </button>
                </div>
            </div>
        );
    }
}

export default Toolbox;
