import {Directive, OnInit, OnDestroy, ElementRef} from '@angular/core';

@Directive({
    selector: '[closeModal]',
})

export class CloseModalsDirective implements OnInit, OnDestroy {

    public cloud: any = showed;

    public constructor(private _el: ElementRef) {
        _el.nativeElement.addEventListener('click', this.closeModal.bind(this));
    }

    public ngOnInit(): void {

    }

    public closeModal(event: Event) {
        const classList: any  = (event.target as HTMLElement).classList;
        classList.forEach((className: string) => {
            if (className === 'closeModal') {
                const lastValue = (Object as any).keys(this.cloud.effect);
                this.cloud.effect = lastValue[lastValue.length - 1];
            }
        });
    }

    public ngOnDestroy(): void {

    }
}