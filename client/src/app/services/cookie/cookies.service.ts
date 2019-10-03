import {Injectable, Optional} from '@angular/core';
import {CookieOptions} from '../../models/cookie/cookie.options.model';
import {CookieOptionsArgs} from '../../interfaces/cookie/cookie.options.interface';
import {CookieInterface} from '../../interfaces/cookie/cookie.interface';

@Injectable()
export class CookieService implements CookieInterface {

    protected get cookieString(): string {
        return document.cookie || '';
    }

    protected set cookieString(val: string) {
        document.cookie = val;
    }

    constructor(@Optional() private _defaultOptions?: CookieOptions) {
    }

    public get(key: string): string {
        return (this._cookieReader() as any)[key];
    }

    public getObject(key: string) {
        const value = this.get(key);
        return value ? JSON.parse(value) : value;
    }

    public getAll()
    {
        return this._cookieReader() as any;
    }

    public put(key: string, value: string, options?: CookieOptionsArgs): void {
        this._cookieWriter()(key, value, options);
    }

    public putObject(key: string, value: any, options?: CookieOptionsArgs): void {
        this.put(key, JSON.stringify(value), options);
    }

    public remove(key: string, options?: CookieOptionsArgs): void {
        this._cookieWriter()(key, undefined, options);
    }

    public removeAll(): void {
        const cookies = this.getAll();

        Object.keys(cookies).forEach((key: string): void => {
            this.remove(key);
        });
    }

    private _cookieReader() {
        let lastCookies = {},
            lastCookieString = '',
            cookieArray: string[],
            i: number,
            index: number,
            name: string;

        const    that = this;
        let cookie: string;
        const currentCookieString: string = this.cookieString;

        if (currentCookieString !== lastCookieString) {
            lastCookieString = currentCookieString;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};

            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                index = cookie.indexOf('=');

                if (index > 0) {
                    name = that._safeDecodeURIComponent(cookie.substring(0, index));

                    if (this.isBlank((lastCookies as any)[name]))
                        (lastCookies as any)[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
                }
            }
        }

        return lastCookies;
    }

    private _cookieWriter(){
        const that = this;

        return (name: string, value: string, options?: CookieOptionsArgs) => {
            that.cookieString = that._buildCookieString(name, value, options);
        };
    }

    private _buildCookieString(name: string, value: string, options?: CookieOptionsArgs): string {
        let str: string;
        const cookiePath: string = '/';

        const defaultOpts: any = this._defaultOptions || new CookieOptions({path: cookiePath} as CookieOptionsArgs);
        const opts: CookieOptions = this._mergeOptions(defaultOpts, options);
        let expires: any = opts.expires;

        if (this.isBlank(value)) {
            expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
            value = '';
        }

        if (this.isString(expires))
            expires = new Date(expires);

        str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        str += opts.path ? ';path=' + opts.path : '';
        str += opts.domain ? ';domain=' + opts.domain : '';
        str += expires ? ';expires=' + expires.toUTCString() : '';
        str += opts.secure ? ';secure' : '';

        return str;
    }

    private _mergeOptions(defaultOpts: CookieOptions, providedOpts?: CookieOptionsArgs): CookieOptions {
        const newOpts = defaultOpts;

        if (this.isPresent(providedOpts))
            return newOpts.merge(new CookieOptions(providedOpts));

        return newOpts;
    }

    private _safeDecodeURIComponent: any = (str: string): string => {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            return str;
        }
    }

    private isBlank = (obj: any): boolean => obj === undefined || obj === null;

    private isPresent = (obj: any): boolean => obj !== undefined && obj !== null;

    private isString = (obj: any): obj is string => typeof obj === 'string';
}