import React, { Component } from 'react';
import './Filter.less';
class Toolbox extends Component {
    render() {
        return (
            <ul id="filterContainer">
                <li className="filterBtn">필터2</li>
                <li className="filterBtn">필터3</li>
                <li className="filterBtn">필터4</li>
                <li className="filterBtn">필터5</li>
                <li className="filterBtn">필터1</li>
            </ul>
        );
    }
}

export default Toolbox;
