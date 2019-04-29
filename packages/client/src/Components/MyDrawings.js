/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as MakeSecret from '../Module/simpleEncryption';
import { API_USER_USERDRAWING_PATH } from '../constants';
import '../less/MyDrawings.less';

class MyDrawings extends Component {
    static propTypes = {
        toggleLoginModal: PropTypes.func.isRequired,
        initUserName: PropTypes.func.isRequired
    };

    state = {
        userDrawingSet: {}
    };

    componentDidMount = async () => {
        const userName = MakeSecret.Decrypt(
            JSON.parse(localStorage.getItem('token'))
        );
        if (userName) {
            await axios
                .post(API_USER_USERDRAWING_PATH, {
                    name: userName
                })
                .then(result => {
                    this.setState({ userDrawingSet: result });
                });
        }
    };

    handleLogout = () => {
        const { toggleLoginModal, initUserName } = this.props;
        initUserName();
        toggleLoginModal();
        localStorage.removeItem('token');
    };

    render() {
        const { userDrawingSet } = this.state;
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
                            {Object.keys(userDrawingSet).length ? (
                                userDrawingSet.data.map(figure => {
                                    return (
                                        <div key={'myDrawing' + figure.id}>
                                            <li className="myDrawingLists">
                                                <span className="myDrawingEachListTitle">
                                                    {figure.title}
                                                </span>
                                                <span className="myDrawingEachListDes">
                                                    {figure.description}
                                                </span>
                                            </li>
                                        </div>
                                    );
                                })
                            ) : (
                                <div />
                            )}
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
