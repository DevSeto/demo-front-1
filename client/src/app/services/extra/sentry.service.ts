import {ErrorHandler} from '@angular/core';
import {_} from '../helpers/helper.service';

export class Sentry implements ErrorHandler {

    constructor() {
    }

    public initialize = (error: any): void => {
        const raven: any = (window as any).Raven;

        raven.config('https://aecf0aba2da049e798dfbea6b4329858@sentry.io/160456');
        raven.install();
        raven.captureException(error);
    }

    public handleError = (error: any): void => {
        if ((window as any).production_mode)
            this.initialize(error);
        // else
        _.e(error);
    }
}