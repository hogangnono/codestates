/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import '../less/MyDrawings.less';
import PropTypes from 'prop-types';

const fakeData = [
    {
        id: 1,
        center_lat: 37.455,
        center_lng: 125.324,
        figures:
            '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    },
    {
        id: 2,
        center_lat: 37.455,
        center_lng: 125.324,
        figures:
            '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    },
    {
        id: 3,
        center_lat: 37.455,
        center_lng: 125.324,
        figures:
            '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    },
    {
        id: 4,
        center_lat: 37.455,
        center_lng: 125.324,
        figures:
            '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    },
    {
        id: 5,
        center_lat: 37.455,
        center_lng: 125.324,
        figures:
            '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    },
    {
        id: 6,
        center_lat: 37.455,
        center_lng: 125.324,
        figures:
            '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    },
    {
        id: 7,
        center_lat: 37.455,
        center_lng: 125.324,
        figures:
            '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    }
];

const fakeFactor = [
    '상권형성',
    '재건축',
    '공공기관/문화/대형병원 시설부지',
    '도로개통/확장',
    '지하철개통',
    '기타'
];

class MyDrawings extends Component {
    static propTypes = {
        toggleLoginModal: PropTypes.func.isRequired,
        initUserName: PropTypes.func.isRequired
    };

    handleLogout = () => {
        const { toggleLoginModal, initUserName } = this.props;
        initUserName();
        toggleLoginModal();
        localStorage.removeItem('token');
    }

    render() {
        return (
            <div>
                <div id="myDrawingsContainer">
                    <div className="topInMyDrawingContainer">
                        <div className="welcome">
                            <p>내가 그린 부동산 호재 목록</p>
                        </div>
                    </div>
                    <div className="subMyDrawingContainer">
                        <div className="titleBox">
                            <div className="factorTitle">호재</div>
                            <div className="descriptionTitle">설명</div>
                        </div>
                        <div className="myDrawingListsContainer">
                            {fakeData.map(figure => {
                                return (
                                    <div key={'myDrawing' + figure.id}>
                                        <li className="myDrawingLists">
                                            <span className="myDrawingEachListTitle">
                                                {fakeFactor[figure.factor_id]}
                                            </span>
                                            <span className="myDrawingEachListDes">
                                                {figure.description}
                                            </span>
                                        </li>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className="logoutButton"
                        onClick={this.handleLogout}
                        onKeyDown={this.handleLogout}
                        role="button"
                        tabIndex="0"
                    >
                        {`로그아웃`}
                    </div>
                </div>
            </div>
        );
    }
}

export default MyDrawings;
