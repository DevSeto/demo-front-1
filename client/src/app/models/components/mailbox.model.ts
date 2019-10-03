import {Injectable} from '@angular/core';
import {MailBoxInterface} from '../../interfaces/components/mailbox.interface';
import {CookieService} from '../../services/cookie/cookies.service';
import {ErrorService} from '../../services/components/error.service';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class MailBoxModel extends Encryption implements MailBoxInterface {

    private readonly _expiredKey: string = 'mailbox_exp-expiredAt';

    private _key: string = '/mailbox/';
    private _keyMailboxId: string = 'curentMailbox';
    private _keyStatus: string = 'curentStatus';
    private _mailboxId: number = 1;
    private _mailbox: any = {};
    private _currentMailbox: any = {};

    private set key(id: string) {
        this._mailbox += id;
    }

    public keyExist: any = (): boolean => !!this.select();

    private get expiredKey(): string {
        return Encryption.keyEnCrypt(this._expiredKey);
    }

    constructor(private cookieService: CookieService,
                private errs: ErrorService) {
        super();
        this.getMailboxCurrentId();
    }

    public select(getAll?: boolean) {
        let selectedItem: any = Encryption.storage.getItem(this.getKey());

        if (selectedItem) {
            selectedItem = Encryption.deCrypt(selectedItem);

            if (getAll) {
                this._mailbox = selectedItem;
            } else {
                selectedItem.forEach((mailbox: any): void => {

                    if (mailbox.id === this._mailboxId)
                        this._mailbox = mailbox;
                });
            }

            return this._mailbox;
        }

        return _._;
    }

    private getKey(id?: number): string {
        return this._key;
    }

    public insert(mailbox: any) {
        Encryption.storage.setItem(this.getKey(), Encryption.enCrypt(mailbox));
    }

    public setCurrentStatus(status: string) {
        Encryption.storage.setItem(this._keyStatus, status);
    }

    public getCurrentStatus() {
        return Encryption.storage.getItem(this._keyStatus);
    }

    public insertMailboxId(mailbox: any) {
        Encryption.storage.setItem(this._keyMailboxId, Encryption.enCrypt(mailbox));
    }

    public getMailboxCurrentId() {
        const selectedItem: any = Encryption.storage.getItem(this._keyMailboxId);
        if (!selectedItem) {
            return false;
        }

        this._mailboxId = Encryption.deCrypt(selectedItem);
        return Encryption.deCrypt(selectedItem);
    }

    public delete(id: number) {
        const allMailbox: any = Encryption.deCrypt(Encryption.storage.getItem(this.getKey()));

        allMailbox.forEach((mailbox: any, index: number) => {
            if (mailbox.id === id)
                allMailbox.splice(index, 1);
        });

        Encryption.storage.setItem(this.getKey(), Encryption.enCrypt(allMailbox));
        return allMailbox;
    }

    public update(data?: any, checked?: boolean) {
        let existMailbox: Array<any> = this.select(!!1);

        if (!existMailbox)
            existMailbox = [];

        if (data)
            existMailbox.push(data);

        Encryption.storage.setItem(this._key, Encryption.enCrypt(existMailbox));

        return existMailbox;
    }

    public updateDefoult(data?: any) {
        let existMailbox: Array<any> = this.select(!!1);

        if (!existMailbox)
            existMailbox = [];
        if (data) {
            existMailbox.forEach((mailbox: any, index: number) => {
                existMailbox[index].name = data.name;
            });
        }

        Encryption.storage.setItem(this._key, Encryption.enCrypt(existMailbox));

        return existMailbox;
    }

    public updateMailboxData(mailboxdata: any, id: any) {
        const allMailbox: any = Encryption.deCrypt(Encryption.storage.getItem(this.getKey()));

        allMailbox.forEach((mailbox: any, index: number) => {
            if (mailbox.id === id)
                allMailbox[index] = mailboxdata;
        });
        Encryption.storage.setItem(this.getKey(), Encryption.enCrypt(allMailbox));
        return allMailbox;
    }

    public deleteProperty(propertyName: string): void {

        if (this.keyExist() && this._mailbox.hasOwnProperty(propertyName)) {
            delete this._mailbox[propertyName];
            this.update(!!0, !!1);
        }
    }

    public updateProperty(propertyName: string, data: any): void {
        if (this.keyExist() && this._mailbox.hasOwnProperty(propertyName)) {
            this._mailbox[propertyName] = data;
            this.update(!!0, !!1);
        }
    }

    public insertProperty(propertyName: string, data: any): void {
        if (this.keyExist()) {
            this._mailbox[propertyName] = data;
            this.update(!!0, !!1);
        }
    }

    public getProperty(propertyName: string): any {
        if (this.keyExist() && this._mailbox.hasOwnProperty(propertyName))
            return this._mailbox[propertyName];
    }

    public  id(id: number, insert?: boolean): any {
        if (this._mailboxId !== id) {
            this._mailboxId = id;

            this._mailbox = {};

            if (insert) {
                return !!0;
            } else {
                this.select();
            }
        }

        return this;
    }

    public get currentMailbox(): any {
        const mailboxData: any = this.select(!!1);
        mailboxData.forEach((mailbox: any, index: number) => {
            if (mailbox.current && mailbox.current === !!1) {
                return mailbox;
            }
        });

        return this.select();
    }

    public extractData: any = (res: HttpResponse<any>): any => {
        const body: any = res;

        // if (_.empty(body.data))
        //     body.data = Encryption.deCrypt(body.data);

        return body || {};
    }
    public handleError: any = (error: HttpResponse<any>): any => {

        return this.errs.handleError(error);

    }
    public dataCompile: any = (data: any): any => data;

}
