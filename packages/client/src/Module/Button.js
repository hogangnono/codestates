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
        map: PropTypes.object.isRequired,
        Shape: PropTypes.func.isRequired,
        drewStatus: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            map: props.map, // Set this up as props
            leftClick: undefined,
            rightClick: undefined
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            // if (event.button === 2 && isInShapeCreateMode === true) {
            //     // this.setState({ isInShapeCreateMode: false }, () => { console.log(isInShapeCreateMode); });
            // }
            console.log('Clicked outside.');
        }
    }

    render() {
        const { selectButton, isSelected, isInShapeCreateMode } = this.props;
        const { icons } = this.props;
        console.log(icons, ' isInShapeCreateMode: ', isInShapeCreateMode, ', isSelected: ' + isSelected);

        return (
            <div>
                <span
                    role="button"
                    tabIndex="0"
                    className={
                        isSelected ? 'selected drawingTools' : 'drawingTools'
                    }
                    onKeyPress={() => { }}
                    ref={this.setWrapperRef}
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
// <Shape className="rotateIcon1 rotateIcon2" />

// Button.propTypes = {
//     children: PropTypes.element.isRequired
// };

export default Button;
