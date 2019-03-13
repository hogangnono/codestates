import * as d3 from 'd3';
var Shape = function(options) {
    this._centerPoint = options.centerPoint;
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

    const projection = this.getProjection();
    const position = this._startPos;
    const pixelPosition = projection.fromCoordToOffset(position);

    this._element.style.position = 'absolute';
    // place thd div where user click
    this._element.style.top = `${pixelPosition.y}px`;
    this._element.style.left = `${pixelPosition.x}px`;
    // set the ratio
    const ratio = this._map.getZoom() - this._zoom;

    // calculate the div width and height(Subtraction of two coordinates) with zoom ratio
    this._widthRatio = this._width * 2 ** ratio;
    this._heightRatio = this._height * 2 ** ratio;

    // match the div and svg size
    this._element.style.width = `${this._widthRatio}px`;
    this._element.style.height = `${this._heightRatio}px`;

    this.setSvg();
    this.setPath();
};

Shape.prototype.setShape = function() {};

Shape.prototype.setSvg = function() {};

Shape.prototype.setPath = function() {};

Shape.prototype.onRemove = function() {
    this._element.parentNode.removeChild(this._element);
};

export default Shape;
