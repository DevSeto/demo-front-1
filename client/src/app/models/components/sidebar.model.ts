import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {CookieService} from '../../services/cookie/cookies.service';
import {ErrorService} from '../../services/components/error.service';

@Injectable()
export class SidebarModel extends Encryption {

    private _key: string = '/sidebar';
    private _openedSections: any = [];

    private get key(): string {
        return this._key;
    }

    public keyExist: any = (): boolean => !!this.select();

    constructor(private cookieService: CookieService,
                private errs: ErrorService) {
        super();
    }

    public select(): any {
        let selectedItem: any;

        selectedItem = Encryption.storage.getItem(this.key);
        if (!!selectedItem)
            this._openedSections = Encryption.deCrypt(selectedItem);
        else
            return _._;

        return this._openedSections;
    }

    public insert(value: any): void {
        if (!this.keyExist()) {
            Encryption.storage.setItem(this.key, Encryption.enCrypt(value));
            this._openedSections = value;
        }
    }

    public update(value: any): any {

        return Encryption.storage.setItem(this.key, Encryption.enCrypt(value));
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

    public dataCompile: (data: any) => string  = (data: any): string => Encryption.enCrypt(data).toString();
}