/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import './Filter.less';
class Toolbox extends Component {
    render() {
        return (
            <div>
                <button className="tools">필터1</button>
                <button className="tools">필터2</button>
                <button className="tools">필터3</button>
                <button className="tools">필터4</button>
                <button className="tools">필터5</button>
                <button className="tools">필터6</button>

            </div>
        );
    }
}

export default Toolbox;
