import * as d3 from 'd3';
import Line from './Line';

var Polygon = function(options) {
    Line.call(this, options);
};

Polygon.prototype = Object.create(Line.prototype);
Polygon.prototype.constructor = Polygon;

Polygon.prototype.setPath = function() {
    console.log('polygon입니다');
    const line = d3.line()
                .x(function(d) { return (d.x); })
                .y(function(d) { return (d.y); });

    const linePoint = line(this._lineData);
    // linePoint.concat('Z');
    this._path.attr('d', linePoint)
            .attr('stroke', 'red')
            .attr('stroke-width', 1);
};


export default Line;
