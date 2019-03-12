import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/NearbyFactorItem.less';

export default class NearbyFactorItem extends Component {
    static propTypes = {
        el: PropTypes.number.isRequired,
        setNearbyFactorItems: PropTypes.func.isRequired
    };

    render() {
        const { el, setNearbyFactorItems } = this.props;
        return (
            <div
                className="NearbyFactorItem"
                onClick={() => setNearbyFactorItems()}
                onKeyPress={() => setNearbyFactorItems()}
                role="button"
                tabIndex="0"
            >
                <div className="factorName">
                    ` $
                    {el}
                    네임`
                </div>
                <div className="descriptionName">디스크립션</div>
            </div>
        );
    }
}
