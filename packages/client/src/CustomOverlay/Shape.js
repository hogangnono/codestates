import * as d3 from 'd3';
import '../less/Infobox.less';

var Shape = function (options) {
    this._centerPoint = options.centerPoint;
    // 현재 맵의 축적 또는 저장될 당시의 축적
    this._zoom = options.zoom || options.naverMap.getZoom();
    this._map = options.naverMap;
    this._startPos = {};
    // 선분의 꼭지점
    this._lineData = options.lineData;
    this.draw();
    this.setMap(options.map || null);
};

Shape.prototype = new window.naver.maps.OverlayView();
Shape.prototype.constructor = Shape;

Shape.prototype.onAdd = function () {
    // make a div that contain Shape and whole info
    const div = document.createElement('div');

    // make filter show in infobox
    const filterToInfobox = document.createElement('p');
    filterToInfobox.className = 'selection';

    // make dropdown
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const container = document.createElement('div');
    container.setAttribute('id', 'myDropdown');
    container.classList.add('dropdown-content');

    // make filterButton
    const filterButton = document.createElement('i');
    filterButton.className = 'fas fa-hashtag filterButton dropdown filterToggle';


    // filterButton.appendChild(container);
    // container.appendChild(selection1);
    // container.appendChild(selection2);
    // container.appendChild(selection3);

    filterButton.onclick = function (event) {
        console.log('You want to filter? ', event);
        container.classList.toggle('show');
        filterButton.classList.toggle('filterToggle');
    };

    // make dropdown - selections in dropdown
    const selection1 = document.createElement('p');
    const textSelection1 = document.createTextNode('# 상권');
    selection1.appendChild(textSelection1);
    selection1.onclick = function () {
        container.classList.toggle('show');
        const filter = selection1.innerHTML;
        filterToInfobox.innerHTML = filter;
        filterButton.classList.toggle('filterToggle');
    };
    selection1.className = 'show';

    const selection2 = document.createElement('p');
    const textSelection2 = document.createTextNode('# 신축/재개발');
    selection2.appendChild(textSelection2);
    selection2.onclick = function () {
        container.classList.toggle('show');
        const filter = selection2.innerHTML;
        filterToInfobox.innerHTML = filter;
        filterButton.classList.toggle('filterToggle');

    };
    selection2.className = 'show';

    const selection3 = document.createElement('p');
    const textSelection3 = document.createTextNode('# 교육');
    selection3.appendChild(textSelection3);
    selection3.onclick = function () {
        container.classList.toggle('show');
        const filter = selection3.innerHTML;
        filterToInfobox.innerHTML = filter;
        filterButton.classList.toggle('filterToggle');
    };
    selection3.className = 'show';

    const selection4 = document.createElement('p');
    const textSelection4 = document.createTextNode('# 업무지구');
    selection4.appendChild(textSelection4);
    selection4.onclick = function () {
        container.classList.toggle('show');
        const filter = selection4.innerHTML;
        filterToInfobox.innerHTML = filter;
        filterButton.classList.toggle('filterToggle');
    };
    selection4.className = 'show';

    const selection5 = document.createElement('p');
    const textSelection5 = document.createTextNode('# 주택단지');
    selection5.appendChild(textSelection5);
    selection5.onclick = function () {
        container.classList.toggle('show');
        const filter = selection5.innerHTML;
        filterToInfobox.innerHTML = filter;
        filterButton.classList.toggle('filterToggle');
    };
    selection5.className = 'show';

    const selection6 = document.createElement('p');
    const textSelection6 = document.createTextNode('# 도로개통/확장');
    selection6.appendChild(textSelection6);
    selection6.onclick = function () {
        container.classList.toggle('show');
        const filter = selection6.innerHTML;
        filterToInfobox.innerHTML = filter;
        filterButton.classList.toggle('filterToggle');
    };
    selection6.className = 'show';

    const selection7 = document.createElement('p');
    const textSelection7 = document.createTextNode('# 지하철개통');
    selection7.appendChild(textSelection7);
    selection7.onclick = function () {
        container.classList.toggle('show');
        const filter = selection7.innerHTML;
        filterToInfobox.innerHTML = filter;
        filterButton.classList.toggle('filterToggle');
    };
    selection7.className = 'show';

    const selection8 = document.createElement('p');
    const textSelection8 = document.createTextNode('# 기타');
    selection8.appendChild(textSelection8);
    selection8.onclick = function () {
        container.classList.toggle('show');
        const filter = selection8.innerHTML;
        filterToInfobox.innerHTML = filter;
        filterButton.classList.toggle('filterToggle');
    };
    selection8.className = 'show';

    const selection9 = document.createElement('p');
    const textSelection9 = document.createTextNode('삭제하기');
    selection9.appendChild(textSelection9);
    selection9.onclick = function () {
        container.classList.toggle('show');
        filterToInfobox.innerHTML = '';
        filterButton.classList.toggle('filterToggle');
    };
    selection9.className = 'show';

    // dropdown.appendChild(btn);
    dropdown.appendChild(container);
    container.appendChild(selection1);
    container.appendChild(selection2);
    container.appendChild(selection3);
    container.appendChild(selection4);
    container.appendChild(selection5);
    container.appendChild(selection6);
    container.appendChild(selection7);
    container.appendChild(selection8);
    container.appendChild(selection9);

    // declare modalBody
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    // make deletebutton
    const that = this;
    const deleteButton = document.createElement('i');
    deleteButton.className = 'far fa-trash-alt deleteButton';
    deleteButton.onclick = function () {
        console.log('You want to delete?');
        that._element.parentNode.removeChild(that._element);
    };

    // make input bar
    const inputBarTitle = document.createElement('textarea');
    inputBarTitle.className = 'inputDescriptionTitle';
    inputBarTitle.setAttribute('placeholder', 'Title');
    inputBarTitle.addEventListener('click', e => {
        e.target.focus();
    });

    const inputBarDescription = document.createElement('textarea');
    inputBarDescription.className = 'inputDescription';
    inputBarDescription.setAttribute('placeholder', 'Add Description...');
    inputBarDescription.addEventListener('click', e => {
        e.target.focus();
    });

    // make input text part of window
    const textToInfoboxTitle = document.createElement('h3');
    const textToInfoboxDescription = document.createElement('p');
    textToInfoboxTitle.className = 'textToInfobox';
    textToInfoboxDescription.className = 'textToInfobox';
    const initText = document.createTextNode('');
    textToInfoboxTitle.appendChild(initText);
    textToInfoboxDescription.appendChild(initText);


    // make editButton
    const editButton = document.createElement('i');
    editButton.className = 'far fa-edit editButton';
    editButton.onclick = function () {
        console.log('You want to edit?');
        if (inputBarTitle.style.display === 'block') {
            inputBarTitle.style.display = 'none';
            inputBarDescription.style.display = 'none';
            textToInfoboxDescription.style.display = 'block';
            textToInfoboxTitle.style.display = 'block';
            editButton.style.color = 'rgb(156, 156, 156)';
            textToInfoboxTitle.innerHTML = inputBarTitle.value;
            textToInfoboxDescription.innerHTML = inputBarDescription.value;
        } else {
            inputBarTitle.style.display = 'block';
            inputBarDescription.style.display = 'block';
            textToInfoboxDescription.style.display = 'none';
            textToInfoboxTitle.style.display = 'none';
            editButton.style.color = '#4d55b2';
        }
    };

    // InfoBox/Modal that appears on Shape Selection
    const infoBox = document.createElement('div');
    infoBox.setAttribute('id', 'myModal');
    infoBox.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const close = document.createElement('span');
    close.classList.add('infoCloser');
    const closeText = document.createTextNode('닫기');
    close.appendChild(closeText);
    close.onclick = function () {
        infoBox.style.display = 'none';
        inputBarTitle.style.display = 'none';
        inputBarDescription.style.display = 'none';
        editButton.style.color = 'rgb(156, 156, 156)';
        textToInfoboxDescription.style.display = 'block';
        textToInfoboxTitle.style.display = 'block';
    };

    const modalHeaderTitle = document.createElement('h2');
    const modalHeaderTitleText = document.createTextNode('Shape Commentor');
    modalHeaderTitle.appendChild(modalHeaderTitleText);


    const modalBodyP1 = document.createElement('p');
    const modalBodyP1Text = document.createTextNode('Some text in the Modal Body');
    modalBodyP1.appendChild(modalBodyP1Text);

    const modalBodyP2 = document.createElement('p');
    const modalBodyP2Text = document.createTextNode('Some other text...');
    modalBodyP2.appendChild(modalBodyP2Text);

    infoBox.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalHeader.appendChild(close);
    modalHeader.appendChild(modalHeaderTitle);
    modalContent.appendChild(modalBody);
    modalBody.appendChild(inputBarTitle);
    modalBody.appendChild(inputBarDescription);
    modalBody.appendChild(editButton);
    modalBody.appendChild(deleteButton);
    modalBody.appendChild(filterButton);
    modalBody.appendChild(textToInfoboxTitle);
    modalBody.appendChild(textToInfoboxDescription);
    modalBody.appendChild(filterToInfobox);
    modalBody.appendChild(dropdown);

    // make svg that contain Shape
    this.svg = d3.create('svg');
    const svgNode = this.svg.node();
    svgNode.onclick = function () {
        // console.log('You clicked on this SVG! ', event);
        // console.log(event.target.parentNode.children[1].children[0]); // modal-content
        // console.log(event.target.parentNode.children[1].children[0].children[1].children[1]); // delete button
        const modal = event.target.parentNode.children[1];
        modal.style.display = 'block';
        const modalContent = event.target.parentNode.children[1].children[0];
        modalContent.style.top = '-125px';
        modalContent.style.left = '0px';

    };

    // Load into _element.
    this.addShape();
    div.appendChild(this.svg.node());
    div.appendChild(infoBox);
    this._element = div;
    const overlayLayer = this.getPanes().overlayLayer;
    overlayLayer.appendChild(this._element);
};

Shape.prototype.addShape = function () {
    this._path = this.svg.append('path');
};

Shape.prototype.draw = function (lineData) {
    if (!this.getMap()) {
        return;
    }
    if (lineData) {
        this._lineData = lineData;
    }

    this.setShape();

    const projection = this.getProjection();
    const position = this._startPos;
    const pixelPosition = projection.fromCoordToOffset(position);

    this._element.style.position = 'absolute';
    // place thd div where user click
    this._element.style.top = `${pixelPosition.y}px`;
    this._element.style.left = `${pixelPosition.x}px`;
    // set the ratio
    const ratio = this._map.getZoom() - this._zoom;

    // calculate the div width and height(Subtraction of two coordinates) with zoom ratio
    this._widthRatio = this._width * 2 ** ratio;
    this._heightRatio = this._height * 2 ** ratio;

    // match the div and svg size
    this._element.style.width = `${this._widthRatio}px`;
    this._element.style.height = `${this._heightRatio}px`;

    this.setSvg();
    this.setPath();
};

Shape.prototype.setShape = function () { };

Shape.prototype.setSvg = function () { };

Shape.prototype.setPath = function () { };

Shape.prototype.onRemove = function () {
    this._element.parentNode.removeChild(this._element);
};

export default Shape;
