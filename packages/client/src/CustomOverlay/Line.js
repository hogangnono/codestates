import * as d3 from 'd3';
import Shape from './Shape';

var Line = function(options) {
    Shape.call(this, options);
};

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;


Line.prototype.setSvg = function() {
    const svg = this._element.childNodes[0];
    // svg도 윈도우 크기에 맞게 생성
    svg.style.width = `${window.innerWidth}px`;
    svg.style.height = `${window.innerHeight}px`;
};

Line.prototype.setPath = function() {
    const line = d3.line()
                .x(function(d) { return (d.x); })
                .y(function(d) { return (d.y); });

    this._path.attr('d', line(this._lineData))
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'none');
};

export default Line;
