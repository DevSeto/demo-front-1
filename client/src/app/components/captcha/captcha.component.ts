import {Component, OnInit, Input, Output, EventEmitter, NgZone, ViewChild, ElementRef, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {ReCaptchaService} from '../../services/extra/captcha.service';

@Component({
    selector: 're-captcha',
    template: '<div #target></div>',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ReCaptchaComponent),
            multi: !!1,
        },
    ],
})

export class ReCaptchaComponent implements OnInit, ControlValueAccessor {

    @Input()
    public site_key: string = null;

    @Input()
    public theme: string = 'light';

    @Input()
    public type: string = 'image';

    @Input()
    public size: string = 'normal';

    @Input()
    public tabindex: number = 0;

    @Input()
    public badge: string = 'bottomright';

    @Input()
    public language: string = null;

    @Output()
    public captchaResponse: any = new EventEmitter<string>();

    @Output()
    public captchaExpired: any = new EventEmitter();

    @ViewChild('target')
    public targetRef: ElementRef;

    public widgetId: any = null;

    public onChange: (data: string|null) => void = (data: string|null): void => {
    }
    public onTouched: () => void = (): void => {
    }

    constructor(private _zone: NgZone,
                private _captchaService: ReCaptchaService) {
    }

    public ngOnInit(): void {
        this._captchaService.getReady(this.language)
            .subscribe((ready: any) => {
                if (!ready)
                    return;

                this.widgetId = (window as any).grecaptcha.render(this.targetRef.nativeElement, {
                    'sitekey': this.site_key,
                    'badge': this.badge,
                    'theme': this.theme,
                    'type': this.type,
                    'size': this.size,
                    'tabindex': this.tabindex,
                    'callback': ( (response: any) => this._zone.run(this.recaptchaCallback.bind(this, response))) as any,
                    'expired-callback': (() => this._zone.run(this.recaptchaExpiredCallback.bind(this))) as any,
                });
            });
    }

    public reset(): void {
        if (this.widgetId === null)
            return;

        (window as any).grecaptcha.reset(this.widgetId);
        this.onChange(null);
    }

    public execute(): void {
        if (this.widgetId === null)
            return;

        (window as any).grecaptcha.execute(this.widgetId);
    }

    public getResponse(): string {
        if (this.widgetId === null)
            return null;

        return (window as any).grecaptcha.getResponse(this.widgetId);
    }

    public writeValue(newValue: any): void {
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private recaptchaCallback(response: string): void {
        this.onChange(response);
        this.onTouched();
        this.captchaResponse.emit(response);
    }

    private recaptchaExpiredCallback(): void {
        this.onChange(null);
        this.onTouched();
        this.captchaExpired.emit();
    }
}