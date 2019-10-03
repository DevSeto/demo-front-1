import {Directive, Inject, OnInit, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Directive({
    selector: '[stopScrolling]',
})
export class StopScrollingDirective implements OnInit, OnDestroy {

    private className: string = 'scroll-hide';

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    public ngOnInit(): void {
        this.document.body.classList.add(this.className);
    }

    public ngOnDestroy(): void {
        this.document.body.classList.remove(this.className);
    }
}