import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import { IoMdTrash } from 'react-icons/io';
// import Circle from './CustomOverlay/Circle';

class MyDrawingElement extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired
    };

    deleteShape = () => {
        console.log('삭제버튼을 눌렀습니다!');
    }

    render() {
        return (
            <div className="drewShape">
                <span>도형을 그렸다!</span>
                <IoMdTrash
                    className="deleteDrawingDataIcon"
                    onClick={this.deleteShape}
                />
            </div>
        );
    }
}

export default MyDrawingElement;
