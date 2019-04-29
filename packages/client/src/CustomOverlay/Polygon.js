import Line from './Line';

var Polygon = function(options) {
    Line.call(this, options);
};

Polygon.prototype = Object.create(Line.prototype);
Polygon.prototype.constructor = Polygon;

Polygon.prototype.addAttribute = function(line, newlineData) {
    this._path.attr('d', `${line(newlineData)} Z`)
            .attr('stroke', this._color)
            .attr('stroke-width', 3)
            .attr('fill', this._color)
            .attr('stroke-opacity', 1);

    if (this._fill === 'fill') {
        this._path.attr('fill', this._color).attr('fill-opacity', 0.6);
    } else {
        this._path.attr('fill', 'none');
    }
};

export default Polygon;
