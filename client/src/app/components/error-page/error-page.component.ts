import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
    templateUrl: '../../html/error-page/error-page.component.html',
})

export class ErrorPageComponent implements OnInit {

    public errorCode: string;

    constructor(public titleService: Title,
                public route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.titleService.setTitle('Error');
        this.errorCode = this.route.snapshot.params['error-code'];
    }
}