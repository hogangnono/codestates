import * as d3 from 'd3';
var Shape = function(options) {
    // 현재 맵의 축적 또는 저장될 당시의 축적
    this._zoom = options.zoom || options.naverMap.getZoom();
    this._map = options.naverMap;
    this._startPos = {};
    // 선분의 꼭지점
    this._lineData = options.lineData;
    this.draw();
    this.setMap(options.map || null);
};

Shape.prototype = new window.naver.maps.OverlayView();
Shape.prototype.constructor = Shape;

Shape.prototype.onAdd = function() {
    // make a div that contain Shape and whole info
    const div = document.createElement('div');

    // make svg that contain Shape
    this.svg = d3.create('svg');
    this.addShape();
    div.appendChild(this.svg.node());
    this._element = div;
    const overlayLayer = this.getPanes().overlayLayer;
    overlayLayer.appendChild(this._element);
};

Shape.prototype.addShape = function() {
    this._path = this.svg.append('path');
};


Shape.prototype.draw = function(lineData) {
    if (!this.getMap()) {
        return;
    }
    if (lineData) {
        this._lineData = lineData;
    }

    this.setShape();

    /* Set div */
    this._element.style.position = 'absolute';
    // 지도를 이동했을때 새로운 영역의 왼쪽 상단의 좌표를 확인
    const bound = this.map.getBounds();
    const boundCoord = {};
    // lan, lng값을 가짐
    boundCoord.x = bound._min.x;
    boundCoord.y = bound._max.y;
    // coord 값을 offset 값으로 변경
    const projection = this.map.getProjection();
    const boundOffset = projection.fromCoordToOffset(boundCoord);
    // 새로운 영역 위치에 div를 생성
    this._element.style.top = `${boundOffset.y}px`;
    this._element.style.left = `${boundOffset.x}px`;
    this._element.style.width = `${window.innerWidth}px`;
    this._element.style.height = `${window.innerHeight}px`;

    this.setSvg();
    this.setPath();
};

Shape.prototype.setShape = function() {
};

Shape.prototype.setSvg = function() {
};

Shape.prototype.setPath = function() {
};

Shape.prototype.onRemove = function() {
    this._element.parentNode.removeChild(this._element);
};

export default Shape;
