import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {_} from '../../services/helpers/helper.service';
import {UsersService} from '../../services/components/users.service';
import {ToastrService} from '../../modules/toastr';
import {CompanyStorageModel} from '../../models/components/company.model';
import {SocketService} from '../../services/components/socket.service';

@Component({
    selector: 'company-profile',
    templateUrl: '../../html/company-profile/company-profile.component.html',
})

export class CompanyProfileComponent implements OnInit {

    public cloud: any = showed;
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public uploadedFiles: any = [];
    public readonly timeZonesCount: number = 24;
    public companyProfileForm: any;

    public companyAvatar: any = {
        updated: !!0,
        url: '',
        file: {},
    };

    public countries: Array<any> = [];
    public currentUserTimezone: any;
    public _companyProfileFormErrors: any = {
        company_name: {
            verify: !!0,
            text: _._,
        },
        website: {
            verify: !!0,
            text: _._,
        },
        country: {
            verify: !!0,
            text: _._,
        },
        phone: {
            verify: !!0,
            text: _._,
        },
        timezone: {
            verify: !!0,
            text: 0,
        },
    };

    public companyValidation: any = {
        company_name: [
            this.usersService.company.company_name,
            [
                Validators.required,
                Validators.minLength(3),
            ],
        ],
        website: [
            this.usersService.company.website,
            [
                Validators.minLength(6),
            ],
        ],
        country: [
            this.usersService.company.country,
            [],
        ],
        phone: [
            this.usersService.company.phone,
            [
                Validators.minLength(6),
            ],
        ],
        timezone: [
            this.usersService.company.timezone,
            [
                Validators.required,
            ],
        ],
    };

    /**
     * get errors from server
     * @returns {any}
     */
    public get companyProfileFormErrors(): any {
        return this._companyProfileFormErrors;
    }

    /**
     * set errors from server
     * @param currentErrors
     */
    public set companyProfileFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                if (currentErrors.hasOwnProperty(key) && this._companyProfileFormErrors.hasOwnProperty(key)) {
                    this._companyProfileFormErrors[key].verify = !!1;
                    this._companyProfileFormErrors[key].text = currentErrors[key][0];
                }
            }
        }
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if (!this.companyProfileForm.controls[param].valid && this.companyProfileForm.controls[param].touched && this.companyProfileForm.submitted)
            return !!1;
        if (!this.companyProfileForm.controls[param].valid && !this.companyProfileForm.controls[param].touched && !this._companyProfileFormErrors[param].verify && this.companyProfileForm.submitted)
            return !!1;
        else if (this._companyProfileFormErrors[param].verify)
            return !!1;
        else
            return !!0;
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.companyProfileForm.controls[param].valid && this.companyProfileForm.controls[param].touched;
    }

    constructor(public socketService: SocketService,
                public usersService: UsersService,
                private companyStorageModel: CompanyStorageModel,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) {
        this.currentUserTimezone = ((new Date() as any).toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1].split(' (')[0].replace(/[A-Z]+/,'') );
        this.companyProfileForm = this.formBuilder.group(this.companyValidation);
        this.getCompanySettings();

        usersService.getCountries()
            .then((data: any): void => {
                if (data.success)
                    this.countries = data.data;
            });
    }

    public ngOnInit(): void {
    }

    public showSuccess() {
        this.toastr.success('You have successfully changed your company profile settings.', 'Success', this.defaultToastrParams);
    }

    public changeTimezone(timezone: any): void {
        console.log(timezone,this.usersService.company.timezone);
        if(!timezone){
            this.usersService.company.timezone =  this.currentUserTimezone ;
        }else{
            this.usersService.company.timezone = timezone;

        }
    }

    public onlyNumber(event: KeyboardEvent): void {
        if (!+event.key && event.key !== '0') {
            event.preventDefault();
        }
    }

    public uploadCompanyLogo(target: HTMLInputElement): void {
        const reader: FileReader = new FileReader();
        this.uploadedFiles = target.files;

        reader.onload = ( (newAvatar: ProgressEvent): void => {
            this.usersService.company.logo_full_path = (newAvatar.target as FileReader).result;
        });

        reader.readAsDataURL(this.uploadedFiles[0]);
    }

    public saveCompanyLogo(): void {
        const reader: FileReader = new FileReader();

        reader.onload = ( (newAvatar: ProgressEvent): void => {
            const formData = new FormData();
            formData.append('avatar', this.uploadedFiles[0]);

            this.usersService.updateCompanyLogo(formData)
                .then((data: any): void => {

                    if (data.success) {
                        const company = (Object as any).assign({}, this.usersService.company);
                        company.logo_full_path = data.data.logo_full_path;
                        this.usersService.company.logo_full_path = (newAvatar.target as FileReader).result;
                        this.companyStorageModel.insert(company);
                        this.uploadedFiles = [];
                    }
                });
        });

        reader.readAsDataURL(this.uploadedFiles[0]);
    }

    public getCompanySettings(): void {
        this.cloud.effect = 'showLoading';
        if (this.companyStorageModel.select()) {
            this.usersService.setCompany(this.companyStorageModel.select());
            this.cloud.effect = 'showLoading';
            this.changeTimezone(this.usersService.company.timezone)
        } else {
            this.usersService.companySettings()
                .then((data: any): void => {

                    if (data.success) {
                        this.companyStorageModel.insert(data.data);
                        this.usersService.setCompany(data.data);
                        this.changeTimezone(this.usersService.company.timezone)
                        this.cloud.effect = 'showLoading';
                    }
                });
        }
    }

    public saveCompanyChanges(): void {
        this.companyProfileForm.value.timezone_offset = this.usersService.company.timezone;
        this.companyProfileForm.value.timezone = this.usersService.company.timezone;
        this.companyProfileForm.value.country_code = this.usersService.company.country_code;
        this.companyProfileForm.value.flag = this.usersService.company.flag;
        this.companyProfileForm.value.country = this.usersService.company.country;
        this.cloud.effect = 'companyUpdateSpin';
        this.usersService.updateCompany(this.companyProfileForm.value)
            .then((data: any): void => {

                if (!data.success)
                    this._companyProfileFormErrors = data.errors;
                else {
                    this.socketService.changeCompany(data.data);
                    this.usersService.setCompany(data.data);
                    this.companyStorageModel.insert(data.data);
                    this.showSuccess();
                    this.companyProfileForm.submitted = !!0;
                }
                this.cloud.effect = 'companyUpdateSpin';
            });
    }

    public updateCompany(): void {
        const validForm: any = this.companyProfileForm.dirty && this.companyProfileForm.valid;

        if ((validForm || this.companyProfileForm.valid)  && !this.uploadedFiles.length) {
            this.saveCompanyChanges();
        } else if ((validForm || (this.companyProfileForm.valid && this.usersService.company.country)) && this.uploadedFiles.length) {
            this.saveCompanyLogo();
            this.saveCompanyChanges();
        } else if (!validForm){
            this.companyProfileForm.submitted = !!1;
            this.toastr.info('There is no update to save.', 'Info', this.defaultToastrParams);
        }
    }

    public selectCountry(idx: number): void {
        this.usersService.company.country = this.countries[idx].nicename;
        this.usersService.company.country_code = '+' + this.countries[idx].phonecode;
        this.usersService.company.flag = this.countries[idx].img;
    }
}
