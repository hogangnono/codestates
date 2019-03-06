import React, { Component } from 'react';
import './LoginModal.less';
import axios from 'axios';
import PropTypes from 'prop-types';

class LoginModal extends Component {
    static propTypes = {
        showModal: PropTypes.func.isRequired
    };

    state = {
        name: ''
    };

    componentDidMount() {}

    handleLogin = () => {
        const { showModal } = this.props;
        const { name } = this.state;
        axios
            .get('http://127.0.0.1:3001/user/', {
                name
            })
            .then(async result => {
                const resultData = await result.data;
                if (result.status === 200 || result.status === 201) {
                    alert(resultData);
                } else if (result.status === 204) {
                    alert('호재 데이터 정보 없음');
                }
            })
            .catch(error => {
                alert(error);
            });
        showModal();
    };

    handleChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    render() {
        const { showModal } = this.props;
        const { name } = this.state;
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
                            value={name}
                            onChange={this.handleChange}
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
