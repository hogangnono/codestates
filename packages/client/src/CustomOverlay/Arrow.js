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
    .attr('d', 'M 12 0 0 6 12 12 9 6')
    .style('fill', this._color)
    .style('stroke', 'none');
    this._path = this.svg.append('path');
};

Arrow.prototype.addAttribute = function(line, newlineData) {
    this._path.attr('d', line(newlineData))
            .attr('stroke', this._color)
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('marker-start', 'url(#triangle)');
};

export default Arrow;
