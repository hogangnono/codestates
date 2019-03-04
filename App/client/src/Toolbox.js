/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import Filter from './Filter';
import Drawing from './Drawing';
import './Toolbox.less';

class Toolbox extends Component {
    constructor(props) {
        super(props);
        this.toolbox = undefined;
        this.state = {
            onFilter: true,
            onDrawing: false
        };
    }

    handleOnFilter = (value) => {
        this.setState({ onDrawing: false });
        this.setState({ onFilter: value });
    }

    handleOnDrawing = (value) => {
        this.setState({ onFilter: false });
        this.setState({ onDrawing: value });
    }

    render() {
        // map is created when render is over
        const { mapLoad } = this.props;
        const { onFilter, onDrawing } = this.state;
        if (!mapLoad) {
            this.toolbox = <div>hello</div>;
        }
        return (
            <div id="toolbox">
                <div id="tabMenu">
                    <div>
                        <span id="filter" onClick={() => { this.handleOnFilter(true); }} onKeyPress={() => { }}>필터!</span>
                    </div>
                    <div>
                        <span id="drawing" onClick={() => { this.handleOnDrawing(true); }} onKeyPress={() => { }}>그리기</span>
                    </div>
                </div>
                {onFilter ? <Filter /> : null}
                {onDrawing ? <Drawing /> : null}
            </div>
        );
    }
}

export default Toolbox;
