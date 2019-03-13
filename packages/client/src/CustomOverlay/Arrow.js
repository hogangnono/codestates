import * as d3 from 'd3';
import Line from './Line';

var Arrow = function(options) {
    Line.call(this, options);
};

Arrow.prototype = Object.create(Line.prototype);
Arrow.prototype.constructor = Arrow;

Arrow.prototype.addShape = function() {
    this.svg.append('svg:defs').append('svg:marker')
    .attr('id', 'triangle')
    .attr('refX', 6)
    .attr('refY', 6)
    .attr('markerWidth', 30)
    .attr('markerHeight', 30)
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0 0 12 6 0 12 3 6')
    .style('fill', 'black')
    .style('stroke', 'none');
    this._path = this.svg.append('path');
};
Arrow.prototype.setPath = function() {
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

    this._path.attr('d', line(this._newlineData))
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
        .attr('marker-end', 'url(#triangle)');
};

export default Arrow;
