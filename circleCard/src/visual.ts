/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualContructorOptions=powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions =  powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import IVisualHost = powerbi.extensibility.IVisualHost;
import * as d3 from "d3";
type Selection <T extends d3.BaseType> = d3.Selection <T, any,any,any>;


//Implements IVisual interface
export class Visual implements IVisual{
    //Variables
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private container: Selection<SVGElement>;
    private circle: Selection<SVGElement>;
    private textValue: Selection<SVGElement>;
    private textLabel: Selection<SVGElement>;


    //Constructor
    constructor(options: VisualContructorOptions){
        this.svg = d3.select(options.element).append("svg").classed('circleCard', true);
        this.container = d3.select(options.element).append("g").classed('container',true);
        this.circle = d3.select(options.element).append("circle").classed('circle', true);
        this.textValue =  d3.select(options.element).append("text").classed('textValue', true);
        this.textLabel =  d3.select(options.element).append("text").classed('textLabel', true);
    }

    public update(options: VisualUpdateOptions) {
        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        this.svg.attr("width", width);
        this.svg.attr("height", height);
        let radius: number = Math.min(width, height) / 2.2;
        this.circle
            .style("fill", "white")
            .style("fill-opacity", 0.5)
            .style("stroke", "black")
            .style("stroke-width", 2)
            .attr("r", radius)
            .attr("cx", width / 2)
            .attr("cy", height / 2);
        let fontSizeValue: number = Math.min(width, height) / 5;
        this.textValue
            .text("Value")
            .attr("x", "50%")
            .attr("y", "50%")
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .style("font-size", fontSizeValue + "px");
        let fontSizeLabel: number = fontSizeValue / 4;
        this.textLabel
            .text("Label")
            .attr("x", "50%")
            .attr("y", height / 2)
            .attr("dy", fontSizeValue / 1.2)
            .attr("text-anchor", "middle")
            .style("font-size", fontSizeLabel + "px");
    }

}



// import powerbi from "powerbi-visuals-api";
// import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
// import "./../style/visual.less";

// import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
// import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
// import IVisual = powerbi.extensibility.visual.IVisual;

// import { VisualFormattingSettingsModel } from "./settings";

// export class Visual implements IVisual {
//     private target: HTMLElement;
//     private updateCount: number;
//     private textNode: Text;
//     private formattingSettings: VisualFormattingSettingsModel;
//     private formattingSettingsService: FormattingSettingsService;

//     constructor(options: VisualConstructorOptions) {
//         console.log('Visual constructor', options);
//         this.formattingSettingsService = new FormattingSettingsService();
//         this.target = options.element;
//         this.updateCount = 0;
//         if (document) {
//             const new_p: HTMLElement = document.createElement("p");
//             new_p.appendChild(document.createTextNode("Update count:"));
//             const new_em: HTMLElement = document.createElement("em");
//             this.textNode = document.createTextNode(this.updateCount.toString());
//             new_em.appendChild(this.textNode);
//             new_p.appendChild(new_em);
//             this.target.appendChild(new_p);
//         }
//     }

//     public update(options: VisualUpdateOptions) {
//         this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);

//         console.log('Visual update', options);
//         if (this.textNode) {
//             this.textNode.textContent = (this.updateCount++).toString();
//         }
//     }

//     /**
//      * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
//      * This method is called once every time we open properties pane or when the user edit any format property. 
//      */
//     public getFormattingModel(): powerbi.visuals.FormattingModel {
//         return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
//     }
// }