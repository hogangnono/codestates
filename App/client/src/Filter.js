import React, { Component } from 'react';
import './Filter.less';
class Toolbox extends Component {
    state = {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false
    };

    _toggle1 = () => {
        const { check1 } = this.state;
        this.setState({ check1: !check1 });
    };

    _toggle2 = () => {
        const { check2 } = this.state;
        this.setState({ check2: !check2 });
    };

    _toggle3 = () => {
        const { check3 } = this.state;
        this.setState({ check3: !check3 });
    };

    _toggle4 = () => {
        const { check4 } = this.state;
        this.setState({ check4: !check4 });
    };

    _toggle5 = () => {
        const { check5 } = this.state;
        this.setState({ check5: !check5 });
    };

    _toggle6 = () => {
        const { check6 } = this.state;
        this.setState({ check6: !check6 });
    };

    _toggle7 = () => {
        const { check7 } = this.state;
        this.setState({ check7: !check7 });
    };

    render() {
        const {
            check1,
            check2,
            check3,
            check4,
            check5,
            check6,
            check7
        } = this.state;
        return (
            <div id="filterContainer">
                <div className="filterBox">
                    <div
                        className="filterBtn"
                        onClick={this._toggle1}
                        onKeyPress={this._toggle1}
                        role="button"
                        tabIndex="0"
                        style={{
                            color: check1 ? '#4d55b2' : '#333',
                            'border-bottom': check1 ? '2px solid #aaa' : 'none'
                        }}
                    >
                        # 상권형성
                    </div>
                    <div
                        className="filterBtn"
                        onClick={this._toggle2}
                        onKeyPress={this._toggle2}
                        role="button"
                        tabIndex="0"
                        style={{
                            color: check2 ? '#4d55b2' : '#333',
                            'border-bottom': check2 ? '2px solid #aaa' : 'none'
                        }}
                    >
                        # 재건축
                    </div>
                    <div
                        className="filterBtn"
                        onClick={this._toggle3}
                        onKeyPress={this._toggle3}
                        role="button"
                        tabIndex="0"
                        style={{
                            color: check3 ? '#4d55b2' : '#333',
                            'border-bottom': check3 ? '2px solid #aaa' : 'none'
                        }}
                    >
                        # 공공기관/문화/대형병원
                    </div>
                    <div
                        className="filterBtn"
                        onClick={this._toggle4}
                        onKeyPress={this._toggle4}
                        role="button"
                        tabIndex="0"
                        style={{
                            color: check4 ? '#4d55b2' : '#333',
                            'border-bottom': check4 ? '2px solid #aaa' : 'none'
                        }}
                    >
                        # 도로개통/확장
                    </div>
                    <div
                        className="filterBtn"
                        onClick={this._toggle5}
                        onKeyPress={this._toggle5}
                        role="button"
                        tabIndex="0"
                        style={{
                            color: check5 ? '#4d55b2' : '#333',
                            'border-bottom': check5 ? '2px solid #aaa' : 'none'
                        }}
                    >
                        # 지하철개통
                    </div>
                    <div
                        className="filterBtn"
                        onClick={this._toggle6}
                        onKeyPress={this._toggle6}
                        role="button"
                        tabIndex="0"
                        style={{
                            color: check6 ? '#4d55b2' : '#333',
                            'border-bottom': check6 ? '2px solid #aaa' : 'none'
                        }}
                    >
                        # 기타
                    </div>
                </div>

                <div className="buttonBox">
                    <div
                        className="myInfoButton"
                        onClick={this._toggle7}
                        onKeyPress={this._toggle7}
                        role="button"
                        tabIndex="0"
                        style={{
                            color: check7 ? '#fff' : '#4d55b2',
                            'background-color': check7 ? '#4d55b2' : '#fff'
                        }}
                    >
                        내 정보 보기
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbox;
