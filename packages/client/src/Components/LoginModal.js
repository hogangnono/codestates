import React, { Component } from 'react';
import '../less/LoginModal.less';
import axios from 'axios';
import PropTypes from 'prop-types';
import MyDrawings from './MyDrawings';
import * as MakeSecret from '../Module/simpleEncryption';
import loadingImg from './imgs/loading.gif';
import logo from './imgs/logo.png';
import { API_USER_PATH } from '../constants';

class LoginModal extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        toggleLoginModal: PropTypes.func.isRequired,
        handleUserNameOnChange: PropTypes.func.isRequired,
        initUserName: PropTypes.func.isRequired
    };

    state = {
        getResultForLogin: false // loading image before getting Axios.post login result
    };

    handleLogin = () => {
        const { name, toggleLoginModal } = this.props;

        if (name) {
            this.setState({ getResultForLogin: true });
            axios
                .post(API_USER_PATH, {
                    name
                })
                .then(async result => {
                    this.setState({ getResultForLogin: false });
                    toggleLoginModal();
                    const resultData = await result.data;
                    if (result.status === 200 || result.status === 201) {
                        alert(resultData);
                    } else if (result.status === 204) {
                        alert('호재 데이터 정보 없음');
                    }
                    localStorage.setItem(
                        'token',
                        JSON.stringify(MakeSecret.Encrypt(name))
                    );
                })
                .catch(error => {
                    toggleLoginModal();
                    alert(error);
                });
        } else {
            alert('올바른 이름을 입력해주세요 :)');
        }
    };

    render() {
        const { getResultForLogin } = this.state;
        const { name, toggleLoginModal, handleUserNameOnChange, initUserName } = this.props;
        const isLogin = !!localStorage.getItem('token');
        return (
            <div id="loginModalContainer">
                <div className="loginModal">
                    <div
                        className="close"
                        onClick={toggleLoginModal}
                        onKeyDown={toggleLoginModal}
                        role="button"
                        tabIndex="0"
                    >
                        {`x`}
                    </div>
                    {isLogin ? (
                        <div>
                            <MyDrawings name={name} toggleLoginModal={toggleLoginModal} initUserName={initUserName} />
                        </div>
                    ) : (
                        <div className="inputContainer">
                            <div className="logoImgContainer">
                                <img src={logo} className="logoImg" alt="" />
                            </div>
                            <div className="righSideContainer">
                                <p className="loginText">환영합니다!</p>
                                <p className="loginText">로그인을 해주세요</p>
                                <div className="loginInputContainer">
                                    <input
                                        className="textInputBox"
                                        type="text"
                                        placeholder="이름(ID)을 입력해주세요!"
                                        onChange={text => {
                                            handleUserNameOnChange(text.target.value);
                                        }}
                                    />
                                    <div
                                        className="loginButton"
                                        role="button"
                                        tabIndex="0"
                                        onClick={this.handleLogin}
                                        onKeyDown={this.handleLogin}
                                    >
                                        {`확인`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {getResultForLogin ? (
                    <div id="LoginloadingImg">
                        <img src={loadingImg} alt="" />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default LoginModal;
