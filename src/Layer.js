import React, { Component } from 'react';
import * as d3 from 'd3';

class Layer extends Component {
    constructor(props) {
        super(props);
        let svg;
    }
    componentDidMount() {
        let svg = d3.select('#map')
            .append('svg')
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight)

        var line = svg.append("line")
            .attr("x1", 5)
            .attr("y1", 5)
            .attr("x2", 50)
            .attr("y2", 50)
            .attr("stroke-width", 2)
            .attr("stroke", "black");
    }
    render() {
        return (
            <div>{this.svg}</div>
        )
    }
}

export default Layer;


// var Layer = function (options) {
//     let svg = d3.select('#map')
//         .append('svg')
//         .attr('width', window.innerWidth)
//         .attr('height', window.innerHeight)
//     this._element =
//         this._element = document.createElement("div");
//     // this._element.setAttribute("id", "rect");
//     this._element.className = "rect";
//     // add the text node to the newly created div
//     // this._element.appendChild(newContent);

//     this.setPosition(options.position);
//     this.setMap(options.map || null);
// };