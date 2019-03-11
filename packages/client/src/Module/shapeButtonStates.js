
function lineButtonState() {
    const { lineButtonToggle } = this.state;
    // console.log('this!: ', this);
    if (lineButtonToggle === false) {
        this.setState({ lineButtonToggle: true }, () => { console.log('lineButtonWhenFalse: ', lineButtonToggle); });
        this.setState({ arrowButtonToggle: false });
        this.setState({ squareButtonToggle: false });
        this.setState({ circleButtonToggle: false });
        this.setState({ polygonButtonToggle: false });
    } else {
        this.setState({ lineButtonToggle: false }, () => console.log('lineButtonWhenTrue: ', lineButtonToggle));
    }
}
// console.log('lineButtonState(1): ', lineButtonToggle);


function arrowButtonState() {
    const { arrowButtonToggle } = this.state;
    console.log('arrowButtonToggle: ', arrowButtonToggle);
    if (arrowButtonToggle === false) {
        this.setState({ lineButtonToggle: false });
        this.setState({ arrowButtonToggle: true });
        this.setState({ squareButtonToggle: false });
        this.setState({ polygonButtonToggle: false });
        this.setState({ circleButtonToggle: false });
    } else {
        this.setState({ arrowButtonToggle: false });
    }
}

function squareButtonState() {
    const { squareButtonToggle } = this.state;
    console.log('squareButtonToggle: ', squareButtonToggle);
    if (squareButtonToggle === false) {
        this.setState({ lineButtonToggle: false });
        this.setState({ arrowButtonToggle: false });
        this.setState({ squareButtonToggle: true });
        this.setState({ polygonButtonToggle: false });
        this.setState({ circleButtonToggle: false });
    } else {
        this.setState({ squareButtonToggle: false });
    }
}

function circleButtonState() {
    const { circleButtonToggle } = this.state;
    console.log('circleButtonToggle: ', circleButtonToggle);
    if (circleButtonToggle === false) {
        this.setState({ lineButtonToggle: false });
        this.setState({ squareButtonToggle: false });
        this.setState({ polygonButtonToggle: false });
        this.setState({ circleButtonToggle: true });
        this.setState({ arrowButtonToggle: false });
    } else {
        this.setState({ circleButtonToggle: false });
    }
}

function polygonButtonState() {
    const { polygonButtonToggle } = this.state;
    console.log('polygonButtonToggle: ', polygonButtonToggle);
    if (polygonButtonToggle === false) {
        this.setState({ lineButtonToggle: false });
        this.setState({ squareButtonToggle: false });
        this.setState({ circleButtonToggle: false });
        this.setState({ arrowButtonToggle: false });
        this.setState({ polygonButtonToggle: true });
    } else { this.setState({ polygonButtonToggle: false }); }
}

const buttonStates = {
    line: lineButtonState,
    arrow: arrowButtonState,
    square: squareButtonState,
    circle: circleButtonState,
    polygon: polygonButtonState
};

export default buttonStates;
