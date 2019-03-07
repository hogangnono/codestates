import React, { Component } from 'react';
import './Filter.less';
// import axios from 'axios';
// import Circle from './CustomOverlay/Circle';

class Toolbox extends Component {
    state = {
        name: '',
        bound: '',
        factor: '',
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false
    };
    // _toggle = (i) => {
    //     const { `check${i}` } = this.state;
    //     // `this.state.check${i}`
    //     this.setState(prevState=>({ `check${i}`: !`check${i}` });
    // };

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

    styleToggle = check => {
        const obj = {};
        if (check) {
            obj.color = '#4d55b2';
            obj['border-bottom'] = '2px solid #aaa';
        } else {
            obj.color = '#333';
            obj['border-bottom'] = 'none';
        }
        return obj;
    };

    render() {
        const { check7 } = this.state;
        const factorBox = [
            '# 상권형성',
            '# 재건축',
            '# 공공기관/문화/대형병원',
            '# 도로개통/확장',
            '# 지하철개통',
            '# 기타'
        ];
        return (
            <div id="filterContainer">
                <div className="filterBox">
                    {factorBox.map((factor, i) => {
                        return (
                            <div
                                className="filterBtn"
                                onClick={`this._toggle${i + 1}`}
                                onKeyPress={`this._toggle${i + 1}`}
                                role="button"
                                tabIndex="0"
                                style={this.styleToggle(`check${i + 1}`)}
                            >
                                {factor}
                            </div>
                        );
                    })}
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
