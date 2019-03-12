import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import '../less/Toolbox.less';

class FilterContainer extends Component {
    static propTypes = {
        MyInfoButton: PropTypes.bool.isRequired,
        myInfoToggle: PropTypes.func.isRequired,
        factorLoad: PropTypes.func.isRequired,
        showFilter: PropTypes.func.isRequired
    };

    render() {
        const {
            MyInfoButton,
            myInfoToggle,
            factorLoad,
            showFilter
        } = this.props;
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
                            MyInfoButton={MyInfoButton}
                            myInfoToggle={myInfoToggle}
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
