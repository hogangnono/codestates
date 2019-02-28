import * as d3 from 'd3'

var CustomOverlay = function (options) {
    //make a div that contain shape
    let div = document.createElement("div")
    let svg = d3.create('svg')
    svg.append('circle').attr('cx', 50).attr('cy', 50).attr("r", 50).attr("stroke", "green").attr("fill", "green").attr("fill-opacity", "0.4")
    div.appendChild(svg.node())

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
    var projection = this.getProjection(),
        position = this.getPosition(),
        pixelPosition = projection.fromCoordToOffset(position);
    console.log(pixelPosition)
    this._element.style.position = "absolute";

    this._element.style.left = `${pixelPosition.x}px`;
    this._element.style.top = `${pixelPosition.y}px`;
    // this._element.style.width = '100px';
    // this._element.style.height = '100px';

};

CustomOverlay.prototype.onRemove = function () {
    var overlayLayer = this.getPanes().overlayLayer;

    this._element.remove();
    this._element.off();
};

export default CustomOverlay;



