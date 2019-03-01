/* eslint-disable linebreak-style */
import * as d3 from 'd3';

var CustomOverlay = function (options) {
    // make a div that contain shape
    const div = document.createElement('div');
    this._svg = d3.create('svg');
    this._ellipse = this._svg.append('ellipse').attr('fill', 'black').attr('fill-opacity', '0.4');
    div.appendChild(this._svg.node());
    this._element = div;

    // current map ratio
    this._zoom = options.naverMap.getZoom();
    this._map = options.naverMap;

    this.setPosition(options.position);
    this.setMap(options.map || null);
};

CustomOverlay.prototype = new window.naver.maps.OverlayView();

CustomOverlay.prototype.constructor = CustomOverlay;

CustomOverlay.prototype.setPosition = function (position) {
    this._startPos = position.startPos;
    this._endPos = position.endPos;
    this.draw();
};

CustomOverlay.prototype.getPosition = function () {
    return this._startPos.coord;
};

CustomOverlay.prototype.onAdd = function () {
    var overlayLayer = this.getPanes().overlayLayer;

    overlayLayer.appendChild(this._element);
};

CustomOverlay.prototype.draw = function () {
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

    // match the div size with user created
    const width = this._endPos.offset.x - this._startPos.offset.x;
    const height = this._endPos.offset.y - this._startPos.offset.y;
    this._element.style.width = `${width * (2 ** ratio)}px`;
    this._element.style.height = `${height * (2 ** ratio)}px`;
    // this._element.style.backgroundColor = 'orange';
    // this._element.style.opacity = '0.5';
    this._svg.attr('width', width * (2 ** ratio)).attr('height', height * (2 ** ratio));

    // // place the circle where user click and resize
    this._ellipse.attr('cx', (width * (2 ** ratio)) / 2).attr('cy', (height * (2 ** ratio)) / 2);
    this._ellipse.attr('rx', (width / 2) * (2 ** ratio));
    this._ellipse.attr('ry', (height / 2) * (2 ** ratio));

};

CustomOverlay.prototype.onRemove = function () {
    this._element.remove();
    this._element.off();
};

export default CustomOverlay;
