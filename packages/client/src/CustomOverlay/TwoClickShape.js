import Shape from './Shape';

var TwoClickShape = function(options) {
    Shape.call(this, options);
};

TwoClickShape.prototype = Object.create(Shape.prototype);
TwoClickShape.prototype.constructor = TwoClickShape;

TwoClickShape.prototype.setShape = function() {
    this._width = Math.abs(this._lineData[1].offset.x - this._lineData[0].offset.x) + 1;
    this._height = Math.abs(this._lineData[1].offset.y - this._lineData[0].offset.y) + 1;
    // 새로운 시작점을 정해줌 (lineData[0] 찍은 위치, lineData[1]는 현재 마우스 위치)
    this._startPos.x = Math.min(this._lineData[0].coord.x, this._lineData[1].coord.x);
    this._startPos.y = Math.max(this._lineData[0].coord.y, this._lineData[1].coord.y);
};

TwoClickShape.prototype.setSvg = function(widthRatio, heightRatio) {
    /* Set svg */
    const svg = this._element.childNodes[0];
    svg.style.position = 'absolute';
    // svg를 원 크기에 맞게 생성
    svg.style.width = `${widthRatio}px`;
    svg.style.height = `${heightRatio}px`;
};

TwoClickShape.prototype.setPath = function() {
};

export default TwoClickShape;
