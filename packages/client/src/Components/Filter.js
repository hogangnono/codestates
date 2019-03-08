/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import '../less/Filter.less';
import axios from 'axios';
import * as d3 from 'd3';
import Circle from '../CustomOverlay/Circle';

class Filter extends Component {
    state = {
        name: 'jihun',
        bound: '',
        factor: '',
        check7: false,
        factorArray: []
    };

    _toggle7 = () => {
        const { check7 } = this.state;
        this.setState({ check7: !check7 });
    };

    // styleToggle = check => {
    //     const obj = {};
    //     if (check) {
    //         obj.color = '#4d55b2';
    //         obj['border-bottom'] = '2px solid #aaa';
    //     } else {
    //         obj.color = '#333';
    //         obj['border-bottom'] = 'none';
    //     }
    //     return obj;
    // };

    mapOption = () => {
        const naver = window.naver;
        const mapOptions = {
            zoomControl: true,
            zoomControlOptions: {
                style: naver.maps.ZoomControlStyle.SMALL,
                position: naver.maps.Position.LEFT_BOTTOM
            },
            logoControl: true,
            logoControlOptions: {
                position: naver.maps.Position.BOTTOM_RIGHT
            },
            scaleControl: true,
            scaleControlOptions: {
                position: naver.maps.Position.BOTTOM_RIGHT
            },
            mapDataControl: true,
            mapDataControlOptions: {
                position: naver.maps.Position.BOTTOM_RIGHT
            }
        };
        return mapOptions;
    };

    factorLoad = async (fact, i) => {
        // let
        const naver = window.naver;
        const map = await new naver.maps.Map(
            d3.select('#map').node(),
            this.mapOption()
        );
        const { name, bound, factorArray, factor } = this.state;
        await this.setState({ factor: fact });
        if (!factorArray.includes(fact)) {
            await this.setState({ factorArray: [...factorArray, fact] });
        }
        axios
            .post('http://127.0.0.1:3001/user/load', {
                name,
                bound,
                factor
            })
            .then(async result => {
                const resultData = await result.data;
                if (result.status === 200 || result.status === 201) {
                    resultData.map(el => {
                        const { startPos, endPos, zoomLevel } = JSON.parse(
                            el.figures
                        );
                        return new Circle({
                            position: { startPos, endPos },
                            naverMap: map,
                            zoom: zoomLevel
                        }).setMap(map);
                    });
                } else if (result.status === 204) {
                    alert('호재 데이터 정보 없음');
                }
            })
            .catch(error => {
                alert(error);
            });
    };

    render() {
        const { check7 } = this.state;
        const factorBox = [
            '상권형성',
            '재건축',
            '공공기관/문화/대형병원',
            '도로개통/확장',
            '지하철개통',
            '기타'
        ];
        return (
            <div id="filterContainer">
                <div className="filterBox">
                    {factorBox.map((factor, i) => {
                        return (
                            <div
                                className="filterBtn"
                                onClick={() => this.factorLoad(factor)}
                                onKeyPress={() => { }}
                                role="button"
                                tabIndex="0"
                                key={factor}
                            // style={this.styleToggle(check1)}
                            >
                                {'# '}
                                {factor}
                            </div>
                        );
                    })}
                </div>

                <div className="buttonBox">
                    <div
                        className="myInfoButton"
                        onClick={this._toggle7}
                        onKeyPress={this._toggle7}
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
