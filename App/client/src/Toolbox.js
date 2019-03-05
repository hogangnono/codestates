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
            onDrawing: false,
            backgroundBlueForFilterTab: '#4d55b2',
            backgroundBlueForDrawingTab: '#ffffff'
        };
    }

    handleOnFilter = value => {
        this.setState({ onDrawing: false });
        this.setState({ onFilter: value });
        this.setState({ backgroundBlueForFilterTab: '#4d55b2' });
        this.setState({ backgroundBlueForDrawingTab: '#ffffff' });
    };

    handleOnDrawing = value => {
        this.setState({ onFilter: false });
        this.setState({ onDrawing: value });
        this.setState({ backgroundBlueForFilterTab: '#ffffff' });
        this.setState({ backgroundBlueForDrawingTab: '#4d55b2' });
    };

    render() {
        const { drawingdata } = this.props;
        const {
            backgroundBlueForFilterTab,
            backgroundBlueForDrawingTab,
            onFilter,
            onDrawing
        } = this.state;
        return (
            <div id="toolbox">
                <div id="tabMenu">
                    <div className="eachTabMenu">
                        <span
                            id="filter"
                            style={{
                                backgroundColor: backgroundBlueForFilterTab
                            }}
                            onClick={() => {
                                this.handleOnFilter(true);
                            }}
                            onKeyPress={() => {}}
                        >
                            {`필터`}
                        </span>
                    </div>
                    <div className="eachTabMenu">
                        <span
                            id="drawing"
                            style={{
                                backgroundColor: backgroundBlueForDrawingTab
                            }}
                            onClick={() => {
                                this.handleOnDrawing(true);
                            }}
                            onKeyPress={() => {}}
                        >
                            {`그리기`}
                        </span>
                    </div>
                </div>
                {onFilter ? <Filter /> : null}
                {onDrawing ? <Drawing drawingdata={drawingdata} /> : null}
            </div>
        );
    }
}

export default Toolbox;
