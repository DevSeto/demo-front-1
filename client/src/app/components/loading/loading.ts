import {Component, Input, OnInit} from '@angular/core';

declare let $: any;

@Component({
    selector: 'loading',
    templateUrl: '../../html/loading/loading.html',
})

export class Loading implements OnInit {

    @Input()
    public className: string = '';

    constructor() {}

    public ngOnInit(): void {}
}
