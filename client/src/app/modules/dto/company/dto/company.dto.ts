import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {CompanyInterface} from '../interfaces/company.interface';

@Injectable()
export class Company extends CompanyModel implements CompanyInterface {

    public company_name: string = '';
    public country: string = '';
    public created_at: string = '';
    public deleted_at: string = '';
    public id: string = '';
    public logo: string = '';
    public logo_full_path: string = '../../../../../public/images/user-default-img.png';
    public phone: string|number = '';
    public subdomain: string = '';
    public timezone: string|number = '0';
    public timezone_offset: string = '';
    public updated_at: string = '';
    public website: string = '';
    public country_code: string|number = '';
    public flag: string = '';
}