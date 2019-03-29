/* eslint-disable camelcase */
import axios from 'axios';
import Line from '../CustomOverlay/Line';
import Arrow from '../CustomOverlay/Arrow';
import Circle from '../CustomOverlay/Circle';
import Rect from '../CustomOverlay/Rect';
import Polygon from '../CustomOverlay/Polygon';
import { API_USER_LOAD_PATH } from '../constants';
const drawData = (name, bound, factors, toggle, drawList, map, nearbyData) => {
    axios
        .post(API_USER_LOAD_PATH, {
            name,
            bound,
            factors
        })
        .then(async result => {
            const data = await result.data;
            const [resultData, userData] = await data; // 무슨차이?
            const nearbyFactors = [];
            const drawing = el => {
                const { shape, lineData, zoomLevel } = JSON.parse(el.figures);
                const { fill, color } = JSON.parse(el.css);
                const { factor_id, id } = el;
                console.log('====================');
                console.log('resultData : ', resultData);
                console.log('userData : ', userData);
                console.log('factor_id : ', factor_id);
                console.log('id : ', id);
                console.log('drawList : ', drawList);
                const { title, description } = el.Drawing;
                const factorNearby = {
                    title,
                    description,
                    factor_id
                };
                nearbyFactors.push(factorNearby);
                if (nearbyFactors.length && !name) {
                    nearbyData(nearbyFactors);
                }
                if (!(id in drawList)) {
                    switch (shape) {
                        case 'Line': {
                            const overlay = new Line({
                                fill,
                                color,
                                lineData,
                                naverMap: map,
                                zoom: zoomLevel
                            });
                            overlay.setMap(map);
                            drawList[id] = overlay;
                            break;
                        }
                        case 'Arrow': {
                            const overlay = new Arrow({
                                fill,
                                color,
                                lineData,
                                naverMap: map,
                                zoom: zoomLevel
                            });
                            overlay.setMap(map);
                            drawList[id] = overlay;
                            break;
                        }
                        case 'Rect': {
                            const overlay = new Rect({
                                fill,
                                color,
                                lineData,
                                naverMap: map,
                                zoom: zoomLevel
                            });
                            overlay.setMap(map);
                            drawList[id] = overlay;
                            break;
                        }
                        case 'Circle': {
                            const overlay = new Circle({
                                fill,
                                color,
                                lineData,
                                naverMap: map,
                                zoom: zoomLevel
                            });
                            overlay.setMap(map);
                            drawList[id] = overlay;
                            break;
                        }
                        case 'Polygon': {
                            const overlay = new Polygon({
                                fill,
                                color,
                                lineData,
                                naverMap: map,
                                zoom: zoomLevel
                            });
                            overlay.setMap(map);
                            drawList[id] = overlay;
                            break;
                        }
                    }
                }
            };
            switch (result.status) {
                case 200:
                case 201:
                    console.log('여기(201)를 작업중이에요');
                    if (userData && toggle) {
                        console.log('유저데이터를 작업중이에요');
                        userData.map(async el => {
                            console.log(el);
                            drawing(el);
                        });
                    } else if (resultData && !toggle) {
                        console.log('리절트데이터를 작업중이에요');
                        resultData.map(async el => {
                            // console.log(el);
                            drawing(el);
                        });
                    }
                    break;
                case 204:
                    alert('호재 데이터 정보 없음');
                    break;
            }
        })
        .catch(error => {
            alert(error);
        });
};
export default drawData;
