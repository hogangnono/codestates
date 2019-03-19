/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import '../less/MyDrawings.less';
import PropTypes from 'prop-types';

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
        const { myDrawingList } = this.props;
        console.log('myDrawing: ', myDrawingList);
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
                            {/* {myDrawingList.map(figure => {
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
                            })} */}
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
