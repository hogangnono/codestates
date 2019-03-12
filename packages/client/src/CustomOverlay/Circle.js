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
            `M 1 ${this._height / 2 + 2} A ${this._width / 2} ${this._height
                / 2} 0 1 0 1 ${this._height / 2 + 1.9}`
        )
        .attr('stroke', 'black')
        .attr('stroke-width', '3')
        .attr('fill', 'none');
};
export default Circle;
