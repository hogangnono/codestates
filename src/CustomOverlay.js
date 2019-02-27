import * as d3 from 'd3'

// 오버레이 생성
const CustomOverlay = function (options) {
    this._element = d3.select('#map')
        .append('svg')
        .attr('width', window.innerWidth)
        .attr('height', window.innerHeight);
    this.setPosition(options.position);
    this.setMap(options.map || null);
};
// CustomOverlay는 OverlayView를 상속받습니다.
CustomOverlay.prototype = new window.naver.maps.OverlayView();

CustomOverlay.prototype.constructor = CustomOverlay;

CustomOverlay.prototype.onAdd = function () {
    const overlayLayer = this.getPanes().overlayLayer;
    overlayLayer.appendChild(this._element.node());
};

CustomOverlay.prototype.draw = function () {
    // 지도 객체가 설정되지 않았으면 draw 기능을 하지 않습니다.
    if (!this.getMap()) {
        return;
    }

    // projection 객체를 통해 LatLng 좌표를 화면 좌표로 변경합니다.
    const projection = this.getProjection();

    const position = this.getPosition();

    const pixelPosition = projection.fromCoordToOffset(position);


    var line = this._element.append("circle")
        .attr("cx", pixelPosition.x)
        .attr("cy", pixelPosition.y)
        .attr("r", 50);
};

CustomOverlay.prototype.onRemove = function () {
    this._element.remove();
    this._element.off();
};

CustomOverlay.prototype.setPosition = function (position) {
    this._position = position;
    this.draw();
};

CustomOverlay.prototype.getPosition = function () {
    return this._position;
};
export default CustomOverlay;
// 오버레이 삭제
// overlay.setMap(null);