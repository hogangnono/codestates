import * as d3 from 'd3';
import Line from './Line';

var Polygon = function(options) {
    Line.call(this, options);
};

Polygon.prototype = Object.create(Line.prototype);
Polygon.prototype.constructor = Polygon;

Polygon.prototype.setPath = function() {

    const projection = this.getProjection();
    const s = projection.fromCoordToOffset(this._lineData[0].coord);
    console.log(this._heightDiff);
    for (let i = 0; i < this._lineData.length; i++) {
        const obj = {};
        obj.x = projection.fromCoordToOffset(this._lineData[i].coord).x - s.x + this._widthDiff * 2 ** this._ratio;
        obj.y = projection.fromCoordToOffset(this._lineData[i].coord).y - s.y + this._heightDiff * 2 ** this._ratio;
        this._newlineData[i] = obj;
    }
    const line = d3.line()
                .x(function(d) { return (d.x); })
                .y(function(d) { return (d.y); });
    const linePoint = line(this._newlineData);

    this._path.attr('d', `${linePoint} Z`)
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'none');
};


export default Polygon;
