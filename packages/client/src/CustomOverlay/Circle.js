import TwoClickShape from './TwoClickShape';

var Circle = function(options) {
    TwoClickShape.call(this, options);
};

Circle.prototype = Object.create(TwoClickShape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.setPath = function() {
    /* Set path */
    this._path.attr('d', `M 2 ${this._heightRatio / 2 + 2} A ${this._widthRatio / 2 - 3} ${this._heightRatio / 2 - 3} 0 1 0 2 ${this._heightRatio / 2 + 1.9}`)
        .attr('stroke', this._color).attr('stroke-width', '3').attr('stroke-opacity', 1);
    if (this._fill === 'fill') {
        this._path.attr('fill', this._color).attr('fill-opacity', 0.6);
    } else {
        this._path.attr('fill', 'none');
    }
};
export default Circle;
