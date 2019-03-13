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

Line.prototype.setShape = function() {

    if (!this._min || !this._max) {
        this._min = { coord: {}, offset: {} };
        this._max = { coord: {}, offset: {} };
        this._min.coord.x = this._lineData[0].coord.x;
        this._min.coord.y = this._lineData[0].coord.y;
        this._min.offset.x = this._lineData[0].offset.x;
        this._min.offset.y = this._lineData[0].offset.y;

        this._max.coord.x = this._lineData[0].coord.x;
        this._max.coord.y = this._lineData[0].coord.y;
        this._max.offset.x = this._lineData[0].offset.x;
        this._max.offset.y = this._lineData[0].offset.y;
    } else {
        if (this._min.coord.x > this._lineData[this._lineData.length - 1].coord.x) {
            console.log('1');
            this._min.coord.x = this._lineData[this._lineData.length - 1].coord.x;
            this._min.offset.x = this._lineData[this._lineData.length - 1].offset.x;
            this._widthDiff = Math.abs(this._lineData[0].offset.x - this._min.offset.x);

        }
        if (this._min.coord.y > this._lineData[this._lineData.length - 1].coord.y) {
            console.log('2');

            this._min.coord.y = this._lineData[this._lineData.length - 1].coord.y;
            this._min.offset.y = this._lineData[this._lineData.length - 1].offset.y;
        }
        if (this._max.coord.x < this._lineData[this._lineData.length - 1].coord.x) {
            console.log('3');
            this._max.coord.x = this._lineData[this._lineData.length - 1].coord.x;
            this._max.offset.x = this._lineData[this._lineData.length - 1].offset.x;
        }
        // 위로 올라갈 경우
        if (this._max.coord.y < this._lineData[this._lineData.length - 1].coord.y) {
            console.log('4');
            this._max.coord.y = this._lineData[this._lineData.length - 1].coord.y;
            this._max.offset.y = this._lineData[this._lineData.length - 1].offset.y;
            this._heightDiff = Math.abs(this._lineData[0].offset.y - this._max.offset.y);
        }
    }
    this._width = Math.abs(this._max.offset.x - this._min.offset.x) + 1;
    this._height = Math.abs(this._max.offset.y - this._min.offset.y) + 1;
    // 새로운 시작점을 정해줌 (lineData[0] 찍은 위치, lineData[1]는 현재 마우스 위치)
    this._startPos.x = this._min.coord.x;
    this._startPos.y = this._max.coord.y;
};

Line.prototype.setSvg = function() {
    /* Set svg */
    const svg = this._element.childNodes[0];
    svg.style.position = 'absolute';
    // svg를 원 크기에 맞게 생성
    svg.style.width = `${this._widthRatio}px`;
    svg.style.height = `${this._heightRatio}px`;
};


Line.prototype.setPath = function() {

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
            .attr('fill', 'none');
};

export default Line;
