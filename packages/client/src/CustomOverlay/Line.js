import * as d3 from 'd3';
var Line = function(options) {
    // current map ratio
    this._zoom = options.zoom || options.naverMap.getZoom();
    this._map = options.naverMap;
    this._shapePoint = options.shapePoint;
    this.setPosition(options.position);
    this.setMap(options.map || null);
};

Line.prototype = new window.naver.maps.OverlayView();
Line.prototype.constructor = Line;

Line.prototype.setPosition = function(position) {
    this._startPos = position.point;
    this.draw();
};

Line.prototype.getPosition = function() {
    const start = {};
    start.x = this._startPos.coord.x;
    start.y = this._startPos.coord.y;
    return start;
};

Line.prototype.onAdd = function() {
    // make a div that contain line and whole info
    const div = document.createElement('div');

    // make svg that contain line
    this.svg = d3.create('svg');
    this.addShape();
    div.appendChild(this.svg.node());
    this._element = div;
    const overlayLayer = this.getPanes().overlayLayer;
    overlayLayer.appendChild(this._element);
};

Line.prototype.addShape = function() {
    this.svg.append('path');
};


Line.prototype.draw = function(point) {
    if (!this.getMap()) {
        return;
    }
    let endPixelPosition = {};
    if (!point) {
        endPixelPosition.x = this._shapePoint.x + 4;
        endPixelPosition.y = this._shapePoint.y + 4;
    } else {
        endPixelPosition = point;
    }
    this._element.className = 'aaaaaa';
    this._element.style.position = 'absolute';
    this.bound = this.map.getBounds();
    const pointt = {};
    pointt.x = this.bound._min.x;
    pointt.y = this.bound._max.y;
    new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(pointt.y, pointt.x),
        map: this.map
    });
    const projectionn = this.map.getProjection();
    const startt = projectionn.fromCoordToOffset(pointt);
    this._element.style.top = `${startt.y}px`;
    this._element.style.left = `${startt.x}px`;
    this._element.style.width = `${window.innerWidth}px`;
    this._element.style.height = `${window.innerHeight}px`;

    const svg = this._element.childNodes[0];
    svg.style.width = `${window.innerWidth}px`;
    svg.style.height = `${window.innerHeight}px`;

    // place the rect's center point and resize
    const line = svg.childNodes[0];
    // d 설정 관련 함수
    line.setAttribute('d', `M ${this._shapePoint.x} ${this._shapePoint.y} L ${endPixelPosition.x} ${endPixelPosition.y}`);
    line.setAttribute('stroke', `red`);
    line.setAttribute('stroke-width', `2`);
    line.setAttribute('fill', `none`);
};

Line.prototype.onRemove = function() {
    this._element.parentNode.removeChild(this._element);
};

export default Line;
