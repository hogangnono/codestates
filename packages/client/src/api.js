import axios from 'axios';
import Circle from './CustomOverlay/Circle';

const drawData = (name, bound, factors, toggle, drawList, map) => {
    axios
        .post('http://127.0.0.1:3001/user/load', {
            name,
            bound,
            factors
        })
        .then(async result => {
            // toggle, this.drawList, map,
            const data = await result.data;
            const resultData = await data[0];
            const userData = await data[1];
            const drawing = el => {
                const { startPos, endPos, zoomLevel } = JSON.parse(el.figures);
                if (!(el.id in drawList)) {
                    const overlay = new Circle({
                        position: { startPos, endPos },
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
                            // TODO:
                            drawing(el);
                        });
                    } else if (resultData && !toggle) {
                        resultData.map(async el => {
                            // TODO:
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
