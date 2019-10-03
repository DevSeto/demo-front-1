import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {UsersInterface} from '../../interfaces/components/users.interface';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {GlobalServices} from '../../services/helpers/global.service';
import {CookieService} from '../../services/cookie/cookies.service';
import {CookieOptionsArgs} from '../../interfaces/cookie/cookie.options.interface';
import {GlobalVariables} from '../../services/extra/global.variables';
import {ErrorService} from '../../services/components/error.service';

@Injectable()
export class UsersModel extends Encryption implements UsersInterface {

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private errs: ErrorService) {
        super();
    }

    private readonly _loggedUserIdKey: string = 'logged_user_id';

    private _expiredKey: string;
    private _company: string = 'companys_url';
    private newUserNotReady: string = 'new_user';
    private _userPreferences: string = 'userPreferences';
    private _user: any = {};
    private _userId: number;
    private _key: string = '/users/';
    private _expiredTimekey: string = 'expiredtime';
    private _ticketView: string = 'ticketView';
    private _SortBy: string = 'SortBy';
    private _isRememberMe: boolean;

    public openStep: any = {};
    public userAuthotization: boolean = !!1;
    private cookieArgs: CookieOptionsArgs = {};
    private userLogedKey: any;

    private get key(): string {
        return this._key;
    }

    private set key(id: string) {
        this._key = Encryption.keyEnCrypt(this._key + id);
    }

    private get expiredKey(): string {
        let locationPath: Array<string>;

        if (!this._expiredKey) {
            locationPath = (window as any).location.host.split('.');
            this._expiredKey = locationPath[0];
        }

        return Encryption.keyEnCrypt(this._expiredKey);
    }

    private get loggedUserIdKey(): string {
        return Encryption.keyEnCrypt(this._loggedUserIdKey);
    }

    public get isRememberMe(): boolean {
        return this._isRememberMe;
    }

    public set isRememberMe(rememberMe: boolean) {
        this._isRememberMe = rememberMe;
    }

    public keyExist: () => boolean = (): boolean => !!this.select();

    public setexpiredTime(date: any): void {
        Encryption.storage.setItem(this._expiredTimekey, Encryption.enCrypt(date));
    }

    public getExpiredTime(): any {
        const date: any = Encryption.storage.getItem(this._expiredTimekey);
        if (date) {
            return Encryption.deCrypt(date);
        }

        return false;
    }

    public newUserinsert(user: any): void {
        Encryption.storage.setItem(this.newUserNotReady, Encryption.enCrypt(user));
    }
    public deleteNewUser(): void {
        Encryption.storage.removeItem(this.newUserNotReady);

    }
    public getNewUser(): any {
        const selectedItem = Encryption.storage.getItem(this.newUserNotReady);
        if (!!selectedItem) {
            return Encryption.deCrypt(selectedItem);
        } else
            return _._;
    }
    public getTicketView(): any {
        const selectedItem = Encryption.storage.getItem(this._ticketView);
        if (!!selectedItem) {
            return Encryption.deCrypt(selectedItem);
        } else
            return !!1;
    }
    public setTicketView(ticketView: boolean): void {
        Encryption.storage.setItem(this._ticketView, Encryption.enCrypt(ticketView));
    }
    public getSortBy(): string {
        const selectedItem = Encryption.storage.getItem(this._SortBy);
        if (!!selectedItem) {
            return Encryption.deCrypt(selectedItem);
        } else
            return 'new_created';
    }
    public setSortBy(ticketView: string): void {
        Encryption.storage.setItem(this._SortBy, Encryption.enCrypt(ticketView));
    }
    public insert(user: any): void {
        if (user && user.step && typeof user.step === 'string') {
            user.step = (JSON as any).parse(user.step);
        }

        if (!this._userId || this._userId && this._userId !== user.id)
            this.id(user.id, !!1);
        if (!this.keyExist()) {
            Encryption.storage.setItem(this.key, Encryption.enCrypt(user));
            this.userLogedKey = this.key;

            this._user = user;
        }
    }

    public select(): any {
        let selectedItem: any;

        if (!_.empty(this._user)) {
            selectedItem = Encryption.storage.getItem(this.key);
            if (!!selectedItem) {
                this.userLogedKey = this.key;
                this._user = Encryption.deCrypt(selectedItem);
            } else
                return _._;
        }

        return this._user;
    }

    public updateUserData(id: number, user: any): any {
        if (!this.userLogedKey) {
            this.getLoggedUser();
            this.userLogedKey = this.key;
        }
        Encryption.storage.setItem(this.userLogedKey, Encryption.enCrypt(user));

        this._user = user;
    }

    public update(user?: any, checked?: boolean): void {
        if (user && this.keyExist())
            Encryption.storage.setItem(this.key, Encryption.enCrypt(user));
        else if (checked)
            Encryption.storage.setItem(this.key, Encryption.enCrypt(this._user));
    }

    public id(id: number, insert?: boolean): any {
        if (this._userId !== id) {
            this._userId = id;
            this.key = ('' + id) as string;

            if (insert) {
                this._user = {};
                return !!0;
            } else {
                this.select();
            }
        }

        return this;
    }

    public deleteUser(): void {
        if (this.keyExist()) {
            Encryption.storage.removeItem(this.key);
        }

    }

    public deleteProperty(propertyName: string): void {
        if (this.keyExist() && this._user.hasOwnProperty(propertyName)) {
            delete this._user[propertyName];
            this.update(!!0, !!1);
        }
    }

    public updateProperty(propertyName: string, data: any): void {
        if (this.keyExist() && this._user.hasOwnProperty(propertyName)) {
            this._user[propertyName] = data;
            this.update(!!0, !!1);
        }
    }

    public insertProperty(propertyName: string, data: any): void {
        if (this.keyExist()) {
            this._user[propertyName] = data;
            this.update(!!0, !!1);
        }
    }

    public getProperty(propertyName: string): any {
        if (this.keyExist() && this._user.hasOwnProperty(propertyName))
            return this._user[propertyName];
        else
            return !!0;
    }

    public saveToken(token: string, time: string, companyUrl: string): void {
        if (token) {
            this.cookieArgs.expires = time;

            if ((window as any).production_mode)
                this.cookieArgs.domain = GlobalVariables.DOMAIN_NAME;

            this.cookieService.put(this.expiredKey, Encryption.enCrypt(token), this.cookieArgs);
        }
    }

    public setCookiAfterReg(): any {
        if ((window as any).production_mode)
            this.cookieArgs.domain = GlobalVariables.DOMAIN_NAME;
        this.cookieService.put('newreg', 'newreg', this.cookieArgs);
    }

    public deleteCookiAfterReg(): any {
        this.cookieArgs.domain = GlobalVariables.DOMAIN_NAME;
        this.cookieService.remove('newreg', this.cookieArgs);
    }

    public getCookiAfterReg(): any {
        const existKey: string = this.cookieService.get('newreg');

        if (!!existKey) {
            return !!1;
        } else {
            return !!0;
        }
    }

    public getToken(): string {
        const existKey: string = this.cookieService.get(this.expiredKey);

        if (!!existKey)
            return Encryption.deCrypt(existKey);
        else
            return _._;
    }

    public setAuthTokenExpTime(time: string): void {
        this.cookieArgs.domain = GlobalVariables.DOMAIN_NAME;
        this.cookieArgs.expires = time;
        this.cookieService.put(this.expiredKey, '', this.cookieArgs);
    }

    public getAuthTokenExpTime(): boolean {
        const existKey: string = this.cookieService.get(this.expiredKey);

        if (!!existKey && this.userAuthotization)
            return !!1;
        else
            return !!0;
    }

    public updateAuthTokenExpTime(rememberMe?: boolean): void {

    }

    public setLoggedUserId(id: number): void {
        if (!this.getLoggedUserId()) {
            Encryption.storage.setItem(this.loggedUserIdKey, Encryption.enCrypt(id));
        }
    }

    public getLoggedUserId(): number {
        const existKey: string = Encryption.storage.getItem(this.loggedUserIdKey);

        if (!!existKey)
            return +Encryption.deCrypt(existKey);
        else
            return 0;
    }

    public getLoggedUser(): any {
        let user: any;
        const existUserIdKey: number = this.getLoggedUserId();
        if (existUserIdKey) {
            this._userId = existUserIdKey;
            this.key = ('' + existUserIdKey) as string;
            user = this.select();
        }

        return user;
    }

    public isLogged(): boolean {
        return this.getAuthTokenExpTime() as boolean;
    }

    public extractData: any = (res: HttpResponse<any>): any => {
        const body: any = res.body;
        let  companyUrl: string;

        if (_.empty(body.data)) {
            // body.data = Encryption.deCrypt(body.data);
            companyUrl = body.data.company_url;
            this._expiredKey = companyUrl;
            if (!this.getExpiredTime()) {
                this.setexpiredTime((new Date()).getTime());
            }

            if (res.headers.get('authorization')) {
                this.saveToken(res.headers.get('authorization'), GlobalServices.expiredTime(this.isRememberMe), companyUrl);
                this.setLoggedUserId(body.data.id);
            }
            this.setCompanyUrl(companyUrl);
        }

        return body || {};
    }
    public setUser(data: any): void {
        this._expiredKey = data.company_url;
        if (!this.getExpiredTime()) {
            this.setexpiredTime((new Date()).getTime());
        }
        this.setLoggedUserId(data.id);
        this.setCompanyUrl(data.company_url);
        this.saveToken(data.authorization, GlobalServices.expiredTime(this.isRememberMe), data.company_url);
    }

    public deCrypt: any = (res: string): any => {

        return Encryption.deCrypt(res);
    }

    public dataExtract: any = (res: HttpResponse<any>): any => {
        const body: any = res;
        if (_.empty(body.data)) {
            body.data = body.data;
        }

        return body || {};
    }

    public handleError: any = (error: HttpErrorResponse): any => {

        return this.errs.handleError(error);
    }

    public updateToken: any = (data: HttpResponse<any>): any => {

        const existKey: string = this.cookieService.get(this.expiredKey);
        const body: any = data;
        let token: string,
            updatedUser: any = {};

        if (!!existKey && _.empty(body)) {
            token = data.headers.get('authorization');

            if (body.success && !!token) {
                this.cookieArgs.domain = GlobalVariables.DOMAIN_NAME;
                this.cookieArgs.expires = GlobalServices.expiredTime(this.isRememberMe);

                this.cookieService.put(this.expiredKey, Encryption.enCrypt(token), this.cookieArgs);

                // updatedUser = Encryption.deCrypt(body.data);
                updatedUser = body.data;
            }
        }

        return updatedUser;
    }

    public logoutUser: () => void  = (): void => {
        (window as any).localStorage.clear();
        this.permissionGranted(this.getToken());
        this.cookieArgs.domain = GlobalVariables.DOMAIN_NAME;
        this.cookieService.remove(this.expiredKey, this.cookieArgs);
        this.cookieService.remove(this._company, this.cookieArgs);
        this.cookieService.remove('newreg', this.cookieArgs);
    };

    public buildApplicationServerKey() {
        const base64 = 'BE8PyI95I_jBIfb_LTS_nkUJnOwjLP2zAaGBSFEi3jmFJ3l5ox7-NtNqrVuyPL4Qmt4UxDI-YgwYI1sEMIpoU90=';
        const rfc4648 = base64.replace(/-/g, '+').replace(/_/g, '/');
        const characters = atob(rfc4648).split('').map(character => character.charCodeAt(0));
        return new Uint8Array(characters);
    }

    public permissionGranted(token: any) {
        const userdata: any = this.getLoggedUser();
        if (userdata) {
            const self = this;
            const sender: any = {
                clieantId: userdata.id,
                userRoom: '/' + userdata.company_url,
            };

            navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
                serviceWorkerRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: self.buildApplicationServerKey(),
                })
                    .then((subscription) => {
                        sender.type = 'delete';
                        sender.senderBrowserData = subscription;
                        // self.setNotificationAccses(sender, token);
                        Encryption.storage.clear();
                    });
            });
        }

    }

    // public setNotificationAccses(data: any, token: any): Promise<any> {
    //     const url: string = GlobalVariables.BACKEND_API_URL + '/test';
    //
    //     return this.http.post(url, data, GlobalServices.AuthHeader(token))
    //         .toPromise()
    //         .then()
    //         .catch();
    // }
    public dataCompile: (data: any) => any  = (data: any): any => data;

    public deleteToken: (data: any) => void = (): void => this.cookieService.remove(this.expiredKey);

    private setCompanyUrl(name: string) {
        let companys: Array<string> = [];
        const  existKey: string = this.cookieService.get(this._company),
            existDomain: boolean = !!0;

        if (!!existKey) {
            companys = JSON.parse(existKey);

            if (existKey.length > 0) {
                companys.forEach((value: string): void => {

                    if (value === name)
                        existDomain === !!1;
                });
            }
        } else {
            companys = [];
        }

        if (!existDomain) {
            companys.push(name);
            this.cookieService.put(this._company, JSON.stringify(companys), this.cookieArgs);
        }
    }
}
