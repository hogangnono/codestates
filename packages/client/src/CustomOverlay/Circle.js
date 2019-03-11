import * as d3 from 'd3';
var Circle = function(options) {
    console.log('들어온 정보는 이거: ', options);
    // current map ratio
    this._zoom = options.zoom || options.naverMap.getZoom();
    this._map = options.naverMap;
    this._shapePoint = options.shapePoint;
    this.setPosition(options.position);
    this.setMap(options.map || null);
};

Circle.prototype = new window.naver.maps.OverlayView();
Circle.prototype.constructor = Circle;

Circle.prototype.setPosition = function(position) {
    this._startPos = position.startPos;
    this.draw();
};

Circle.prototype.getPosition = function() {
    const start = {};
    start.x = this._startPos.coord.x;
    start.y = this._startPos.coord.y;
    return start;
};

Circle.prototype.onAdd = function() {
    // make a div that contain Circle and whole info
    const div = document.createElement('div');

    // make svg that contain Circle
    this.svg = d3.create('svg');
    this.addShape();
    div.appendChild(this.svg.node());
    this._element = div;
    const overlayLayer = this.getPanes().overlayLayer;
    overlayLayer.appendChild(this._element);
};

Circle.prototype.addShape = function() {
    this._path = this.svg.append('path');
};


Circle.prototype.draw = function(tempPoint) {
    if (!this.getMap()) {
        return;
    }

    if (tempPoint) {
        this._width = Math.abs((tempPoint.x - this._shapePoint.x) / 2);
        this._height = Math.abs(tempPoint.y - this._shapePoint.y);
        // this._shapePoint.x = Math.min(this._shapePoint.x, tempPoint.x);
        // this._shapePoint.y = Math.min(this._shapePoint.y, tempPoint.y);

    } else {
        this._width = 1;
        this._height = 1;
    }
    this._element.className = 'aaaaaa';
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
    // svg도 윈도우 크기에 맞게 생성
    const svg = this._element.childNodes[0];
    svg.style.width = `${window.innerWidth}px`;
    svg.style.height = `${window.innerHeight}px`;

    this._path.attr('d', `M ${this._shapePoint.x} ${this._shapePoint.y} A ${this._width} ${this._height} 0 1 0 ${this._shapePoint.x} ${this._shapePoint.y - 1}`);
};

Circle.prototype.onRemove = function() {
    this._element.parentNode.removeChild(this._element);
};

export default Circle;
