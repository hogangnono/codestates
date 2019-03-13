import Shape from './Shape';

var TwoClickShape = function(options) {
    Shape.call(this, options);
};

TwoClickShape.prototype = Object.create(Shape.prototype);
TwoClickShape.prototype.constructor = TwoClickShape;

TwoClickShape.prototype.setShape = function() {
    // 새로운 시작점을 정해줌 (lineData[0] 찍은 위치, lineData[1]는 현재 마우스 위치)
    this._startPos.x = Math.min(this._lineData[0].coord.x, this._lineData[1].coord.x);
    this._startPos.y = Math.max(this._lineData[0].coord.y, this._lineData[1].coord.y);
    // 새로운 너비와 높이를 정해줌
    this._width = Math.abs(this._lineData[1].offset.x - this._lineData[0].offset.x) + 1;
    this._height = Math.abs(this._lineData[1].offset.y - this._lineData[0].offset.y) + 1;

};

TwoClickShape.prototype.setPath = function() {
};

export default TwoClickShape;
