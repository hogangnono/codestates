import React, { Component } from 'react';
import './LoginModal.less';
import PropTypes from 'prop-types';

class LoginModal extends Component {
    static propTypes = {
        showModal: PropTypes.func.isRequired
    };

    handleLogin = () => {
        console.log('로그인버튼을 눌렀습니다.');
        localStorage.setItem('isLogin', JSON.stringify(true));
        this.closeModal();
    };

    render() {
        const { showModal } = this.props;
        return (
            <div id="loginModalContainer">
                <div className="loginModal">
                    <div
                        className="close"
                        onClick={showModal}
                        onKeyDown={showModal}
                        role="button"
                        tabIndex="0"
                    >
                        x
                    </div>
                    <div className="inputContainer">
                        <span className="username">이름 </span>
                        <input
                            className="textInputBox"
                            type="text"
                            placeholder="이름(ID)을 입력해주세요!"
                        />
                        <button
                            type="button"
                            title="로그인"
                            onClick={this.handleLogin}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginModal;
