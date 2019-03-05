import React, { Component } from 'react';
import './Drawing.less';
import axios from 'axios';
import upwardsPointer from './img/upwards-pointer.png';
import downwardsPointer from './img/downwards-pointer.png';

class Toolbox extends Component {
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
            <div onClick={this._foldMyDrawings} onKeyPress={() => {}}>
                <img className="drawingPointer" src={upwardsPointer} alt="▴" />
            </div>
        );
        const invisible = (
            <div onClick={this._foldMyDrawings} onKeyPress={() => {}}>
                <img
                    className="drawingPointer"
                    src={downwardsPointer}
                    alt="▼"
                />
            </div>
        );
        const { drawingdata } = this.props;
        return (
            <div id="drawingComponentContainer">
                <span className="drawingTools">선</span>
                <span className="drawingTools">화살표</span>
                <span className="drawingTools">사각형</span>
                <span className="drawingTools">원</span>
                <span className="drawingTools">다각형</span>
                <div id="myDrawingsContainer">
                    <span className="subTitle">저장된 호재 그림</span>
                    {myDrawingsVisible ? visible : invisible}
                </div>
                {myDrawingsVisible ? (
                    <div>
                        <p className="drawingList">drawing1</p>
                        <p className="drawingList">drawing2</p>
                        <p className="drawingList">drawing3</p>
                        <p className="drawingList">drawing4</p>
                        <p className="drawingList">drawing5</p>
                    </div>
                ) : null}
                <div id="saveCloseBtns">
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => {
                            this.handleAxios('user/save', drawingdata);
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
