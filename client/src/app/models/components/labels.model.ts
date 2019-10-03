import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {LabelsInterface} from '../../interfaces/components/labels.interface';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {CookieService} from '../../services/cookie/cookies.service';
import {ErrorService} from '../../services/components/error.service';

@Injectable()
export class LabelsModel extends Encryption implements LabelsInterface {

    private _key: string = '/labels';
    private _keyDrop: string = '/labelDrop';
    private _labels: any = {};
    private _labelDrop: any = {};

    private get key(): string {
        return Encryption.keyEnCrypt(this._key);
    }

    private get keyDrop(): string {
        return this._keyDrop;
    }

    public keyExist: any = (): boolean => !!this.select();
    public keyExistDrop: any = (): boolean => !!this.selectDrop();

    constructor(private cookieService: CookieService,
                private errs: ErrorService) {
        super();
    }

    public select(): any {
        let selectedItem: any;

        selectedItem = Encryption.storage.getItem(this.key);

        if (!!selectedItem) {
            this._labels = Encryption.deCrypt(selectedItem);
        }
        else
            return _._;

        return this._labels;
    }

    public selectDrop(): any {
        let selectedItem: any;

        selectedItem = Encryption.storage.getItem(this.keyDrop);

        if (!!selectedItem)
            this._labelDrop = Encryption.deCrypt(selectedItem);
        else
            return _._;

        return this._labelDrop;
    }

    public insert(labels: any): void {
        Encryption.storage.setItem(this.key, Encryption.enCrypt(labels));
        this._labels = labels;
    }

    public insertDrop(value: any): void {
        if (!this.keyExistDrop()) {
            Encryption.storage.setItem(this.keyDrop, Encryption.enCrypt(value));
            this._labelDrop = value;
        }
    }

    public update(label: any): any {
        let existLabels: Array<any> = this.select();

        if (!existLabels)
            existLabels = [];

        existLabels.push(label);
        Encryption.storage.setItem(this.key, Encryption.enCrypt(existLabels));

        return existLabels;
    }

    public updateDrop(value: any): any {

        return Encryption.storage.setItem(this.keyDrop, Encryption.enCrypt(value));
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
            body.data = body.data;

        return body || {};
    }

    public handleError: any = (error: HttpResponse<any>): any => {

        return this.errs.handleError(error);

    }

    public dataCompile: (data: any) => any = (data: any): string => data;
}