// import * as d3 from 'd3';
import Shape from './Shape';

var Rect = function(options) {
    Shape.call(this, options);
};

Rect.prototype = Object.create(Shape.prototype);
Rect.prototype.constructor = Rect;

Rect.prototype.addShape = function() {
    this.svg.append('rect');
};

Rect.prototype.draw = function() {
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

    // place the rect's center point and resize
    const rect = svg.childNodes[0];
    rect.style.width = widthRatio;
    rect.style.height = heightRatio;
};
export default Rect;
