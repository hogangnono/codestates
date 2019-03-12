import Shape from './Shape';

var TwoClickShape = function(options) {
    Shape.call(this, options);
};

TwoClickShape.prototype = Object.create(Shape.prototype);
TwoClickShape.prototype.constructor = TwoClickShape;

TwoClickShape.prototype.setShape = function() {
    this._width = Math.abs(this._lineData[1].x - this._lineData[0].x) + 1;
    this._height = Math.abs(this._lineData[1].y - this._lineData[0].y) + 1;
    // 새로운 시작점을 정해줌 (lineData[0] 찍은 위치, lineData[1]는 현재 마우스 위치)
    this._startPos.x = Math.min(this._lineData[0].x, this._lineData[1].x);
    this._startPos.y = Math.min(this._lineData[0].y, this._lineData[1].y);
};

TwoClickShape.prototype.setSvg = function() {
    /* Set svg */
    const svg = this._element.childNodes[0];
    svg.style.position = 'absolute';
    // svg를 원 크기에 맞게 생성
    svg.style.top = `${this._startPos.y}px`;
    svg.style.left = `${this._startPos.x}px`;
    svg.style.width = `${this._width + 3}px`;
    svg.style.height = `${this._height + 3}px`;

};

TwoClickShape.prototype.setPath = function() {
};

export default TwoClickShape;
