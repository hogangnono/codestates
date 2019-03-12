/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
    FaSlash,
    FaCircle,
    FaSquareFull,
    FaDrawPolygon,
    FaArrowLeft
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import '../less/Drawing.less';

class Button extends Component {
    static propTypes = {
        icons: PropTypes.string.isRequired,
        selectButton: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired
    };

    render() {
        const { selectButton, isSelected, icons } = this.props;

        return (
            <div>
                <span
                    role="button"
                    tabIndex="0"
                    className={
                        isSelected ? 'selected drawingTools' : 'drawingTools'
                    }
                    onKeyPress={() => {}}
                    onClick={() => {
                        selectButton(icons);
                    }}
                >
                    {icons === 'line' ? (
                        <FaSlash
                            className={
                                isSelected
                                    ? 'rotateIcon1 selectedIcon'
                                    : 'rotateIcon1'
                            }
                        />
                    ) : icons === 'arrow' ? (
                        <FaArrowLeft
                            className={
                                isSelected
                                    ? 'rotateIcon2 selectedIcon'
                                    : 'rotateIcon2'
                            }
                        />
                    ) : icons === 'square' ? (
                        <FaSquareFull
                            className={isSelected ? 'selectedIcon' : ''}
                        />
                    ) : icons === 'circle' ? (
                        <FaCircle
                            className={isSelected ? 'selectedIcon' : ''}
                        />
                    ) : (
                        <FaDrawPolygon
                            className={isSelected ? 'selectedIcon' : ''}
                        />
                    )}
                </span>
            </div>
        );
    }
}

export default Button;
