/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import '../less/MyDrawings.less';

const fakeData = [
    {
        id: 1,
        center_lat: 37.455,
        center_lng: 125.324,
        figures: '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    },
    {
        id: 1,
        center_lat: 37.455,
        center_lng: 125.324,
        figures: '[{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11},{startPos:1,endPos:2,zoomLevel:11}]',
        description: '지하철이 연장개통한다고 해요.',
        css: '{backgroundColor: blue}',
        factor_id: 1,
        drawing_id: 1,
        Drawing: {
            id: 1,
            user_id: 1,
            createdAt: '2019-03-07T02:18:55.000Z',
            updatedAt: '2019-03-07T02:18:55.000Z'
        }
    }
];

const fakeFactor = ['상권형성', '재건축', '공공기관/문화/대형병원 시설부지', '도로개통/확장', '지하철개통', '기타'];

class MyDrawings extends Component {
    render() {
        return (
            <div>
                <ul id="myDrawingsContainer">
                    {fakeData.map(figure => {
                        return (
                            <>
                                <li key={'myDrawing' + figure.id} className="myDrawingLists">
                                    <span className="myDrawingEachListTitle">{`[${fakeFactor[figure.factor_id]}]  `}</span>
                                    <span className="myDrawingEachListDes">{figure.description}</span>
                                </li>
                            </>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default MyDrawings;
