import React, { Component } from 'react';
import './Drawing.less';
import axios from 'axios';
import upwardsPointer from './img/upwards-pointer.png';
import downwardsPointer from './img/downwards-pointer.png';
import Button from './Components/Button';
import Circle from './CustomOverlay/Circle';

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
            <div onClick={this._foldMyDrawings} onKeyPress={() => { }}>
                <img className="drawingPointer" src={upwardsPointer} alt="▴" />
            </div>
        );
        const invisible = (
            <div onClick={this._foldMyDrawings} onKeyPress={() => { }}>
                <img
                    className="drawingPointer"
                    src={downwardsPointer}
                    alt="▼"
                />
            </div>
        );
        const { drawingdata, map } = this.props;
        return (
            <div id="drawingComponentContainer">
                <Button map={map} Shape={Circle} title="선" />
                <Button map={map} Shape={Circle} title="화살표" />
                <Button map={map} Shape={Circle} title="사각형" />
                <Button map={map} Shape={Circle} title="원" />
                <Button map={map} Shape={Circle} title="다각형" />
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
