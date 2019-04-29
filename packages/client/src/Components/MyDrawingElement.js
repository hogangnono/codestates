import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import { IoMdTrash } from 'react-icons/io';
import {
    FaSlash,
    FaCircle,
    FaSquareFull,
    FaDrawPolygon,
    FaArrowLeft
} from 'react-icons/fa';

const type = {
    Line: {
        korean: '선',
        component: (<FaSlash />)
    },
    Arrow: {
        korean: '화살표',
        component: (<FaArrowLeft />)
    },
    Rect: {
        korean: '사각형',
        component: (<FaSquareFull />)
    },
    Circle: {
        korean: '원',
        component: (<FaCircle />)
    },
    Polygon: {
        korean: '다각형',
        component: (<FaDrawPolygon />)
    }
};

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
                    const shapeType = shapeData.shapeType;
                    return (
                        <div className="drewShape" key={newIndex} value={index}>
                            {type[shapeType].component}
                            {shapeData.title
                                ? (<span>{`${shapeData.title.substr(0, 10)}..`}</span>)
                                : (<span>{type[shapeType].korean}</span>)
                            }
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
