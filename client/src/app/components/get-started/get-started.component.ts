import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component} from '@angular/core';
import {OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    templateUrl: '../../html/get-started/get-started.component.html',
})

export class GetStartedComponent implements OnInit, AfterViewInit {
    public environment = environment;
    public loader: boolean = !!0;
    constructor(
    ){
    }
    public ngOnInit(): void {
    }
    public ngAfterViewInit(): void {

    }
    public test(event: any): void{
        setTimeout((): void => {
            this.loader = !!1;
        },1000);
    }
}
