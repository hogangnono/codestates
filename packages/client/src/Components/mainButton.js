import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MainButton extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        className: PropTypes.func.isRequired,
        cond: PropTypes.bool.isRequired
    };

    render() {
        const { name, onClick, className, cond } = this.props;

        return (
            <div
                className={`loginFavorBtn ${className}`}
                onClick={() => {
                    if (cond) {
                        onClick();
                    }
                }}
                onKeyPress={() => {
                    if (cond) {
                        onClick();
                    }
                }}
                role="button"
                tabIndex="0"
                key={name}
            >
                {name}
            </div>
        );
    }
}
