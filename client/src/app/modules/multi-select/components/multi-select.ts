import {
    Component,
    forwardRef,
    Input,
    OnDestroy,
    ElementRef,
    Output,
    OnChanges,
    EventEmitter,
    AfterViewInit,
    Inject,
    OnInit,
    Renderer2,
    HostListener,
    HostBinding,
    SimpleChanges,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {KEY_UP, KEY_DOWN, ESCAPE, ENTER, BACKSPACE, sanitizeString} from '../multi-select.helper';
import {TicketsService} from '../../../services/components/tickets.service';
import {NotificationsService} from '../../../services/components/notifications.service';
import {ValidationService} from '../../../services/helpers/validation.service';
import {ToastrService} from '../../toastr/toastr/toastr-service';
import {DraftService} from '../../../services/components/draft.service';

@Component({
    selector: 'multi-select',
    templateUrl: '../html/multi-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef((): any => MultiSelectComponent),
            multi: !!1,
        },
    ],
})
export class MultiSelectComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit, OnChanges {

    @Input() nameField = 'name';
    @Input() idField = 'id';
    @Input() custom = !!1;
    @Input() multi = !!0;
    @Input() complex = !!0;
    @Input('placeholder') placeholder = 'Add Recipients';

    @Input('defaultToastrParams')
    public defaultToastrParams: any;
    @Input('labelText')
    public labelText: string = '';

    @Input('infoTexts')
    public infoTexts: any;

    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    @HostBinding('class.multi')
    public get multiBinding(): boolean {
        return this.multi;
    }

    @HostBinding('attr.disabled')
    public get disabledBinding(): boolean {
        return this.isDisabled || null;
    }

    isDisabled = !!0;
    isExpanded = !!0;
    isDraft: any;
    matches: any = [];
    allMatches: any;

    values: any = [];

    public hideDropdown: boolean = !!1;
    public activeEditables: Array<boolean> = [];
    public customerEmails: Array<any> = [];
    public dropdownposition: number|null = 0;
    private callbackQueue: Array<() => any> = [];

    private _input: HTMLInputElement;
    private _inputChangeEvent: EventEmitter<any> = new EventEmitter();
    private _value: any;
    private _removeInProgress: boolean = !!0;

    public get value(): any {
        return this._value;
    }

    public set value(value: any) {
        if (value === this._value)
            return;

        this.writeValue(value);
    }

    constructor(@Inject(ElementRef) private elementRef: ElementRef,
                @Inject(Renderer2) private renderer: Renderer2,
                private ticketsService: TicketsService,
                private toastr: ToastrService,
                private draftService: DraftService,
                private notificationsService: NotificationsService) {

        this.ticketsService.clearForwarding.subscribe((data: any): void => {
            if (this.values.length) {
                this.values.forEach((element: string): void => {
                    this.removeValue(element);
                });
            }
        });
    }

    public ngOnInit(): void {
        this._inputChangeEvent.emit('');
    }

    public setDisabledState(value: boolean): void {
        this.isDisabled = value;
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', value);
    }

    public onChange = (_: any): any => {
    }

    public onTouched = (): any => {
    }

