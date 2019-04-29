import React, { Component } from 'react';
import '../less/Filter.less';
import PropTypes from 'prop-types';

class FilterBox extends Component {
    static propTypes = {
        factor: PropTypes.string.isRequired,
        factorLoad: PropTypes.func.isRequired
    };

    render() {
        const { factor, factorLoad } = this.props;
        return (
            <div
                className="filterBtn"
                onClick={() => factorLoad(factor)}
                onKeyPress={() => factorLoad(factor)}
                role="button"
                tabIndex="0"
            >
                <label htmlFor="opt-in">
                    <input type="checkbox" id="opt-in" />
                    <div className="colorBox" />
                    <div className="checkedBox">{factor}</div>
                </label>
            </div>
        );
    }
}

export default FilterBox;
