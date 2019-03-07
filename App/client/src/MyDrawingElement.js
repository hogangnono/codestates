import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './Drawing.less';
import { IoMdTrash } from 'react-icons/io';
// import Circle from './CustomOverlay/Circle';

class MyDrawingElement extends Component {
    deleteShape = () => {
        console.log('삭제버튼을 눌렀습니다!');
    }

    render() {
        return (
            <div className="drewShape">
                <span>도형을 그렸다!</span>
                <IoMdTrash onClick={this.deleteShape} />
            </div>
        );
    }
}

export default MyDrawingElement;