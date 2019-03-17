import axios from 'axios';
import { SLACK_GENERAL_PATH } from '../constants';
// import * as ipsumLorem from './randomIpsumLorem';

const saveHandle = (name, data, callBack) => {
    // console.log('===================');
    // console.log('saveHandle 함수가 호출되었습니다.');
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log('data in saveHandle : ', data);

    const dataSet = [];

    data.map(oneShape => {
        const figuresData = {};
        figuresData.shape = oneShape.shapeType;
        figuresData.lineData = oneShape.figure._lineData;
        figuresData.zoomLevel = oneShape.figure._zoom;

        const figuresCss = {};
        figuresCss.fill = oneShape.figure._fill;
        figuresCss.color = oneShape.figure._color;

        const processedData = {};
        const _lineData = oneShape.figure._lineData;
        processedData.start_lat = _lineData[0].coord._lat;
        processedData.start_lng = _lineData[0].coord._lng;
        processedData.end_lat = _lineData[_lineData.length - 1].coord._lat;
        processedData.end_lng = _lineData[_lineData.length - 1].coord._lng;
        processedData.figures = JSON.stringify(figuresData);
        processedData.title = oneShape.title; // Fixed. Go to App.js line 260 to see!
        processedData.description = oneShape.value; // Fixed
        processedData.css = JSON.stringify(figuresCss);
        processedData.factor_id = Math.floor(Math.random() * (8 - 0));
        dataSet.push(processedData);
    });
    const reqBody = {
        name: name,
        data: dataSet
    };
    const options = {
        // mrkdwn: true,
        attachments: [
            {
                title: `${name}님의 호재 정보입니다.`,
                color: '#4d55b2'
            },
            {
                title: 'Description',
                text: `${dataSet[0].description}`,
                color: '#4d55b2'
            },
            {
                fallback: '호재 정보를 database 에 저장하시겠습니까?',
                title: '호재 정보를 database 에 저장하시겠습니까??',
                color: '#4d55b2',
                attachment_type: 'default',
                callback_id: 'sendData',
                actions: [
                    {
                        name: 'Accept',
                        text: 'Accept',
                        type: 'button',
                        value: JSON.stringify(reqBody)
                    },
                    {
                        name: 'Refuse',
                        text: 'Refuse',
                        style: 'danger',
                        type: 'button',
                        value: 'Refuse'
                    }
                ]
            }
        ]
    };

    if (token) {
        if (!data.length) {
            return alert(
                '그린 도형이 없습니다.\n도형을 그리고 저장버튼을 눌러주세요 :)'
            );
        }

        return axios
            .post(SLACK_GENERAL_PATH, JSON.stringify(options))
            .then(result => {
                alert('성공적으로 데이터를 보냈습니다.');
                console.log('SUCCEEDED: Sent slack webhook: \n', result.data);
            })
            .catch(err => {
                alert(
                    '도형 저장에 실패했습니다.\n콘솔에서 err 메시지를 확인해주세요.'
                );
                console.log('Result for axios.post(/save) :::::::\n', err);
            });
    } else {
        alert('저장을 위해선 로그인이 필요합니다 :)');
        callBack();
    }
};

export default saveHandle;
