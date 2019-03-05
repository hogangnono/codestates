/* eslint-disable linebreak-style */
import * as d3 from 'd3';

var CustomArrow = function(options) {
    // make a div that contain shape
    const div = document.createElement('div');
    this._svg = d3.create('svg');
    this._arrow = this._svg
        .append('rect')
        .attr('fill', 'black')
        .attr('fill-opacity', '0.4')
        .attr('stroke-width', 5)
        .attr('stroke', 'black');
    div.appendChild(this._svg.node());
    this._element = div;
    // var arrow =  Snap(256,256).path("M-1 0 L0 -2 L1 0 z")
    //           .attr({fill:'#FFF', stroke:'none'});

    // current map ratio
    this._zoom = options.naverMap.getZoom();
    this._map = options.naverMap;
    this._mapZoom = options.zoom;
    this._zoomOrMapZoom = this._mapZoom === '' ? this._zoom : this._mapZoom;
    this.setPosition(options.position);
    this.setMap(options.map || null);
};

CustomArrow.prototype = new window.naver.maps.OverlayView();

CustomArrow.prototype.constructor = CustomArrow;

CustomArrow.prototype.setPosition = function(position) {
    this._startPos = position.startPos;
    this._endPos = position.endPos;
    this.draw();
};

CustomArrow.prototype.getPosition = function() {
    const start = {};
    start.x = Math.min(this._startPos.coord.x, this._endPos.coord.x);
    start.y = Math.max(this._startPos.coord.y, this._endPos.coord.y);
    return start;
};

CustomArrow.prototype.onAdd = function() {
    var overlayLayer = this.getPanes().overlayLayer;

    overlayLayer.appendChild(this._element);
};

CustomArrow.prototype.draw = function() {
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
    const ratio = this._map.getZoom() - this._zoomOrMapZoom;
    // console.log(ratio);

    // calculate the div width and height (Subtraction of two coordinates) with zoom ratio

    const width = Math.abs(this._endPos.offset.x - this._startPos.offset.x);
    const height = Math.abs(this._endPos.offset.y - this._startPos.offset.y);
    const widthRatio = width * 2 ** ratio;
    const heightRatio = height * 2 ** ratio;

    // match the div and svg size
    this._element.style.width = `${widthRatio}px`;
    this._element.style.height = `${heightRatio}px`;
    // this._element.style.backgroundColor = 'orange';
    this._svg.attr('width', widthRatio).attr('height', heightRatio);

    // place the ellipse's center point and resize
    this._arrow.attr('width', widthRatio).attr('height', heightRatio);
};

CustomArrow.prototype.onRemove = function() {
    this._element.remove();
    this._element.off();
};

export default CustomArrow;
