/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants';
import '../less/NearbyFactorItem.less';

export default class NearbyFactorItem extends Component {
    static propTypes = {
        factor_id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired
    };

    render() {
        const { description, factor_id } = this.props;
        const factorCategories = Object.keys(constants.newToggleBox);
        let factorName;
        for (let i = 0; i < factorCategories.length; i++) {
            if (factor_id - 1 === i) {
                factorName = factorCategories[i];
            }
        }
        return (
            <div className="NearbyFactorItem">
                <div className="factorName">{factorName}</div>
                { description.length > 25
                    ? (<div className="descriptionName">{`${description.substr(0, 25)}..`}</div>)
                    : (<div className="descriptionName">{description}</div>)
                }
            </div>
        );
    }
}
