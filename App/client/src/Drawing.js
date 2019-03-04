/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import './Drawing.less';
import axios from 'axios';
import upwardsPointer from './img/upwards-pointer.png';
import downwardsPointer from './img/downwards-pointer.png';

class Toolbox extends Component {
    state = {
        myDrawingsVisible: true,
        map_center_lat: 37.545537,
        map_center_lgn: 127.051068,
        figures: '{"startPos":{"coord":{"y":37.56806,"_lat":37.56806,"x":126.97090,"_lng":126.97090},"offset":{"x":142,"y":285}},"endPos":{"coord":{"y":37.56255,"_lat":37.56255,"x":126.9794809,"_lng":126.9794809},"offset":{"x":520,"y":590}},"zoomLevel":11}',
        user_id: 1,
        factor_id: 2
    }

    _foldMyDrawings = () => {
        const { myDrawingsVisible } = this.state;
        this.setState({ myDrawingsVisible: !myDrawingsVisible });
    }

    handleAxios = (parseURL, body) => {
        const basicURL = 'http://localhost:3001/';
        axios.post(basicURL + parseURL, body)
            .then((result) => { console.log('result: ', result); })
            .catch(err => { console.log('err: ', err); });
    }

    render() {
        const { myDrawingsVisible } = this.state;
        const visible = (
            <div onClick={this._foldMyDrawings} onKeyPress={() => { }}>
                <span className="subTitle">닫기</span>
                <img className="drawingPointer" src={upwardsPointer} alt="▴" />
            </div>
        );
        const invisible = (
            <div onClick={this._foldMyDrawings} onKeyPress={() => { }}>
                <span className="subTitle">펼치기</span>
                <img className="drawingPointer" src={downwardsPointer} alt="▼" />
            </div>
        );
        const { map_center_lat, map_center_lgn, figures, user_id, factor_id } = this.state;
        const body = { map_center_lat, map_center_lgn, figures, user_id, factor_id };
        return (
            <div id="drawingToolContainer">
                <div>
                    <button className="tools">점</button>
                    <button className="tools">선</button>
                    <button className="tools">화살표</button>
                    <button className="tools">사각형</button>
                    <button className="tools">원</button>
                    <button className="tools">다각형</button>
                </div>
                <div>
                    <div id="myDrawingsContainer">
                        <span className="subTitle">저장된 호재 그림</span>
                        {myDrawingsVisible ? visible : invisible}
                    </div>
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
                    <button id="saveBtn" onClick={() => {
                        console.log('body : ', body);
                        this.handleAxios('user/save', body);
                    }}>
                        저장
                    </button>
                    <button id="saveBtn">닫기</button>
                </div>
            </div>
        );
    }
}

export default Toolbox;
