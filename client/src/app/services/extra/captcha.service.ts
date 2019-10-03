import {Injectable, NgZone, Optional, SkipSelf} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class ReCaptchaService {

    private scriptLoaded: boolean = !!0;
    private readySubject: BehaviorSubject<boolean> = new BehaviorSubject(!!0);

    constructor(public zone: NgZone) {
        window['reCaptchaOnloadCallback' as any] = (() => zone.run(this.onloadCallback.bind(this))) as any;
    }

    public getReady(language: string): Observable<boolean> {
        let doc: any,
            script: any;
        const  recaptchaLink: string = 'https://www.google.com/recaptcha/api.js?' +
            'onload=reCaptchaOnloadCallback&render=explicit';

        if (!this.scriptLoaded) {
            this.scriptLoaded = !!1;

            script = document.createElement('script');
            script.innerHTML = '';
            script.src = recaptchaLink + (language ? '&hl=' + language : '');
            script.async = !!1;
            script.defer = !!1;

            doc = document.body as HTMLDivElement;
            doc.appendChild(script);
        }

        return this.readySubject.asObservable();
    }

    private onloadCallback: () => void  = (): void => this.readySubject.next(!!1);
}

export function RECAPTCHA_SERVICE_PROVIDER_FACTORY(ngZone: NgZone, parentDispatcher: ReCaptchaService) {
    return parentDispatcher || new ReCaptchaService(ngZone);
}

export const RECAPTCHA_SERVICE_PROVIDER = {
    provide: ReCaptchaService,
    deps: [NgZone, [new Optional(), new SkipSelf(), ReCaptchaService]],
    useFactory: RECAPTCHA_SERVICE_PROVIDER_FACTORY,
};