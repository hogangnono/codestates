import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import { IoMdTrash } from 'react-icons/io';

class MyDrawingElement extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        updateDrawingData: PropTypes.func
    };

    deleteShape = event => {
        const { drawingData, updateDrawingData } = this.props;
        const getIndex = event.target.parentNode.parentNode.attributes.value.value;
        updateDrawingData(drawingData, true, getIndex);
        drawingData[getIndex].figure.onRemove();
    };

    render() {
        const { drawingData } = this.props;
        return (
            <div>
                {drawingData.map((shapeData, index) => {
                    const newIndex = index + 1;
                    return (
                        <div className="drewShape" key={newIndex} value={index}>
                            <span>{shapeData.shapeType}</span>
                            <IoMdTrash
                                className="deleteDrawingDataIcon"
                                onClick={this.deleteShape}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default MyDrawingElement;
