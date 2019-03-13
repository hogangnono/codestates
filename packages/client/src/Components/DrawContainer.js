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
        toggleModal: PropTypes.func.isRequired,
        name: PropTypes.string
    };

    render() {
        const {
            drawingData,
            mapLoad,
            handleToggle,
            toggleModal,
            updateDrawingData,
            name
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
                            name={name}
                            drawingData={drawingData}
                            updateDrawingData={updateDrawingData}
                            toggleModal={toggleModal}
                            handleToggle={handleToggle}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default DrawContainer;
