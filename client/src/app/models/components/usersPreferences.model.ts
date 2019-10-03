import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {CookieService} from '../../services/cookie/cookies.service';
import {ErrorService} from '../../services/components/error.service';

@Injectable()
export class UsersPreferencesModel extends Encryption {

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private errs: ErrorService) {
        super();
    }

    private _userPreferencesKey: string = 'userPreferences';
    private _userPreferences: any;
    private _styleKey: string = 'stylekey';

    public set userPreferences(data: any) {
        this._userPreferences = data;
    }

    public get userPreferences() {
        return this._userPreferences;
    }

    public keyExist: any = (): boolean => !!this.select();

    private get key(): string {
        return this._userPreferencesKey;
    }
    public getStyleKey(): string {
        var selectedItem = Encryption.storage.getItem(this._styleKey);
        if(!selectedItem){
            selectedItem = this.insertStyleKey('');
        }
        return selectedItem;
    }
    public insertStyleKey(stylekey: string): string {
        Encryption.storage.setItem(this._styleKey, stylekey);
        return stylekey;
    }

    public insert(userPreferencesKey: any): void {
        if (!this.keyExist()) {
            Encryption.storage.setItem(this.key, Encryption.enCrypt(userPreferencesKey));
            this.userPreferences = userPreferencesKey;
        }
    }

    public select(newData?: boolean): any {
        let selectedItem: any;

        if (!_.empty(this.userPreferences) || newData) {
            selectedItem = Encryption.storage.getItem(this.key);

            if (!!selectedItem) {
                this.userPreferences = Encryption.deCrypt(selectedItem);
            } else
                return _._;
        }

        return this.userPreferences;
    }

    public update(userPreferences?: any, checked?: boolean): void {
        if (userPreferences) {
            Encryption.storage.setItem(this.key, Encryption.enCrypt(userPreferences));
            this.userPreferences = userPreferences;
        }

        this.select();
    }

    public dataExtract: any = (res: HttpResponse<any>): any => {
        const body: any = res;

        if (_.empty(body.data)) {
            // body.data = Encryption.deCrypt(body.data);
            this.insert(body.data);
        }

        return body || {};
    }
}