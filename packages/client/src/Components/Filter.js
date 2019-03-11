/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import '../less/Filter.less';
import PropTypes from 'prop-types';
import FilterBox from './FilterBox';

class Filter extends Component {
    static propTypes = {
        MyInfoButton: PropTypes.bool.isRequired,
        myInfoToggle: PropTypes.func.isRequired,
        factorLoad: PropTypes.func.isRequired,
        showFilter: PropTypes.func.isRequired
    };

    render() {
        const {
            MyInfoButton,
            factorLoad,
            myInfoToggle,
            showFilter
        } = this.props;
        const factorBox = [
            '상권',
            '신축/재개발',
            '교육',
            '업무지구',
            '주택단지',
            '도로개통/확장',
            '지하철개통',
            '기타'
        ];
        return (
            <div id="filterContainer">
                <div className="filterBox">
                    {factorBox.map(factor => {
                        return (
                            <FilterBox
                                factorLoad={factorLoad}
                                factor={factor}
                                key={factor}
                            />
                        );
                    })}
                </div>

                <div className="buttonBox">
                    <div
                        className={
                            'myInfoButton '
                            + (MyInfoButton ? 'checked' : 'unChecked')
                        }
                        onClick={myInfoToggle}
                        onKeyPress={myInfoToggle}
                        role="button"
                        tabIndex="0"
                    >
                        {`내 정보`}
                    </div>
                    <div
                        className="myInfoButton last"
                        onClick={showFilter}
                        onKeyPress={showFilter}
                        role="button"
                        tabIndex="0"
                    >
                        {`닫기`}
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
