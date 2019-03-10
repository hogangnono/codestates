import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import axios from 'axios';
// import { FaLine } from 'react-icons/fa';
import Button from '../Module/Button';
import Circle from '../CustomOverlay/Circle';
import MyDrawingElement from './MyDrawingElement';

class Drawing extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        map: PropTypes.object.isRequired,
        closeFn: PropTypes.func.isRequired
    };

    state = {
        index: 0,
        theNumberOfFigure: [],
        shapes: ['line', 'arrow', 'square', 'circle', 'polygon'],
        selectedButton: null,
        loadedListener: null
    };

    handleAxios = (parseURL, body) => {
        const basicURL = 'http://localhost:3001/';
        axios
            .post(basicURL + parseURL, body)
            .then(result => {
                console.log('저장성공!');
            })
            .catch(err => {
                console.log('err: ', err);
            });
    };

    checkDrawStatus = () => {
        const { index, theNumberOfFigure } = this.state;
        this.setState({
            theNumberOfFigure: [...theNumberOfFigure, index + 1],
            index: index + 1
        });
    };

    removeListener = () => {
        const naver = window.naver;
        const { leftClick } = this.state;
        const { rightClick } = this.state;
        const { toggle } = this.state;
        naver.maps.Event.removeListener(leftClick);
        naver.maps.Event.removeListener(rightClick);
        console.log('toggle of state: ', toggle);
    };

    createShapeTest = () => {
        let startPos;
        const naver = window.naver;
        const { map } = this.props;
        const Shape = Circle;
        console.log('CreateShapeTest is called');

        // line / arrow / square / circle / polygon
        const { loadedListener } = this.state;

        if (loadedListener !== null) {
            naver.maps.Event.removeListener(loadedListener.leftClick);
            naver.maps.Event.removeListener(loadedListener.rightClick);
        }

        const leftClick = naver.maps.Event.addListener(map, 'click', e => {
            const { coord, offset } = e;
            startPos = { coord, offset };
            naver.maps.Event.removeListener(leftClick);
        });

        const rightClick = naver.maps.Event.addListener(
            map,
            'rightclick',
            e => {
                this.checkDrawStatus();
                const { coord, offset } = e;
                const endPos = { coord, offset };
                new Shape({
                    position: { startPos, endPos },
                    naverMap: map,
                    zoom: ''
                }).setMap(map);

                naver.maps.Event.removeListener(rightClick);
            }
        );

        this.setState({
            loadedListener: {
                leftClick,
                rightClick
            }
        });
    };

    selectButton = selectedIcon => {
        console.log('selectedIcon: ', selectedIcon);
        this.setState({ selectedButton: selectedIcon });
        this.createShapeTest(); // Enter parameter for different shape
    };

    render() {
        const { drawingData, map, closeFn } = this.props;
        const { theNumberOfFigure, selectedButton, shapes } = this.state;
        return (
            <div id="drawingComponentContainer">
                {shapes.map(shape => {
                    console.log('Drawing', shape);
                    console.log(selectedButton === shape);

                    return (
                        <Button
                            map={map}
                            Shape={Circle}
                            icons={shape}
                            drewStatus={this.checkDrawStatus}
                            selectButton={this.selectButton}
                            isSelected={selectedButton === shape ? true : false}
                        />
                    );
                })}
                {/* <Button
                    map={map}
                    Shape={Circle}
                    icons="line"
                    drewStatus={this.checkDrawStatus}
                    selectButton={this.selectButton}
                    isSelected={selectedButton === 'line' ? true : false}
                />
                <Button
                    map={map}
                    Shape={Circle}
                    icons="arrow"
                    drewStatus={this.checkDrawStatus}
                    selectButton={this.selectButton}
                    isSelected={selectedButton === 'arrow' ? true : false}
                />
                <Button
                    map={map}
                    Shape={Circle}
                    icons="square"
                    drewStatus={this.checkDrawStatus}
                    selectButton={this.selectButton}
                    isSelected={selectedButton === 'square' ? true : false}
                />
                <Button
                    map={map}
                    Shape={Circle}
                    icons="circle"
                    drewStatus={this.checkDrawStatus}
                    selectButton={this.selectButton}
                    isSelected={selectedButton === 'circle' ? true : false}
                />
                <Button
                    map={map}
                    Shape={Circle}
                    icons="polygon"
                    drewStatus={this.checkDrawStatus}
                    selectButton={this.selectButton}
                    isSelected={selectedButton === 'polygon' ? true : false}
                /> */}
                <div id="myDrawingsContainer">
                    {theNumberOfFigure.map(el => {
                        return <MyDrawingElement key={'Idrew' + el} />;
                    })}
                </div>
                <div id="saveCloseBtns">
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => {
                            this.handleAxios('user/save', drawingData);
                        }}
                    >
                        {`저장`}
                    </button>
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => closeFn()}
                    >
                        {`닫기`}
                    </button>
                </div>
            </div>
        );
    }
}

export default Drawing;
