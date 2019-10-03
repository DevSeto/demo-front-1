import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[showElipsis]',
})
export class ShowElipsisDirective implements AfterViewInit {

    constructor(private hostElement: ElementRef) {
    }

    public ngAfterViewInit(): void {
        const currentElement: any = this.hostElement.nativeElement,
            previousElement: any = currentElement.previousElementSibling;

        if (previousElement.clientHeight < previousElement.scrollHeight)
            currentElement.style.display = 'block';
    }
}