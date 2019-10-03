import {Component, Inject, OnInit, Optional} from '@angular/core';

@Component({
    selector: 'app-not-found',
    template: '<h1>Error 404</h1><h2>404! Page not found</h2>',
})

export class NotFoundComponent implements OnInit {
    constructor(
    ) {}

    ngOnInit() {

    }
}
