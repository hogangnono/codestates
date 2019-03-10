import * as d3 from 'd3';
var Line = function(options) {
    // current map ratio
    this._zoom = options.zoom || options.naverMap.getZoom();
    this._map = options.naverMap;
    this._lineData = options.lineData;
    this.setPosition(options.position);
    this.setMap(options.map || null);
};

Line.prototype = new window.naver.maps.OverlayView();
Line.prototype.constructor = Line;

Line.prototype.setPosition = function(position) {
    this._startPos = position.startPos;
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
    this._path = this.svg.append('path');
};


Line.prototype.draw = function(lineData) {
    if (!this.getMap()) {
        return;
    }

    if (lineData) {
        this._lineData = lineData;
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

    const line = d3.line()
                .x(function(d) { return (d.x); })
                .y(function(d) { return (d.y); });

    this._path.attr('d', line(this._lineData))
            .attr('stroke', 'black')
            .attr('stroke-width', 5)
            .attr('fill', 'none');
};

Line.prototype.onRemove = function() {
    this._element.parentNode.removeChild(this._element);
};

export default Line;