    public registerOnChange(fn: (_: any) => any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    public ngOnChanges(changes: SimpleChanges): void {
    }

    public ngAfterViewInit(): void {
        this._input = this.elementRef.nativeElement.querySelector('input');
        if (this.ticketsService.ticket.ticketDraft && this.ticketsService.ticket.ticketDraft.forwarding_emails.length) {
            setTimeout(() => {
                for (const val of this.ticketsService.ticket.ticketDraft.forwarding_emails) {
                    this.setValue(val);
                }
                this.valueChange.emit(this.values);
            });
        }

        if (!this.multi && this._value) {
            const callback: any = (): any => {
                this._input.value = this.complex ?
                    this.extractNameById(this._value) :
                    this._value;
            };

            if (this.allMatches || !this.complex)
                callback.apply(this);
            else
                this.callbackQueue.push(callback);
        }

        this.isDraft = this.draftService.isDraft.subscribe((isDraft: boolean): void => {
            if (isDraft) {
                setTimeout(() => {
                    for (const val of this.ticketsService.ticket.ticketDraft.forwarding_emails) {
                        this.setValue(val);

                    }
                    this.valueChange.emit(this.values);
                });
            }
        });
    }

    public ngOnDestroy(): void {
        this.isDraft.unsubscribe();
    }

    public handleInputChange(event: Event): void {
        event.stopPropagation();
    }

    public handleInput(event: Event | KeyboardEvent): void {
        const target: HTMLInputElement = (event.target as HTMLInputElement);

        if (([KEY_DOWN, KEY_UP] as any).includes(event.type) && (event as KeyboardEvent).key === ESCAPE)
            return;

        if (this.multi || this.complex) {
            if (event.type === KEY_UP && (event as KeyboardEvent).key === ENTER && target.value !== '') {
                this.setValue(target.value);
            }

            if (([KEY_DOWN, KEY_UP] as any).includes(event.type) && (event as KeyboardEvent).key === BACKSPACE) {
                if (target.value === '') {
                    if (event.type === KEY_DOWN) {
                        this._removeInProgress = !!1;
                    } else if (this._removeInProgress) {
                        if (this.multi && this.values.length) {
                            this._removeInProgress = !!0;
                            this.removeValue(this.values[this.values.length - 1]);
                        }
                    }
                } else if (this.complex && !this.multi && event.type === KEY_DOWN) {
                    this.value = null;
                }
            }
        } else if (event.type === KEY_UP) {
            this.setValue(target.value);
        }

        this._inputChangeEvent.emit(target.value);
        this.valueChange.emit(this.values);
    }

    public setValue(value: any): void {
        if ((!this.custom || this.complex) && !this.hasMatch(value))
            return;

        if (ValidationService.dontRequiredEmailValidator({value})) {
            this.toastr.info(this.infoTexts.invalidForwardEmail, 'Info', this.defaultToastrParams);
            return;
        }

        if (this.multi) {
            if (!this.values.includes(value)) {
                this.value = this.values.concat(value).map(this.extractIdentifier.bind(this));
                this._input.value = '';
            }
        } else {
            this.value = this.extractIdentifier(value);
            this._input.value = this.extractName(value);
        }

        setTimeout(() => {
            this.draftService.addIndividualdraftData();
        });

        this._input.focus();
    }

    public changeEvent(event: Event, index: number, focusOut?: boolean): void {
        const target: any = (event.target as HTMLInputElement);

        if (target.contentEditable === 'inherit') {
            if (!focusOut) {
                event.preventDefault();
                target.contentEditable = !!1;
                this.activeEditables[index] = !!1;
                target.innerText = `<${target.innerText.trim()}>`;
                target.focus();
            }

            return;
        } else if ((event as KeyboardEvent).key === ENTER) {
            this.setChangedValue(target, index);
            event.preventDefault();
            return;
        }

        if (focusOut)
            this.setChangedValue(target, index);
    }

    public setChangedValue(target: any, index: number): void {
        target.contentEditable = 'inherit';
        this.activeEditables[index] = !!0;
        target.innerHTML = target.innerText.replace('<', '').replace('>', '');
        this.values[index] = target.innerText.trim();
        this.valueChange.emit(this.values);
        this._input.focus();
    }

    public clearSelection(): void {
        if ((document as any).selection && (document as any).selection.empty) {
            (document as any).selection.empty();
        } else if (window.getSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
        }
    }

    public removeValue(value: any): void {
        const index: number = this.values.indexOf(value);

        if (index !== -1) {
            if (index === this.values.length - 1)
                this.value = this.values.slice(0, -1)
                    .map(this.extractIdentifier.bind(this));
            else
                this.value = this.values
                    .slice(0, index)
                    .concat(this.values.slice(index + 1))
                    .map(this.extractIdentifier.bind(this));

            this._inputChangeEvent.emit(this._input.value);
            this._input.focus();
            this.valueChange.emit(this.values);
            setTimeout(() => {
                this.draftService.addIndividualdraftData();
            }, 200);
        }
    }

    public writeValue(value: any): void {
        this._value = value;
        this.elementRef.nativeElement.value = value;

        if (this.multi) {
            if (this.complex) {
                const callback: any = function() {
                    this.values = value ? value.map(this.parseObjectById.bind(this)) : [];
                    this.values = this.values.filter((val: any) => !!val);
                };

                if (this.allMatches || !value)
                    callback.apply(this);
                else
                    this.callbackQueue.push(callback);
            } else {
                this.values = value || [];
            }
        }

        if ('createEvent' in document) {
            const event: any = document.createEvent('HTMLEvents');
            event.initEvent('change', !!0, !!1);
            this.elementRef.nativeElement.dispatchEvent(event);
        } else {
            this.elementRef.nativeElement.fireEvent('onchange');
        }

        this.onChange(value);
    }

    private hasMatch(value: string | object): boolean {
        const sanitizedValue: string|null = typeof value === 'string' ? sanitizeString(value) : null;

        for (const key in this.matches) {
            if (this.matches.hasOwnProperty(key)) {
                if (typeof this.matches[key] === 'string') {
                    const sanitizedMatch: string|null = sanitizeString(this.matches[key] as string);

                    if (sanitizedMatch === sanitizedValue)
                        return !!1;
                } else {
                    if (typeof value === 'string') {
                        const sanitizedMatch: string|null = sanitizeString((this.matches[key] as any)[this.nameField]);

                        if (sanitizedMatch === sanitizedValue)
                            return !!1;
                    } else {
                        if ((this.matches[key] as any)[this.idField] === (value as any)[this.idField])
                            return !!1;
                    }
                }
            }
        }

        return !!0;
    }

    private extractNameById(id: any): string {
        const match: any = this.parseObjectById(id);

        if (match)
            return match[this.nameField];
        else
            return '';
    }

    private parseObjectById(id: any): any {
        for (const key in this.allMatches) {
            if (this.allMatches.hasOwnProperty(key))
                if ((this.allMatches[key] as any)[this.idField] === id)
                    return this.allMatches[key];
        }

        return null;
    }

    private extractIdentifier(value: string | object): any {
        if (this.complex) {
            if (typeof value === 'string') {
                const sanitizedValue: string|null = sanitizeString(value);
                const match: any = (this.allMatches as object[]).find((item: any): any =>
                sanitizeString(item[this.nameField]) === sanitizedValue);

                if (match)
                    return match[this.idField];

                throw Error('Sxal!!!!');
            }

            return (value as any)[this.idField];
        }

        return value;
    }

    private extractName(value: string | object): any {
        if (this.complex && typeof value !== 'string')
            return (value as any)[this.nameField];

        return value;
    }

    public emailAutocomplete(value: string): void {
        if (value.trim().length) {
            if ((value.trim().length & 1)){
                this.ticketsService.getCustomerEmails(value)
                    .then((data: any) => {
                        if (data.success)
                            this.customerEmails = data.data;

                        this.dropdownposition = (document as any).getElementsByClassName('input-select')[0].offsetLeft;
                    });
            }
        } else
            this.customerEmails = [];
    }

    public selectedEmail(email: string): void {
        this.setValue(email);
        this.valueChange.emit(this.values);
        this._inputChangeEvent.emit('');
        this.customerEmails = [];
    }

    @HostListener('focusout', ['$event'])
    public focusOutHandler(event: any): void {
        setTimeout(() => {
            this.customerEmails = [];
        }, 200);

        if (this.isDisabled)
            return;

        if (event.relatedTarget) {
            if (event.relatedTarget === this.elementRef.nativeElement ||
                event.relatedTarget.parentElement === this.elementRef.nativeElement ||
                event.relatedTarget.parentElement.parentElement === this.elementRef.nativeElement) {

                if (event.target === this._input && event.relatedTarget === this.elementRef.nativeElement)
                    this._input.focus();

                return;
            }
        }

        if (this.multi) {
            if (this._input.value && (!this.customerEmails || !this.customerEmails.length)) {
                this.setValue(this._input.value);
                this.valueChange.emit(this.values);
            }

            this._inputChangeEvent.emit('');
            return;
        }

        if (!this.custom || this.complex) {
            this._input.value = this._input.value.trim();

            if (!this.hasMatch(this._input.value)) {
                this._input.value = this.value = null;
                this._inputChangeEvent.emit('');
            }
        }
    }

    public resetEmails(index: number): string {
        this.customerEmails.splice(index, 1);
        return '';
    }
    public setCursor(event:any): void {
        console.log(this)

        this.elementRef.nativeElement.querySelector('#forward-ticket-to').focus();
    }
}
