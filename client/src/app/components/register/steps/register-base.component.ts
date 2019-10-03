import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../../services/components/users.service';
import {Title} from '@angular/platform-browser';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersModel} from '../../../models/components/users.model';
import {User} from '../../../modules/dto/user';
import {ToastrService} from '../../../modules/toastr';
import {_} from '../../../services/helpers/helper.service';
import {ValidationService} from '../../../services/helpers/validation.service';
import {GlobalServices} from '../../../services/helpers/global.service';

@Component({
    selector: 'register-base',
    template: '',
})

export class RegisterBaseComponent  {
    public buttonpadding: boolean = !!0;
    public registrationLoader: boolean = !!0;
    public userForm: any;


    public defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;
    /**
     * get user registration errors from server
     * @returns {any}
     */
    public get userFormErrors(): any {
        return this._userFormErrors;
    }

    /**
     * set user registration errors from server
     * @param currentErrors
     */
    public set userFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                if (currentErrors.hasOwnProperty(key) && this._userFormErrors.hasOwnProperty(key)) {
                    this._userFormErrors[key].verify = !!1;
                    if (typeof currentErrors[key] === 'string') {
                        this._userFormErrors[key].text = currentErrors[key];
                    } else {
                        this._userFormErrors[key].text = currentErrors[key][0];
                    }
                }
            }
        }
    }
    private _userFormErrors: any = {
        full_name: {
            verify: !!0,
            text: _._,
        },
        demo_mailbox_name: {
            verify: !!0,
            text: _._,
        },
        first_name: {
            verify: !!0,
            text: _._,
        },
        last_name: {
            verify: !!0,
            text: _._,
        },
        password: {
            verify: !!0,
            text: _._,
        },
        mailbox_name: {
            verify: !!0,
            text: _._,
        },
        mailbox_email: {
            verify: !!0,
            text: _._,
        },
        email: {
            verify: !!0,
            text: _._,
        },
        company_url: {
            verify: !!0,
            text: _._,
        },
        company_name: {
            verify: !!0,
            text: _._,
        },
    };

    public userValidation: any = {
        full_name: [
            _._,
            [
                Validators.required,
                ValidationService.fullNameValidator,
                Validators.minLength(3),
            ],
        ],
        password: [
            _._,
            [
                Validators.required,
                ValidationService.passwordValidator,
                Validators.minLength(6),
            ],
        ],
        email: [
            _._,
            [
                Validators.required,
                ValidationService.emailValidator,
                Validators.minLength(6),
            ],
        ],
        company_name: [
            _._,
            [
                Validators.required,
                Validators.minLength(3),
            ],
        ],
    };

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.userForm.controls[param].valid && this.userForm.controls[param].touched && this.userForm.submitted) ||
            (!this.userForm.controls[param].valid && this.userForm.submitted)) {
            this.buttonpadding = !!1;
            return !!1;
        } else if (this.userFormErrors[param].verify && this.userForm.submitted) {
            return !!1;
        } else if (!this.userFormErrors[param].valid && this.userForm.controls[param].submitted) {
            return !!1;
        } else {
            this.buttonpadding = !!0;
            return !!0;
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.userForm.controls[param].valid && this.userForm.controls[param].touched;
    }

    @Input()
    public verifyTwinsError(param: string, value: string) {
        if (_.empty(this.userFormErrors[param].text)) {
            if (this.userFormErrors[param].text === value)
                this.userFormErrors[param].verify = !!1;
            else
                this.userFormErrors[param].verify = !!0;
        }
    }
    constructor(
        public router: Router,
        public usersService: UsersService,
        public titleService: Title,
        public mailboxModel: MailBoxModel,
        public formBuilder: FormBuilder,
        public userModel: UsersModel,
        public user: User,
        public toastr: ToastrService,
    ) {
        this.titleService.setTitle('Birddesk: Register');
    }
    public saveData(step?: number): void{
        this.userModel.newUserinsert(
            {
                user: this.usersService.stepsData,
                steps: step ,
            });
    }
    public saveRegistration(): void {
        this.registrationLoader = !!1;
        // const locationPaths: Array<string> = (window as any).location.host.split('.');
        // this.userModel.setUser(this.usersService.stepsData.userRegistrationData);
        // this.userModel.deleteNewUser();
        // this.userModel.setCookiAfterReg();
        // // this.integrationService.register({user: data.data});
        //
        // if (locationPaths[0] === this.usersService.stepsData.userRegistrationData.company_url) {
        //     this.userModel.userAuthotization = !!1;
        //     this.mailboxModel.insertMailboxId(this.usersService.stepsData.userRegistrationData.mailbox_id || 1);
        //     this.userModel.insert(this.usersService.stepsData.userRegistrationData.data);
        //     this.user.step = !!1;
        //     this.router.navigate(['/ticket']);
        // } else {
        //     (window as any).location.href = GlobalServices.getCompanyUrl(this.usersService.stepsData.userRegistrationData.company_url);
        // }
        this.splitFullName();
        // this.usersService.stepsData.company_url = this.userForm.value.company_url;
        const locationPaths: Array<string> = (window as any).location.host.split('.');
        this.userModel.userAuthotization = !!0;
        delete this.usersService.stepsData.full_name;
        this.usersService.registerUser(this.usersService.stepsData)
            .then((data: any) => {
                this.registrationLoader = !!0;

                if (!data.success) {
                    this.userFormErrors = data.errors;
                } else {
                    this.userModel.deleteNewUser();
                    this.userModel.setCookiAfterReg();
                    // this.integrationService.register({user: data.data});

                    if (locationPaths[0] === data.data.company_url) {
                        this.userModel.userAuthotization = !!1;
                        this.mailboxModel.insertMailboxId(data.data.mailbox_id || 1);
                        this.userModel.insert(data.data);
                        this.user.step = !!1;
                        this.router.navigate(['/ticket']);
                    } else {
                        (window as any).location.href = GlobalServices.getCompanyUrl(data.data.company_url);
                    }
                }
            });
    }
    public splitFullName(): void {
        let userFullName: Array<string>;
        if (this.usersService.stepsData.full_name) {
            this.usersService.stepsData.last_name = '';
            this.usersService.stepsData.first_name = '';
            userFullName = this.usersService.stepsData.full_name.split(' ');

            userFullName.forEach((value: string, index: number): void => {
                if (!index) {
                    this.usersService.stepsData.first_name = value;
                } else {
                    if (!this.usersService.stepsData.last_name)
                        this.usersService.stepsData.last_name = '';

                    this.usersService.stepsData.last_name +=  value;
                }
            });
        }

    }
}
