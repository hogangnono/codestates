import * as d3 from 'd3';

var Shape = function(options) {
    // current map ratio
    this._zoom = options.zoom || options.naverMap.getZoom();
    this._map = options.naverMap;
    this.setPosition(options.position);
    this.setMap(options.map || null);
};

Shape.prototype = new window.naver.maps.OverlayView();
Shape.prototype.constructor = Shape;

Shape.prototype.setPosition = function(position) {
    this._startPos = position.startPos;
    this._endPos = position.endPos;
    this.draw();
};

Shape.prototype.getPosition = function() {
    const start = {};
    start.x = Math.min(this._startPos.coord.x, this._endPos.coord.x);
    start.y = Math.max(this._startPos.coord.y, this._endPos.coord.y);
    return start;
};

Shape.prototype.onAdd = function() {
    // make a div that contain shape and whole info
    const div = document.createElement('div');
    // make a input that contaion description of shape
    var input = document.createElement('div');
    input.innerHTML = '<input type="text" placeholder="호재를 입력해주세요"></input>';
    input.addEventListener('click', e => {
        e.target.focus();
    });
    // make deletebutton
    const deleteButton = document.createElement('div');
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', e => {
        this.onRemove();
    });

    // make svg that contain shape
    this.svg = d3.create('svg');
    this.addShape();
    div.appendChild(this.svg.node());
    div.appendChild(deleteButton);
    div.appendChild(input);
    this._element = div;
    const overlayLayer = this.getPanes().overlayLayer;
    overlayLayer.appendChild(this._element);
};

Shape.prototype.addShape = function() {
};


Shape.prototype.draw = function() {
    if (!this.getMap()) {
        return;
    }
    const projection = this.getProjection();
    const position = this.getPosition();
    const pixelPosition = projection.fromCoordToOffset(position);
    this._element.style.position = 'absolute';

    // place thd div where user click
    this._element.style.top = `${pixelPosition.y}px`;
    this._element.style.left = `${pixelPosition.x}px`;

    // set the ratio
    const ratio = this._map.getZoom() - this._zoom;

    // calculate the div width and height(Subtraction of two coordinates) with zoom ratio
    const width = Math.abs(this._endPos.offset.x - this._startPos.offset.x);
    const height = Math.abs(this._endPos.offset.y - this._startPos.offset.y);
    const widthRatio = width * 2 ** ratio;
    const heightRatio = height * 2 ** ratio;

    // match the div and svg size
    this._element.style.width = `${widthRatio}px`;
    this._element.style.height = `${heightRatio}px`;

    const svg = this._element.childNodes[0];
    svg.style.width = `${widthRatio}px`;
    svg.style.height = `${heightRatio}px`;

};

Shape.prototype.onRemove = function() {
    this._element.parentNode.removeChild(this._element);
};

export default Shape;
