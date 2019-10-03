import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {CookieService} from '../../services/cookie/cookies.service';
import {ErrorService} from '../../services/components/error.service';

@Injectable()
export class InboxDataModel extends Encryption {

    private _key: string = '/inboxData';
    private _inboxData: any = [];

    private get key(): string {
        return this._key;
    }

    public keyExist: () => boolean = (): boolean => !!this.select();

    constructor(private cookieService: CookieService,
                private errs: ErrorService) {
        super();
    }

    public select(): any {
        let selectedItem: any;

        selectedItem = Encryption.storage.getItem(this.key);
        if (!!selectedItem)
            this._inboxData = Encryption.deCrypt(selectedItem);
        else
            return _._;

        return this._inboxData;
    }

    public insert(inboxData: any): void {
        if (!this.keyExist()) {
            Encryption.storage.setItem(this.key, Encryption.enCrypt(inboxData));
            this._inboxData = inboxData;
        }
    }

    public update(inboxData: any, mailboxID: number): any {
        this._inboxData[mailboxID] = inboxData;

        return Encryption.storage.setItem(this.key, Encryption.enCrypt(this._inboxData));
    }

    public deleteProperty(propertyName: string): void {

    }

    public updateProperty(propertyName: string, data: any): void {

    }

    public insertProperty(propertyName: string, data: any): void {

    }

    public getProperty(propertyName: string): any {

    }

    public id(id: number): any {

    }

    public extractData: any = (res: HttpResponse<any>): any => {
        const body: any = res;
        if (_.empty(body.data))
            body.data = Encryption.deCrypt(body.data);

        return body || {};
    }

    public handleError: any = (error: HttpResponse<any>): any => {

        return this.errs.handleError(error);

    }

    public dataCompile: (data: any) => string = (data: any): string => Encryption.enCrypt(data).toString();
}