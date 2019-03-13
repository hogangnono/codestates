import axios from 'axios';
import { API_USER_SAVE_PATH } from '../constants';

const saveHandle = (name, data, callBack) => {
    console.log('===================');
    console.log('saveHandle 함수가 호출되었습니다.');
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('data in saveHandle : ', data);

    const dataSet = [];

    data.map(oneShape => {
        const figuresData = {};
        figuresData.shape = oneShape.shapeType;
        figuresData.lineData = JSON.stringify(oneShape.figure._lineData);
        figuresData.zoomLevel = oneShape.figure._zoom;
        console.log('figuresData', figuresData);

        const processedData = {};
        const _lineData = oneShape.figure._lineData;
        processedData.start_lat = _lineData[0].coord._lat;
        processedData.start_lng = _lineData[0].coord._lng;
        processedData.end_lat = _lineData[_lineData.length - 1].coord._lat;
        processedData.end_lng = _lineData[_lineData.length - 1].coord._lat;
        processedData.figures = JSON.stringify(figuresData);
        processedData.description = 'test_description';
        processedData.css = 'test_lessCss';
        processedData.factor_id = 3;

        dataSet.push(processedData);
    });
    const reqBody = {
        name: name,
        data: dataSet
    };
    console.log('reqBOdy:n', reqBody);
    console.log('===================');

    if (token) {
        if (!data.length) {
            return alert(
                '그린 도형이 없습니다.\n도형을 그리고 저장버튼을 눌러주세요 :)'
            );
        }

        return axios
                .post(API_USER_SAVE_PATH, reqBody)
                .then(result => alert('성공적으로 저장되었습니다.'))
                .catch(err => {
                    alert('도형 저장에 실패했습니다.\n콘솔에서 err 메시지를 확인해주세요.');
                    console.log('Result for axios.post(/save) :::::::\n', err);
                });
    } else {
        alert('저장을 위해선 로그인이 필요합니다 :)');
        callBack();
    }
};

export default saveHandle;
