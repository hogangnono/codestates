import * as d3 from 'd3'

var CustomOverlay = function (options) {

    this._element = d3.select('#map')
        .append('svg')
        .attr('width', window.innerWidth)
        .attr('height', window.innerHeight);

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

    overlayLayer.appendChild(this._element.node());
    // this._element.appendTo(overlayLayer);
};

CustomOverlay.prototype.draw = function () {
    if (!this.getMap()) {
        return;
    }

    var projection = this.getProjection(),
        position = this.getPosition(),
        pixelPosition = projection.fromCoordToOffset(position);

    this._element.style.position = "absolute";

    var line = this._element.append("circle")
        .attr("cx", pixelPosition.x)
        .attr("cy", pixelPosition.y)
        .attr("r", 50);
};

CustomOverlay.prototype.onRemove = function () {
    var overlayLayer = this.getPanes().overlayLayer;

    this._element.remove();
    this._element.off();
};

export default CustomOverlay;



