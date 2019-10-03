import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalVariables} from '../extra/global.variables';
import {_} from './helper.service';

@Injectable()
export class GlobalServices {

    private static lastRouteKey: string = 'last_route';

    constructor(public http: HttpClient,
                public router: Router) {
    }

    public static AuthHeader(token?: string): any {
        const params: any = {
            'Content-Type': 'application/json',
            'Accept': 'application/json;q=0.9,*/*;q=0.8',
        };

        if (token)
            params.Authorization = token;

        return {headers: new HttpHeaders(params)};
    }

    public static AuthHeaderForAvatar(token?: string): any {
        const params: any = {};

        if (token)
            params.Authorization = token;

        return {headers: new HttpHeaders(params)};
    }

    public static saveToken(token: string) {
        if (token)
            localStorage.setItem('auth_token', token.replace('Bearer ', ''));
    }

    public static addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60000);
    }

    public static cacheProperty(propertyName: string, timeInMinutes: number, storedData: any) {
        let data: any = storedData;

        if (typeof(storedData) === 'object')
            data = JSON.stringify(storedData);

        localStorage.setItem(propertyName, data);
        localStorage.setItem(
            propertyName + '-expiredAt',
            JSON.stringify(GlobalServices.addMinutes(new Date(), timeInMinutes).getTime()),
        );
    }

    public static isPropertyExpired(propertyName: string) {
        const property: any = (propertyName.indexOf('-expiredAt') === -1) ? propertyName + '-expiredAt' : propertyName;

        if (!localStorage.hasOwnProperty(property))
            return true;

        const propertyExpTime: Date = new Date(+localStorage.getItem(property));

        if ((new Date().getTime()) > propertyExpTime.getTime())
            return true;

        return false;
    }

    public static isCachedPropertyValid(property: string) {
        if (localStorage.hasOwnProperty(property) && !GlobalServices.isPropertyExpired(property))
            return true;

        return false;
    }

    public static setAuthTokenExpTime() {
        GlobalServices.cacheProperty('auth_token_exp', 55, '1');
    }

    public static isAuthTokenValid() {
        return GlobalServices.isCachedPropertyValid('auth_token_exp');
    }

    public static processErrorHandlers(error: HttpErrorResponse, router?: Router) {
        GlobalServices.checkUserAuthorization(error, router);
        GlobalServices.check500ServerError(error, router);
    }

    public static checkUserAuthorization(error: HttpErrorResponse, router: Router) {
        if (error.status === 482) {
            window.location.href = '/logout';
        }
    }

    public static check500ServerError(error: HttpErrorResponse, router: Router) {
        if (error.status === 500 || error.status === 404) {
        }
    }

    public static expiredTime(rememberMe?: boolean): string {
        let timeInMinutes: number = 525600,
            minutes: Date;

        if (rememberMe)
            timeInMinutes = 1025600;

        minutes = GlobalServices.addMinutes(new Date(), timeInMinutes);

        return minutes.toUTCString();
    }

    public static set lastRoute(routeName: LastRoute) {
        localStorage.setItem(this.lastRouteKey, JSON.stringify(routeName));
    }

    public static get lastRoute(): LastRoute {
        const lastRoute: LastRoute = JSON.parse(localStorage.getItem(this.lastRouteKey));
        return ( lastRoute ) ? lastRoute : {} as LastRoute;
    }
    //
    // public static getClosest(elem: any, selector: string): HTMLElement | string {
    //     let element: any = (window as any).Element.prototype,
    //         matches: any,
    //         i: number;
    //
    //     if (!element.matches) {
    //         element.matches =
    //             element.matchesSelector ||
    //             element.mozMatchesSelector ||
    //             element.msMatchesSelector ||
    //             element.oMatchesSelector ||
    //             element.webkitMatchesSelector ||
    //             function(selector: string): boolean {
    //                 matches = (this.document || this.ownerDocument).querySelectorAll(selector);
    //                 i = matches.length;
    //
    //                 while (--i >= 0 && matches.item(i) !== this) {
    //                 }
    //                 return i > -1;
    //             };
    //     }
    //
    //     for (; elem && elem !== document; elem = elem.parentNode)
    //         if (elem.matches(selector)) return elem;
    //
    //     return _._;
    // }

    public static spliceInTwinsArrays(first: Array<any>, second: Array<any>, params: Array<string>): Array<any> {
        first.forEach((first_value: any): void => {

            second.forEach((secondValue: any, index: number): void => {
                if (secondValue[params[0]]) {
                    if (secondValue[params[0]] !== first_value[params[0]])
                        return;
                } else if (first_value[params[0]] !== secondValue[params[1]]) {
                    return;
                }

                second.splice(index, 1);
            });
        });

        return second;
    }

    public static getCompanyUrl = (name: string): string =>
        `https://${name}.${GlobalVariables.DOMAIN_NAME}`
}