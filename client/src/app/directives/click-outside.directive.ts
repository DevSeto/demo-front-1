import {
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Directive({
    selector: '[clickOutside]',
})

export class ClickOutsideDirective implements OnInit, OnDestroy, OnChanges {

    @Input()
    public attachOutsideOnClick: boolean = !!0;

    @Input()
    public exclude: string = '';

    @Output()
    public clickOutside: EventEmitter<any> = new EventEmitter<any>();

    private _nodesExcluded: Array<HTMLElement> = [];

    constructor(@Inject(DOCUMENT) private _document: any,
                private _el: ElementRef) {
        this._initOnClickBody = this._initOnClickBody.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
    }

    public ngOnInit(): void {
        this._init();
    }

    public ngOnDestroy(): void {
        if (this.attachOutsideOnClick)
            this._el.nativeElement.removeEventListener('click', this._initOnClickBody);

        this._document.body.removeEventListener('click', this._onClickBody);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.attachOutsideOnClick || changes.exclude)
            this._init();
    }

    private _init(): void {
        if (this.exclude) {
            this.exclude.split(',').forEach((selector: any): void => {

                if (selector) {
                    try {
                        const node = this._document.querySelector(selector.trim());

                        if (node)
                            this._nodesExcluded.push(node);
                    }
                    catch (err) {
                        // console.error(err);
                    }
                }
            });
        }

        if (this.attachOutsideOnClick)
            this._el.nativeElement.addEventListener('click', this._initOnClickBody);
        else
            this._initOnClickBody();
    }

    private _onClickBody(e: Event): void {
        const emitedData: Array<any> = [];

        if (!this._el.nativeElement.contains(e.target) && !this._shouldExclude(e.target)) {
            this.clickOutside.emit(e);

            if (this.attachOutsideOnClick)
                this._document.body.removeEventListener('click', this._onClickBody);
        }
    }

    private _shouldExclude(target: any): boolean {

        let response: boolean = !!0;

        for (const i of this._nodesExcluded)
        {
            if (i.contains(target))
            {
                response = !!1;
                break;
            }

        }

        return response;
    }

    private _initOnClickBody: () => void = (): void => this._document.body.addEventListener('click', this._onClickBody);
}