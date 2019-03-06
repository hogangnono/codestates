import React, { Component } from 'react';
import Filter from './Filter';
import Drawing from './Drawing';
import './Toolbox.less';

class Toolbox extends Component {
    state = {
        onFilter: true,
        onDrawing: false,
        backgroundBlueForFilterTab: '#4d55b2',
        backgroundBlueForDrawingTab: '#ffffff',
        filterColor: '#fff',
        drawingColor: '#333'
    };

    handleOnFilter = value => {
        this.setState({
            onDrawing: false,
            onFilter: value,
            backgroundBlueForFilterTab: '#4d55b2',
            backgroundBlueForDrawingTab: '#fff',
            filterColor: '#fff',
            drawingColor: '#333'
        });
    };

    handleOnDrawing = value => {
        this.setState({
            onFilter: false,
            onDrawing: value,
            backgroundBlueForFilterTab: '#fff',
            backgroundBlueForDrawingTab: '#4d55b2',
            filterColor: '#333',
            drawingColor: '#fff'
        });
    };

    render() {
        const { drawingdata } = this.props;
        const {
            backgroundBlueForFilterTab,
            backgroundBlueForDrawingTab,
            onFilter,
            onDrawing,
            filterColor,
            drawingColor
        } = this.state;
        return (
            <div id="toolbox">
                <div id="tabMenu">
                    <div
                        className="eachTabMenu"
                        style={{
                            backgroundColor: backgroundBlueForFilterTab,
                            color: filterColor
                        }}
                        onClick={() => {
                            this.handleOnFilter(true);
                        }}
                        onKeyPress={() => {}}
                    >
                        {`필터`}
                    </div>
                    <div
                        className="eachTabMenu drawing"
                        style={{
                            backgroundColor: backgroundBlueForDrawingTab,
                            color: drawingColor
                        }}
                        onClick={() => {
                            this.handleOnDrawing(true);
                        }}
                        onKeyPress={() => {}}
                    >
                        {`그리기`}
                    </div>
                </div>
                <div>
                    {onFilter ? <Filter /> : null}
                    {onDrawing ? <Drawing drawingdata={drawingdata} /> : null}
                </div>
            </div>
        );
    }
}

export default Toolbox;
