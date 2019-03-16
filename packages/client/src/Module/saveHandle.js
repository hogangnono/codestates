import axios from 'axios';
import { SLACK_GENERAL_PATH } from '../constants';
import * as ipsumLorem from './randomIpsumLorem';

const saveHandle = (name, data, toggleLoginModal, initDrawingData, showDraw) => {
    const token = JSON.parse(localStorage.getItem('token'));

    const dataSet = [];
    console.log('data ::: ', data);
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
        processedData.end_lng = _lineData[_lineData.length - 1].coord._lat;
        processedData.figures = JSON.stringify(figuresData);
        processedData.title = ipsumLorem.randomTitle(); // TODO: title, description Modal 완성되면 수정해야함
        processedData.description = ipsumLorem.randomDescription(); // TODO: title, description Modal 완성되면 수정해야함
        processedData.css = JSON.stringify(figuresCss);
        processedData.factor_id = Math.floor(Math.random() * (8 - 0)); // TODO: title, description Modal 완성되면 수정해야함
        dataSet.push(processedData);
    });

    let reqBody;
    if (data.length === 1) {
        reqBody = {
            name: name,
            data: dataSet
        };
    } else if (data.length > 1) {
        reqBody = {
            /* do something */
        };
    }

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
        } else {
            const pressValue = confirm('그린 호재 정보를 심사요청했습니다.\n신청하신 내용이 승인이 된 후에 지도에 표시되게 됩니다.\n심사 상태는 [My]메뉴에서 확인하실 수 있습니다 :)');
            if (pressValue) {
                initDrawingData();
                return axios
                        .post(SLACK_GENERAL_PATH, JSON.stringify(options))
                        .then(result => {
                            showDraw();
                            console.log('SUCCEEDED: Sent slack webhook: \n', result.data);
                        })
                        .catch(err => {
                            alert(
                                '도형 저장에 실패했습니다.\n콘솔에서 err 메시지를 확인해주세요.'
                            );
                            console.log('Result for axios.post(/save) :::::::\n', err);
                        });
            }
        }
    } else {
        alert('저장을 위해선 로그인이 필요합니다 :)');
        toggleLoginModal();
    }
};

export default saveHandle;
