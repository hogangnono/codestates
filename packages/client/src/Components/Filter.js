/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component, useState } from 'react';
import '../less/Filter.less';
import PropTypes from 'prop-types';
import FilterBox from './FilterBox';

class Filter extends Component {
    static propTypes = {
        check7: PropTypes.bool.isRequired,
        _toggle7: PropTypes.func.isRequired,
        factorLoad: PropTypes.func.isRequired
    };

    render() {
        const { check7, factorLoad, _toggle7, filterToggleBox } = this.props;
        const factorBox = [
            '상권',
            '재개발/신축',
            '업무지구',
            '교육',
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
                                filterToggleBox={filterToggleBox}
                            />
                        );
                    })}
                </div>

                <div className="buttonBox">
                    <div
                        className="myInfoButton"
                        onClick={_toggle7}
                        onKeyPress={_toggle7}
                        role="button"
                        tabIndex="0"
                        style={{
                            color: check7 ? '#fff' : '#4d55b2',
                            backgroundColor: check7 ? '#4d55b2' : '#fff'
                        }}
                    >
                        {`내 정보 보기`}
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
