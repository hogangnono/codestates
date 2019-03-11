import * as d3 from 'd3';
var Circle = function(options) {
    // 현재 맵의 축적 또는 저장될 당시의 축적
    this._zoom = options.zoom || options.naverMap.getZoom();
    this._map = options.naverMap;
    // 원의 시작점과 끝점
    this._lineData = options.lineData;
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

    // 원을 가지는 svg를 가지고 div안에 넣음
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

Circle.prototype.draw = function(lineData) {
    if (!this.getMap()) {
        return;
    }
    if (lineData) {
        this._lineData = lineData;
    }
    // 새로운 시작점을 정해줌 (lineData[0] 찍은 위치, lineData[1]는 현재 마우스 위치)
    this._width = Math.abs(this._lineData[1].x - this._lineData[0].x) + 1;
    this._height = Math.abs(this._lineData[1].y - this._lineData[0].y) + 1;
    this._startPos.x = Math.min(this._lineData[0].x, this._lineData[1].x);
    this._startPos.y = Math.min(this._lineData[0].y, this._lineData[1].y);
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

    /* Set svg */
    const svg = this._element.childNodes[0];
    svg.style.position = 'absolute';
    // svg를 원 크기에 맞게 생성
    svg.style.top = `${this._startPos.y}px`;
    svg.style.left = `${this._startPos.x}px`;
    svg.style.width = `${this._width + 3}px`;
    svg.style.height = `${this._height + 3}px`;

    /* Set path */
    this._path.attr('d', `M 1 ${this._height / 2 + 2} A ${this._width / 2} ${this._height / 2} 0 1 0 1 ${this._height / 2 + 1.9}`)
    .attr('stroke', 'black').attr('stroke-width', '3').attr('fill', 'none');
};

Circle.prototype.onRemove = function() {
    this._element.parentNode.removeChild(this._element);
};

export default Circle;
