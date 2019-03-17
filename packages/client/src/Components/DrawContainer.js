import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawing from './Drawing';
import '../less/Toolbox.less';

class DrawContainer extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        mapLoad: PropTypes.object,
        handleToggle: PropTypes.func.isRequired,
        updateDrawingData: PropTypes.func.isRequired,
        toggleLoginModal: PropTypes.func.isRequired,
        NearByFactorItems: PropTypes.array.isRequired,
        initDrawingListAfterSave: PropTypes.func.isRequired,
        showDraw: PropTypes.func.isRequired,
        showDrawingSetTitleDescriptionModal: PropTypes.func.isRequired,
        descriptionModalShow: PropTypes.func.isRequired,
        descriptionModalHide: PropTypes.func.isRequired
    };

    render() {
        const {
            drawingData,
            mapLoad,
            handleToggle,
            toggleLoginModal,
            updateDrawingData,
            NearByFactorItems,
            initDrawingListAfterSave,
            showDraw,
            showDrawingSetTitleDescriptionModal,
            descriptionModalShow,
            descriptionModalHide
        } = this.props;
        return (
            <div id="toolbox">
                <div id="tabMenu">
                    <div className="eachTabMenu">그리기</div>
                </div>
                <div>
                    <div>
                        <Drawing
                            map={mapLoad}
                            drawingData={drawingData}
                            updateDrawingData={updateDrawingData}
                            toggleLoginModal={toggleLoginModal}
                            handleToggle={handleToggle}
                            NearByFactorItems={NearByFactorItems}
                            initDrawingListAfterSave={initDrawingListAfterSave}
                            showDraw={showDraw}
                            showDrawingSetTitleDescriptionModal={showDrawingSetTitleDescriptionModal}
                            descriptionModalShow={descriptionModalShow}
                            descriptionModalHide={descriptionModalHide}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default DrawContainer;
