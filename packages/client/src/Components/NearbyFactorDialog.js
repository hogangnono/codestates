import React, { Component } from 'react';
import '../less/NearbyFactorDialog.less';
import PropTypes from 'prop-types';
import NearbyFactorItem from './NearbyFactorItem';

export default class NearbyFactorDialog extends Component {
    static propTypes = {
        NearByFactorItems: PropTypes.array.isRequired
    };

    render() {
        const { NearByFactorItems } = this.props;
        return (
            <div className="NearbyFactorDialog">
                <div className="nearbyMenu">주변 호재</div>
                <div className="titleBox">
                    <div className="factorTitle">호재</div>
                    <div className="descriptionTitle">설명</div>
                </div>
                <div className="scrollBox">
                    {NearByFactorItems.length ? (
                        NearByFactorItems.map((factorItem, index) => (
                            <NearbyFactorItem
                                description={factorItem.description}
                                factor_id={factorItem.factor_id}
                                key={index++}
                            />
                        ))
                    ) : (
                        <div>loading</div>
                    )}
                </div>
            </div>
        );
    }
}
