import * as d3 from 'd3';
import Line from './Line';

var Polygon = function(options) {
    Line.call(this, options);
};

Polygon.prototype = Object.create(Line.prototype);
Polygon.prototype.constructor = Polygon;

Polygon.prototype.setPath = function() {
    const line = d3.line()
                .x(function(d) { return (d.x); })
                .y(function(d) { return (d.y); });

    const linePoint = line(this._lineData);
    this._path.attr('d', `${linePoint} Z`)
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'none');
};


export default Polygon;
