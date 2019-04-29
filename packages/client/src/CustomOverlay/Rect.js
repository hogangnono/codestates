import TwoClickShape from './TwoClickShape';

var Rect = function(options) {
    TwoClickShape.call(this, options);
};

Rect.prototype = Object.create(TwoClickShape.prototype);
Rect.prototype.constructor = Rect;

Rect.prototype.setPath = function(spare) {
    /* Set path */
    this._path.attr('d', `M ${spare} ${spare} L ${this._widthRatio - 1} ${spare} ${this._widthRatio - 1} ${this._heightRatio - 1} ${spare} ${this._heightRatio - 1} Z`)
      .attr('stroke', this._color).attr('stroke-width', '3').attr('stroke-opacity', 1);
    if (this._fill === 'fill') {
        this._path.attr('fill', this._color).attr('fill-opacity', 0.6);
    } else {
        this._path.attr('fill', 'none');
    }
};

export default Rect;
