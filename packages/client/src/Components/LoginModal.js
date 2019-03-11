import React, { Component } from 'react';
import '../less/LoginModal.less';
import axios from 'axios';
import PropTypes from 'prop-types';
import MyDrawings from './MyDrawings';
import * as MakeSecret from '../Module/simpleEncryption';
import loadingImg from './imgs/loading.gif';

class LoginModal extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        toggleModal: PropTypes.func.isRequired,
        handleUserNameOnChange: PropTypes.func.isRequired
    };

    state = {
        getResultForLogin: false // loading image before getting Axios.post login result
    }

    handleLogin = () => {
        const { name, toggleModal } = this.props;
        this.setState({ getResultForLogin: true });
        axios
        .post('http://127.0.0.1:3001/user/', {
            name
        })
        .then(async result => {
            this.setState({ getResultForLogin: false });
            toggleModal();
            const resultData = await result.data;
            if (result.status === 200 || result.status === 201) {
                alert(resultData);
            } else if (result.status === 204) {
                alert('호재 데이터 정보 없음');
            }
            localStorage.setItem('token', JSON.stringify(MakeSecret.Encrypt(name)));
        })
        .catch(error => {
            toggleModal();
            alert(error);
        });
    };

    render() {
        const { getResultForLogin } = this.state;
        const { name, toggleModal, handleUserNameOnChange } = this.props;
        const isLogin = !!(localStorage.getItem('token'));
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
                            <MyDrawings name={name} toggleModal={toggleModal} />
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
                { getResultForLogin
                    ? (
                        <div id="LoginloadingImg">
                            <img src={loadingImg} alt="" />
                        </div>
                    )
                    : null
                }
            </div>
        );
    }
}

export default LoginModal;
