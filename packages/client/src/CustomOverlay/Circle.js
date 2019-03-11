import TwoClickShape from './TwoClickShape';

var Circle = function(options) {
    TwoClickShape.call(this, options);
};

Circle.prototype = Object.create(TwoClickShape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.setPath = function() {
    /* Set path */
    this._path.attr('d', `M 1 ${this._height / 2 + 2} A ${this._width / 2} ${this._height / 2} 0 1 0 1 ${this._height / 2 + 1.9}`)
      .attr('stroke', 'black').attr('stroke-width', '3').attr('fill', 'none');
};

Circle.prototype.draw = function() {
    if (!this.getMap()) {
        return;
    }
    const projection = this.getProjection();
    const position = this.getPosition();
    const pixelPosition = projection.fromCoordToOffset(position);
    this._element.style.position = 'absolute';

    // console.log('pixel: ', pixelPosition)
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

    // place the ellipse's center point and resize
    const ellipse = svg.childNodes[0];
    ellipse.style.cx = widthRatio / 2;
    ellipse.style.cy = heightRatio / 2;
    ellipse.style.rx = (width / 2) * 2 ** ratio;
    ellipse.style.ry = (height / 2) * 2 ** ratio;
};
export default Circle;
