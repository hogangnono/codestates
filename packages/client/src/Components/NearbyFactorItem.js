/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants';
import '../less/NearbyFactorItem.less';

export default class NearbyFactorItem extends Component {
    static propTypes = {
        NearByFactorItems: PropTypes.array
    };

    render() {
        const { NearByFactorItems } = this.props;
        const factorCategories = Object.keys(constants.newToggleBox);
        const colorList = constants.colorList;
        return (
            <div>
                {NearByFactorItems.map((data, i) => {
                    const { title, factor_id } = data;
                    let factorName;
                    let factorColor;
                    for (let i = 0; i < factorCategories.length; i++) {
                        if (factor_id - 1 === i && title) {
                            factorName = factorCategories[i];
                            factorColor = colorList[i];
                        }
                    }
                    return (
                        <div className="NearbyFactorItem" key={i++}>
                            <div className="factorName">
                                <div className="colorCircle" style={{ backgroundColor: factorColor }} />
                                {factorName}
                            </div>
                            { title && title.length > 25
                                ? (<div className="titleName">{`${title.substr(0, 25)}..`}</div>)
                                : (<div className="titleName">{title}</div>)
                            }
                        </div>
                    );
                })}
            </div>
        );
    }
}
