import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import { IoMdTrash } from 'react-icons/io';
// import Circle from './CustomOverlay/Circle';

class MyDrawingElement extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        updateDrawingData: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    deleteShape = (event) => {
        console.log('== 삭제기능 호출 ==');
        const { drawingData } = this.props;
        // const getIndex = this.myRef.current.attributes.getNamedItem('value').value;
        const getIndex = event.target.parentNode.parentNode.attributes.value.value;
        console.log('getIndex : ', getIndex);
        console.log('drawingData', drawingData[getIndex].figure._element);
    };

    render() {
        const { drawingData } = this.props;
        return (
            <div>
                {drawingData.map((shapeData, index) => {
                    const newIndex = index + 1;
                    return (
                        <div className="drewShape" key={newIndex} value={index} ref={this.myRef}>
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
