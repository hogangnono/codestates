/* eslint-disable linebreak-style */
import * as d3 from 'd3';

var CustomOverlay = function (options) {
    // make a div that contain shape
    this._zoom = options.mm.getZoom();
    this._map = options.mm;
    const div = document.createElement('div');
    const svg = d3.create('svg');
    this._circle = svg.append('circle').attr('cx', 50).attr('cy', 50).attr('stroke', 'green').attr('fill', 'green').attr('fill-opacity', '0.4');
    div.appendChild(svg.node());
    this._element = div;
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
    this._element.style.left = `${pixelPosition.x}px`;
    this._element.style.top = `${pixelPosition.y}px`;
    // console.log(this._zoom);
    const ratio = this._map.getZoom() - this._zoom;
    this._circle.attr('r', 50 * Math.pow(2, ratio));
};

CustomOverlay.prototype.onRemove = function () {
    this._element.remove();
    this._element.off();
};

export default CustomOverlay;
