/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import './LoginModal.less';

class LoginModal extends Component {
    handleLogin = () => {
        console.log('로그인버튼을 눌렀습니다.');
        localStorage.setItem('isLogin', JSON.stringify(true));
        this.closeModal();
    };

    render() {
        return (
            <div id="loginModalContainer">
                <div className="loginModal">
                    <span className="close">x</span>
                    <div className="inputContainer">
                        <span className="username">이름 </span>
                        <input
                            type="text"
                            placeholder="이름(ID)을 입력해주세요!"
                        />
                        <button
                            type="button"
                            title="로그인"
                            onClick={this.handleLogin}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginModal;
