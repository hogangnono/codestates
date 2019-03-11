import React, { Component } from 'react';

export default class MainButton extends Component {
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
