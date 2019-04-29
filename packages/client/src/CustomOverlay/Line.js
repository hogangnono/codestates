import * as d3 from 'd3';
import Shape from './Shape';

var Line = function(options) {
    Shape.call(this, options);
    this._heightDiff = 0;
    this._widthDiff = 0;
    this._newlineData = [];
};

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.setShape = function(spare) {
    const decideMinMax = (temp) => {
        const min = this._min;
        const max = this._max;
        // 왼쪽으로 이동시
        if (min.coord.x > temp.coord.x) {
            min.coord.x = temp.coord.x;
            min.offset.x = temp.offset.x;
            this._widthDiff = Math.abs(this._lineData[0].offset.x - min.offset.x);
        }
        // 아래로 이동시
        if (min.coord.y > temp.coord.y) {
            min.coord.y = temp.coord.y;
            min.offset.y = temp.offset.y;
        }
        // 오른쪽으로 이동시
        if (max.coord.x < temp.coord.x) {
            max.coord.x = temp.coord.x;
            max.offset.x = temp.offset.x;
        }
        // 위로 이동시
        if (max.coord.y < temp.coord.y) {
            max.coord.y = temp.coord.y;
            max.offset.y = temp.offset.y;
            this._heightDiff = Math.abs(this._lineData[0].offset.y - this._max.offset.y);
        }
    };
    if (!this._min || !this._max) {
        // deep copy
        this._min = JSON.parse(JSON.stringify(this._lineData[0]));
        this._max = JSON.parse(JSON.stringify(this._lineData[0]));
        this._lineData.map((data) => {
            decideMinMax(data);
        });
    } else {
        decideMinMax(this._lineData[this._lineData.length - 1]);
    }
    this._width = Math.abs(this._max.offset.x - this._min.offset.x) + spare + 2;
    this._height = Math.abs(this._max.offset.y - this._min.offset.y) + spare + 2;
    // 새로운 시작점을 정해줌 (lineData[0] 찍은 위치, lineData[1]는 현재 마우스 위치)
    this._startPos.x = this._min.coord.x;
    this._startPos.y = this._max.coord.y;
};

Line.prototype.setPath = function(spare) {
    const projection = this.getProjection();
    const firstPoint = projection.fromCoordToOffset(this._lineData[0].coord);
    const newlineData = [];

    for (let i = 0; i < this._lineData.length; i++) {
        const obj = {};
        obj.x = projection.fromCoordToOffset(this._lineData[i].coord).x - firstPoint.x + this._widthDiff * 2 ** this._ratio + spare * 2 ** this._ratio;
        obj.y = projection.fromCoordToOffset(this._lineData[i].coord).y - firstPoint.y + this._heightDiff * 2 ** this._ratio + spare * 2 ** this._ratio;
        newlineData.push(obj);
    }
    const line = d3.line()
                .x(function(d) { return (d.x); })
                .y(function(d) { return (d.y); });
    this.addAttribute(line, newlineData);
};

Line.prototype.addAttribute = function(line, newlineData) {
    this._path.attr('d', line(newlineData))
            .attr('stroke', this._color)
            .attr('stroke-width', 3)
            .attr('fill', 'none');
};

export default Line;
