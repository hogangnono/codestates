/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import NearbyDrawings from './NearbyDrawings';
import MyDrawings from './MyDrawings';
import './NearbyList.less';

class NearbyList extends Component {
    state = {
        onNearbyDrawings: true,
        onMyDrawings: false,
        nearbyListBackgroundColor: '#4d55b2',
        myDrawingsBackgroundColor: '#fff',
        nearbyFontColor: '#fff',
        myDrawingsFontColor: '#d2d4d8'
    }

    handleOnNearbyDrawings = value => {
        this.setState({
            onNearbyDrawings: value,
            onMyDrawings: false,
            nearbyListBackgroundColor: '#4d55b2',
            myDrawingsBackgroundColor: '#fff',
            nearbyFontColor: '#fff',
            myDrawingsFontColor: '#d2d4d8'
        });
    };

    handleOnMyDrawings = value => {
        this.setState({
            onNearbyDrawings: false,
            onMyDrawings: value,
            nearbyListBackgroundColor: '#fff',
            myDrawingsBackgroundColor: '#4d55b2',
            nearbyFontColor: '#d2d4d8',
            myDrawingsFontColor: '#fff'
        });
    };

    render() {
        const {
            nearbyListBackgroundColor,
            myDrawingsBackgroundColor,
            nearbyFontColor,
            myDrawingsFontColor,
            onNearbyDrawings,
            onMyDrawings
        } = this.state;
        return (
            <div id="nearbyListContainer">
                <div id="nearbyTabMenu">
                    <div className="nearbyEachTabMenu"
                        style={{
                            backgroundColor: nearbyListBackgroundColor,
                            color: nearbyFontColor
                        }}
                        onClick={() => {
                            this.handleOnNearbyDrawings(true);
                        }}
                        onKeyPress={() => {}}>
                        {`주변 호재`}
                    </div>
                    <div className="nearbyEachTabMenu"
                        style={{
                            backgroundColor: myDrawingsBackgroundColor,
                            color: myDrawingsFontColor
                        }}
                        onClick={() => {
                            this.handleOnMyDrawings(true);
                        }}
                        onKeyPress={() => {}}>
                        {`My 호재`}
                    </div>
                </div>
                <div>
                    {onNearbyDrawings ? (<NearbyDrawings />) : null}
                    {onMyDrawings ? (<MyDrawings />) : null}
                </div>
            </div>
        );
    }
}

export default NearbyList;
