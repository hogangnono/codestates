/* eslint-disable linebreak-style */
import * as d3 from 'd3';

var CustomOverlay = function (options) {
    // make a div that contain shape
    const div = document.createElement('div');
    this._svg = d3.create('svg').attr('width', window.innerWidth).attr('height', window.innerHeight);
    this._circle = this._svg.append('circle').attr('stroke', 'green').attr('fill', 'green').attr('fill-opacity', '0.4');
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
    this._position = position;
    this.draw();
};

CustomOverlay.prototype.getPosition = function () {
    return this._position;
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

    const ratio = this._map.getZoom() - this._zoom;
    // place the circle where user click and resize
    this._circle.attr('cx', pixelPosition.x).attr('cy', pixelPosition.y);
    this._circle.attr('r', 50 * (2 ** ratio));
};

CustomOverlay.prototype.onRemove = function () {
    this._element.remove();
    this._element.off();
};

export default CustomOverlay;
