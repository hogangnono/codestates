/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import './LoginModal.less';
import close from './img/cancel.png';


class LoginModal extends Component {

    render() {
        return (
            <div id="loginModalContainer">
                <p className="loginModal">
                    <span className="close"><image src={close} alt="X" /></span>
                  Login Modal
                </p>
            </div>
        );
    }
}

export default LoginModal;
