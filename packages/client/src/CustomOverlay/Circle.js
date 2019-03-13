import TwoClickShape from './TwoClickShape';

var Circle = function(options) {
    TwoClickShape.call(this, options);
};

Circle.prototype = Object.create(TwoClickShape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.setPath = function() {
    /* Set path */
    this._path
        .attr(
            'd',
            `M 1 ${this._heightRatio / 2 + 2} A ${this._widthRatio / 2 - 3} ${this._heightRatio
                / 2 - 3} 0 1 0 1 ${this._heightRatio / 2 + 1.9}`
        )
        .attr('stroke', 'black')
        .attr('stroke-width', '3')
        .attr('fill', 'black')
        .attr('opacity', 0.7);
};
export default Circle;
