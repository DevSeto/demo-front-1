import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    forwardRef,
    ChangeDetectorRef,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PaginationConfig} from '../pagination.config';
import {PageChangedEvent} from '../interfaces/page-changed-event.interface';

export const PAGINATION_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PaginationComponent),
    multi: true,
};

@Component({
    selector: 'pagination',
    templateUrl: '../html/pagination.component.html',
    providers: [PAGINATION_CONTROL_VALUE_ACCESSOR],
})

export class PaginationComponent implements ControlValueAccessor, OnInit {

    protected _itemsPerPage: number;
    protected _totalItems: number;
    protected _totalPages: number;
    protected inited: boolean = !!0;
    protected _page: number = 1;

    public config: any;
    public onChange: any = Function.prototype;
    public onTouched: any = Function.prototype;

    public classMap: string;
    public pages: any[];

    @Input()
    public align: boolean;

    @Input()
    public maxSize: number;

    @Input()
    public boundaryLinks: boolean;

    @Input()
    public directionLinks: boolean;

    @Input()
    public firstText: string;

    @Input()
    public previousText: string;

    @Input()
    public nextText: string;

    @Input()
    public lastText: string;

    @Input()
    public rotate: boolean;

    @Input()
    public pageBtnClass: string;

    @Input()
    public disabled: boolean;

    @Output()
    public numPages: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public pageChanged: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();

    @Input()
    public get itemsPerPage(): number
    {
        return this._itemsPerPage;
    }
    public set itemsPerPage( v: number )
    {
        this._itemsPerPage = v;
        this.totalPages = this.calculateTotalPages();
    }

    @Input()
    public get totalItems(): number
    {
        return this._totalItems;
    }

    public set totalItems( v: number )
    {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
    }

    public get totalPages(): number
    {
        return this._totalPages;
    }

    public set totalPages( v: number )
    {
        this._totalPages = v;
        this.numPages.emit(v);

        if ( this.inited )
            this.selectPage(this.page);
    }

    public set page( value: number )
    {
        const _previous: number = this._page;

        this._page = value > this.totalPages ? this.totalPages : value || 1;
        this.changeDetection.markForCheck();

        if ( _previous === this._page || typeof _previous === 'undefined' )
            return;

        this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage,
        });
    }

    public get page(): number
    {
        return this._page;
    }

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private changeDetection: ChangeDetectorRef,
        public paginationConfig: PaginationConfig,
    ) {
        this.renderer = renderer;
        this.elementRef = elementRef;

        if ( ! this.config )
            this.configureOptions(
                Object.assign({}, paginationConfig.main, paginationConfig.pager),
            );
    }

    public configureOptions( config: any ): void
    {
        this.config = Object.assign({}, config);
    }

    public ngOnInit(): void
    {
        if ( typeof window !== 'undefined' )
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';

        this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
        this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : this.config.boundaryLinks;
        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : this.config.directionLinks;
        this.pageBtnClass = typeof this.pageBtnClass !== 'undefined' ? this.pageBtnClass : this.config.pageBtnClass;
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = !!1;
    }

    public writeValue( value: number ): void
    {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    }

    public getText(key: string): string {
        return (this as any)[`${key}Text`] || this.config[`${key}Text`];
    }

    public noPrevious(): boolean
    {
        return this.page === 1;
    }

    public noNext(): boolean
    {
        return this.page === this.totalPages;
    }

    public registerOnChange( fn: (_: any) => {} ): void
    {
        this.onChange = fn;
    }

    public registerOnTouched( fn: () => {} ): void
    {
        this.onTouched = fn;
    }

    public selectPage( page: number, event?: Event ): void
    {
        if ( event )
            event.preventDefault();

        if ( ! this.disabled )
        {
            if ( event && event.target )
            {
                const target: any = event.target;
                target.blur();
            }

            this.writeValue(page);
            this.onChange(this.page);
        }
    }

    protected getPages( currentPage: number, totalPages: number ): any[]
    {
        const pages: any[] = [],
            isMaxSized: boolean = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;

        let startPage: number = 1,
            endPage: number = totalPages;

        if ( isMaxSized )
        {
            if ( this.rotate )
            {
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;

                if ( endPage > totalPages )
                {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else
            {
                startPage = (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }

        for ( let num = startPage; num <= endPage; num++ )
        {
            const page: any = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }

        if ( isMaxSized && ! this.rotate )
        {
            if ( startPage > 1 )
            {
                const previousPageSet: any = this.makePage(startPage - 1, '...', !!0);
                pages.unshift(previousPageSet);
            }

            if ( endPage < totalPages )
            {
                const nextPageSet: any = this.makePage(endPage + 1, '...', !!0);
                pages.push(nextPageSet);
            }
        }

        return pages;
    }

    protected calculateTotalPages(): number
    {
        const totalPages: number = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }

    protected makePage = (
        num: number,
        text: string,
        active: boolean): { number: number; text: string; active: boolean } => ({text, number: num, active}) as any
}
