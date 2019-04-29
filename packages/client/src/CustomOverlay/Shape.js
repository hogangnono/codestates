import * as d3 from 'd3';
var Shape = function(options) {
    this._factorId = options.factorId;
    // 현재 지도의 축적 또는 저장될 당시의 축적
    this._zoom = options.zoom || options.naverMap.getZoom();
    this._map = options.naverMap;
    // div 또는 svg의 시작 위치를 저장
    this._startPos = {};
    // 선분의 꼭지점
    this._lineData = options.lineData;
    this._fill = options.fill;
    this._color = options.color;
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
    // 도형들이 짤리지 않게 만드는 여유공간
    const spare = 12;

    if (!this.getMap()) {
        return;
    }
    if (lineData) {
        this._lineData = lineData;
    }
    this.setShape(spare);

    const projection = this.getProjection();
    const position = this._startPos;
    const pixelPosition = projection.fromCoordToOffset(position);

    this._element.style.position = 'absolute';
    // div의 위치를 offset으로 변경해 붙임
    this._element.style.top = `${pixelPosition.y - spare}px`;
    this._element.style.left = `${pixelPosition.x - spare}px`;

    // 도형을 생성할때의 지도 비율과 현재 지도 비율을 비교해 비율을 계산
    this._ratio = this._map.getZoom() - this._zoom;
    this._widthRatio = this._width * 2 ** this._ratio;
    this._heightRatio = this._height * 2 ** this._ratio;

    // match the div and svg size
    this._element.style.width = `${this._widthRatio}px`;
    this._element.style.height = `${this._heightRatio}px`;

    /* Set svg */
    const svg = this._element.childNodes[0];
    svg.style.position = 'absolute';
    // svg를 원 크기에 맞게 생성
    svg.style.width = `${this._widthRatio}px`;
    svg.style.height = `${this._heightRatio}px`;
    this.setPath(spare);
};

Shape.prototype.setShape = function() {};

Shape.prototype.setPath = function() {};

Shape.prototype.onRemove = function() {
    this._element.parentNode.removeChild(this._element);
};

export default Shape;
