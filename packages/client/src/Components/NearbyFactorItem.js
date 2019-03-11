import React, { Component } from 'react';
import '../less/NearbyFactorItem.less';

export default class NearbyFactorItem extends Component {
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
