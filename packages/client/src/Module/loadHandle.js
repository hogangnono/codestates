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
            // const resultData = await data[0];
            // const userData = await data[1];
            const [resultData, userData] = await data;
            const overlays = [Line, Arrow, Rect, Circle, Polygon];
            const nearbyFactors = [];
            let drawShape;
            console.log(resultData);
            const drawing = el => {
                const { shape, lineData, zoomLevel } = JSON.parse(el.figures);
                const { description, factor_id, id } = el;
                const factorNearby = {
                    description: description,
                    factor_id: factor_id
                };
                nearbyFactors.push(factorNearby);
                if (nearbyFactors.length && !name) {
                    nearbyData(nearbyFactors);
                }
                if (!(id in drawList)) {
                    for (let i = 0; i < overlays.length; i++) {
                        if (shape === overlays[i].name) {
                            drawShape = overlays[i];
                        }
                    }
                    const overlay = new drawShape({
                        lineData,
                        naverMap: map,
                        zoom: zoomLevel
                    });
                    overlay.setMap(map);
                    drawList[el.id] = overlay;
                }
            };
            switch (result.status) {
                case 200:
                case 201:
                    if (userData && toggle) {
                        userData.map(async el => {
                            drawing(el);
                        });
                    } else if (resultData && !toggle) {
                        resultData.map(async el => {
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
