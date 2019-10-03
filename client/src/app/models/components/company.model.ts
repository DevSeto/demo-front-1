import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {CookieService} from '../../services/cookie/cookies.service';
import {ErrorService} from '../../services/components/error.service';
import {Company} from '../../modules/dto/company/dto/company.dto';

@Injectable()
export class CompanyStorageModel extends Encryption {

    private _key: string = '/company';

    private get key(): string {
        return this._key;
    }

    public keyExist: any = (): boolean => !!this.select();

    constructor(private cookieService: CookieService,
                public company: Company,
                private errs: ErrorService) {
        super();
    }

    public select(): any {
        let selectedItem: any;

        selectedItem = Encryption.storage.getItem(this.key);
        if (!!selectedItem)
            this.company = Encryption.deCrypt(selectedItem);
        else
            return _._;

        return this.company;
    }

    public insert(value: any): void {
        Encryption.storage.setItem(this.key, Encryption.enCrypt(value));
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
        // if (_.empty(body.data))
            // body.data = body.data;

        return body || {};
    }

    public handleError: any = (error: HttpResponse<any>): any => {

        return this.errs.handleError(error);

    }

    public dataCompile: any = (data: any): any => data;
}