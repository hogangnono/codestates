import React, { Component } from 'react';
import '../less/LoginModal.less';
import axios from 'axios';
import PropTypes from 'prop-types';
import MyDrawings from './MyDrawings';
import * as MakeSecret from '../Module/simpleEncryption';

class LoginModal extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        toggleModal: PropTypes.func.isRequired,
        handleUserNameOnChange: PropTypes.func.isRequired
    };

    state = {
        isLogin: false
    };

    componentDidMount() {
        const isLogin = localStorage.getItem('isLogin');
        console.log('isLogin', isLogin);
        if (JSON.parse(isLogin)) {
            this.setState({ isLogin: true });
        }
    }

    handleLogin = () => {
        const { name, toggleModal } = this.props;
        axios
        .post('http://127.0.0.1:3001/user/', {
            name
        })
        .then(async result => {
            toggleModal();
            const resultData = await result.data;
            if (result.status === 200 || result.status === 201) {
                alert(resultData);
            } else if (result.status === 204) {
                alert('호재 데이터 정보 없음');
            }
            localStorage.setItem('isLogin', JSON.stringify(true));
            localStorage.setItem('token', JSON.stringify(MakeSecret.Encrypt(name)));
        })
        .catch(error => {
            toggleModal();
            alert(error);
        });
    };

    handleLogout = () => {
        const { toggleModal } = this.props;
        toggleModal();
        this.setState({ isLogin: false });
        localStorage.setItem('isLogin', JSON.stringify(false));
        localStorage.removeItem('token');
    }

    render() {
        const { name, toggleModal, handleUserNameOnChange } = this.props;
        const { isLogin } = this.state;
        return (
            <div id="loginModalContainer">
                <div className="loginModal">
                    <div
                        className="close"
                        onClick={toggleModal}
                        onKeyDown={toggleModal}
                        role="button"
                        tabIndex="0"
                    >
                        {`x`}
                    </div>
                    { isLogin ? (
                        <div>
                            <MyDrawings name={name} />
                            <button type="button" onClick={this.handleLogout}>로그아웃</button>
                        </div>
                    ) : (
                        <div className="inputContainer">
                            <span className="username">이름 </span>
                            <input
                                className="textInputBox"
                                type="text"
                                placeholder="이름(ID)을 입력해주세요!"
                                onChange={text => { handleUserNameOnChange(text.target.value); }}
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
                    ) }
                </div>
            </div>
        );
    }
}

export default LoginModal;
