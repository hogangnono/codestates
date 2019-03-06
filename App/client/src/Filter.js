import React, { Component } from 'react';
import './Filter.less';
class Toolbox extends Component {
    render() {
        return (
            <ul id="filterContainer">
                <li className="filterBtn"># 상권형성</li>
                <li className="filterBtn"># 재건축</li>
                <li className="filterBtn"># 공공기관/문화/대형병원</li>
                <li className="filterBtn"># 도로개통/확장</li>
                <li className="filterBtn"># 지하철개통</li>
                <li className="filterBtn"># 기타</li>
            </ul>
        );
    }
}

export default Toolbox;
