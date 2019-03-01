/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import './Toolbox.css';
class Toolbox extends Component {
    constructor(props) {
        super(props);
        this.toolbox = undefined;
    }

    render() {
        // map is created when render is over
        const { map } = this.props;
        if (!map) {
            this.toolbox = (<div>hello</div>);
        } else {
            this.toolbox = (
                <div id="toolbox">
                    <h2>Toolbox</h2>
                    <div>
                        <button>점</button>
                        <button>선</button>
                        <button>화살표</button>
                        <button>사각형</button>
                        <button>원</button>
                        <button>다각형</button>
                    </div>
                    <input type="textarea" placeholder="description" />
                </div>
            );
        }
        return (
            <div>{this.toolbox}</div>
        );
    }
}

export default Toolbox;
