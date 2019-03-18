import axios from 'axios';
import { SLACK_GENERAL_PATH } from '../constants';
import * as MakeScret from './simpleEncryption';
// import * as ipsumLorem from './randomIpsumLorem';

const saveHandle = (data, drawingSetInfo, toggleLoginModal, initDrawingData, showDraw, showDrawingSetTitleDescriptionModal) => {
    const token = JSON.parse(localStorage.getItem('token'));
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
        processedData.factor_id = Math.floor(Math.random() * (8 - 0)); // TODO: title, description Modal 완성되면 수정해야함
        dataSet.push(processedData);
    });

    // 로그인 되어 있는 상태
    if (token) {
        const name = MakeScret.Decrypt(token);
        if (!data.length) {
            return alert(
                '그린 도형이 없습니다.\n도형을 그리고 저장버튼을 눌러주세요 :)'
            );
        }
        let reqBody;
        if (data.length === 1) {
            reqBody = {
                name: name,
                data: dataSet,
                drawingSetInfo: {
                    title: dataSet[0].title,
                    description: dataSet[0].description
                }
            };
        } else if (data.length > 1) {
            if (!drawingSetInfo) {
                return showDrawingSetTitleDescriptionModal(true);
            } else {
                reqBody = {
                    name: name,
                    data: dataSet,
                    drawingSetInfo: drawingSetInfo
                };
            }
        }
        const pressValue = confirm('그린 호재 정보를 심사요청했습니다.\n신청하신 내용이 승인이 된 후에 지도에 표시되게 됩니다.');
        if (pressValue) {
            initDrawingData();
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
            return axios
                    .post(SLACK_GENERAL_PATH, JSON.stringify(options))
                    .then(result => {
                        showDraw();
                        showDrawingSetTitleDescriptionModal(false);
                        console.log('SUCCEEDED: Sent slack webhook: \n', result.data);
                    })
                    .catch(err => {
                        alert(
                            '도형 저장에 실패했습니다.\n콘솔에서 err 메시지를 확인해주세요.'
                        );
                        console.log('Result for axios.post(/save) :::::::\n', err);
                    });
        }
    // 로그인 안된 상태
    } else {
        alert('저장을 위해선 로그인이 필요합니다 :)');
        toggleLoginModal();
    }
};

export default saveHandle;
