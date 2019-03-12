import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import '../less/Toolbox.less';

class FilterContainer extends Component {
    static propTypes = {
        check7: PropTypes.bool.isRequired,
        _toggle7: PropTypes.func.isRequired,
        factorLoad: PropTypes.func.isRequired,
        showFilter: PropTypes.func.isRequired
    };

    render() {
        const { check7, _toggle7, factorLoad, showFilter } = this.props;
        return (
            <div id="toolbox">
                <div id="tabMenu">
                    <div
                        className="eachTabMenu"
                        style={{
                            backgroundColor: '#4d55b2',
                            color: '#fff'
                        }}
                    >
                        {`필터`}
                    </div>
                </div>
                <div>
                    <div>
                        <Filter
                            check7={check7}
                            _toggle7={_toggle7}
                            factorLoad={factorLoad}
                            showFilter={showFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterContainer;
