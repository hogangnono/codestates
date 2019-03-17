import React, { Component } from 'react';
import '../less/drawingSetTitleDescriptionModal.less';
import PropTypes from 'prop-types';
import saveHandle from '../Module/saveHandle';

class DrawingSetTitleDescription extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        changeDrawingSetTitle: PropTypes.func.isRequired,
        changeDrawingSetDescription: PropTypes.func.isRequired,
        toggleLoginModal: PropTypes.func.isRequired,
        initDrawingListAfterSave: PropTypes.func.isRequired,
        showDraw: PropTypes.func.isRequired,
        showDrawingSetTitleDescriptionModal: PropTypes.func.isRequired,
        drawingSetTitle: PropTypes.string,
        drawingSetDescription: PropTypes.string
    };

    handleRequestSave = () => {
        const {
            drawingData,
            drawingSetTitle,
            drawingSetDescription,
            toggleLoginModal,
            initDrawingListAfterSave,
            showDraw,
            showDrawingSetTitleDescriptionModal
        } = this.props;

        const drawingSetInfo = {
            title: drawingSetTitle,
            description: drawingSetDescription
        };
        saveHandle(
            drawingData,
            drawingSetInfo,
            toggleLoginModal,
            initDrawingListAfterSave,
            showDraw,
            showDrawingSetTitleDescriptionModal
        );
    }

    render() {
        const {
            changeDrawingSetTitle,
            changeDrawingSetDescription
        } = this.props;
        return (
            <div id="drawingSetTitleDescriptionModalContainer">
                <div className="subContainerDrawingSetModal">
                    <div className="ptags">
                        <p>방금 그린 도형들에 대한</p>
                        <p>제목과 설명을 작성해주세요.</p>
                    </div>
                    <div className="textInputContainer">
                        <input
                            className="titleInputBox"
                            type="text"
                            placeholder="도형세트의 제목 (최대 30자)"
                            maxLength="30"
                            onChange={text => {
                                changeDrawingSetTitle(text.target.value);
                            }}
                        />
                        <textarea
                            className="descriptionInputBox"
                            type="text"
                            placeholder="도형세트에 대한 설명 (최대 100자)"
                            maxLength="100"
                            onChange={text => {
                                changeDrawingSetDescription(text.target.value);
                            }}
                        />
                    </div>
                    <div
                        className="saveBtn"
                        role="button"
                        tabIndex="0"
                        onClick={this.handleRequestSave}
                        onKeyDown={() => this.handleRequestSave}
                    >
                        {`저장`}
                    </div>
                </div>
            </div>
        );
    }
}

export default DrawingSetTitleDescription;
