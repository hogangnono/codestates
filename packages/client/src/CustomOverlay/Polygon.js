import Line from './Line';

var Polygon = function(options) {
    Line.call(this, options);
};

Polygon.prototype = Object.create(Line.prototype);
Polygon.prototype.constructor = Polygon;

Polygon.prototype.addAttribute = function(line, newlineData) {
    this._path.attr('d', `${line(newlineData)} Z`)
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('fill', 'black')
            .attr('opacity', 0.7);
};

export default Polygon;
