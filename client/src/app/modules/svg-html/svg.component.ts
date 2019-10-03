import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'svg-html',
    templateUrl: 'svg.component.html',
})
export class SvgComponent implements OnInit {

    @Input('svgName')
    public svgName: string;

    constructor(){

    }

    public ngOnInit(){

    }

}