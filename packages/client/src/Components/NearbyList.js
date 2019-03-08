/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NearbyDrawings from './NearbyDrawings';
import MyDrawings from './MyDrawings';
import '../less/NearbyList.less';

class NearbyList extends Component {
    static propTypes = {
        mapLoad: PropTypes.object.isRequired
    };

    state = {
        onNearbyDrawings: true,
        onMyDrawings: false,
        nearbyListBackgroundColor: '#4d55b2',
        myDrawingsBackgroundColor: '#fff',
        nearbyFontColor: '#fff',
        myDrawingsFontColor: '#d2d4d8'
    };

    componentDidMount = () => {
        console.log('나는 componentDidMount입니다!');
        // const naver = window.naver;
        // const { map } = this.props;
        // naver.maps.Event.addListener(map, 'idle', e => {
        //     console.log('e', e);
        // });
    };

    getCenterLatLng = () => {
        const { mapLoad } = this.props;
        const mapCenter = mapLoad.getCenter();
        console.log('mapCenter : ', mapCenter);
        // this.setState({ mapCenter });
    };

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
            myDrawingsFontColor: '#333'
        });
    };

    render() {
        const { mapLoad } = this.props;
        console.log('render의 map이에요.\n지금 map의 값 : ', mapLoad);
        const {
            nearbyListBackgroundColor,
            myDrawingsBackgroundColor,
            nearbyFontColor,
            myDrawingsFontColor,
            onNearbyDrawings,
            onMyDrawings
        } = this.state;
        if (!mapLoad) {
            console.log('render return 전에 if 문에 들어왔어요!');
            return <div />;
        }
        return (
            <div id="nearbyListContainer">
                <div id="nearbyTabMenu">
                    <div
                        className="nearbyEachTabMenu"
                        style={{
                            backgroundColor: nearbyListBackgroundColor,
                            color: nearbyFontColor
                        }}
                        onClick={() => {
                            this.handleOnNearbyDrawings(true);
                        }}
                        onKeyDown={this.handleOnNearbyDrawings}
                        role="button"
                        tabIndex="0"
                    >
                        {`주변 호재`}
                    </div>
                    <div
                        className="nearbyEachTabMenu drawing"
                        style={{
                            backgroundColor: myDrawingsBackgroundColor,
                            color: myDrawingsFontColor
                        }}
                        onClick={() => {
                            this.handleOnMyDrawings(true);
                        }}
                        onKeyDown={this.handleOnMyDrawings}
                        role="button"
                        tabIndex="0"
                    >
                        {`My 호재`}
                    </div>
                </div>
                <div>
                    {onNearbyDrawings ? <NearbyDrawings /> : null}
                    {onMyDrawings ? <MyDrawings /> : null}
                </div>
            </div>
        );
    }
}

export default NearbyList;
