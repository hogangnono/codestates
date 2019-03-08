/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/NearbyList.less';

class NearbyList extends Component {
    static propTypes = {
        mapLoad: PropTypes.object.isRequired
    };

    state = {
        nearbyListBackgroundColor: '#4d55b2',
        nearbyFontColor: '#fff'
    };

    getCenterLatLng = () => {
        // const { mapLoad } = this.props;
        // const mapCenter = mapLoad.getCenter();
    };

    render() {
        const { mapLoad } = this.props;
        // console.log('render의 map이에요.\n지금 map의 값 : ', mapLoad);
        const {
            nearbyListBackgroundColor,
            nearbyFontColor
        } = this.state;
        if (!mapLoad) {
            return <div />;
        }
        return (
            <div id="nearbyListContainer">
                <div
                    className="nearbyMenu"
                    style={{
                        backgroundColor: nearbyListBackgroundColor,
                        color: nearbyFontColor
                    }}
                >
                    {`주변 호재`}
                </div>
            </div>
        );
    }
}

export default NearbyList;
