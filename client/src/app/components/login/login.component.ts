import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../services/components/users.service';
import {ValidationService} from '../../services/helpers/validation.service';
import {UsersModel} from '../../models/components/users.model';
import {GlobalServices} from '../../services/helpers/global.service';
import {_} from '../../services/helpers/helper.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {IntegrationService} from '../../services/integration/integration.service';
import { environment } from '../../../environments/environment';

@Component({
    templateUrl: '../../html/login/login.component.html',
})

export class LoginComponent implements OnInit {

    public addpadding: boolean = !!0;
    public clickChange: boolean = !!0;
    public showView: boolean = !!0;
    public formSubmit: boolean = !!0;
    public subdomain: string = '';

    public loginStep: number = 1;
    private _userFormErrors: any = {
        email: {
            verify: !!0,
            text: _._,
        },
        password: {
            verify: !!0,
            text: _._,
        },
        company_url: {
            verify: !!0,
            text: _._,
        },
    };

    private userValidation: any = {
        email: [
            _._,
            [
                Validators.required,
                ValidationService.emailValidator,
                Validators.minLength(6),
            ],
        ],
        password: [
            _._,
            [
                Validators.required,
                ValidationService.dontSpace,
                Validators.minLength(6),
            ],
        ],
        company_url: [
            this.subdomain,
            [
                Validators.required,
                ValidationService.dbValidator,
                Validators.minLength(3),
            ],
        ],
    };

    @Input()
    public isRememberMe: boolean = !!0;

    @Input()
    public userForm: any;

    /**
     * get login errors from server
     * @returns {any}
     */
    public get userFormErrors(): any {
        return this._userFormErrors;
    }

    /**
     * set login errors from server
     * @param currentErrors
     */
    public set userFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                if (currentErrors.hasOwnProperty(key) && this._userFormErrors.hasOwnProperty(key)) {
                    this._userFormErrors[key].verify = !!1;
                    this._userFormErrors[key].text = currentErrors[key];
                }
            }
        }
    }

    /**
     * check validation after submit
     */
    @Input()
    public login(): void {
        this.userForm.submitted = !!1;
        if (this.userForm.dirty && this.userForm.valid)
            this.loginUser();
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.userForm.controls[param].valid && this.userForm.controls[param].touched && this.userForm.submitted) ||
            (!this.userForm.controls[param].valid && this.userForm.submitted)) {
            this.addpadding = !!1;
            return !!1;
        } else if (this.userFormErrors[param].verify && this.userForm.submitted) {
            return !!1;
        } else {
            this.addpadding = !!0;
            return !!0;
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.userForm.controls[param].valid && this.userForm.controls[param].touched;
    }

    @Input()
    public verifyTwinsError(param: string, value: string): void {
        if (_.empty(this.userFormErrors[param].text)) {
            if (this.userFormErrors[param].text === value) {
                this.userFormErrors[param].verify = !!1;
            } else {
                this.userFormErrors[param].verify = !!0;
            }
        }
    }

    constructor(private router: Router,
                private usersService: UsersService,
                private titleService: Title,
                private formBuilder: FormBuilder,
                private mailboxModel: MailBoxModel,
                private userModel: UsersModel,
                private integrationService: IntegrationService) {

    }

    public ngOnInit(): void {
        this.titleService.setTitle('Birddesk: Login');
        this.userForm = this.formBuilder.group(this.userValidation);
        if ((window as any).location.host.split('.').length > environment.domainSplicCount && (window as any).location.host.split('.')[0] !== 'login') {
            this.subdomain = (window as any).location.host.split('.')[0];
            // this.usersService.checkExistCompany(this.subdomain + '?login=""').then((result: any): void => {
            //     if (result.success) {
            //         this.loginStep = 2;
            //     }
            this.showView = !!1;
            //
            // });
        }else{
            this.showView = !!1;
        }
    }

    private loginUser(): void {
        const locationPaths: Array<string> = (window as any).location.host.split('.');
        this.userModel.userAuthotization = !!0;
        this.formSubmit = !!1;
        this.userForm.value.company_url = this.subdomain.toLowerCase();
        this.usersService.loginUser(this.userForm.value, this.isRememberMe)
            .then((data: any) => {
                if (!data.success) {
                    this.userFormErrors = data.errors;
                } else {
                    this.mailboxModel.insertMailboxId(data.data.mailbox_id || 0);
                    if (!data.data.step && data.data.role_id === 2) {
                        this.userModel.setCookiAfterReg();
                    }
                    // this.integrationService.login({user: data.data});

                    if (locationPaths[0] === data.data.company_url) {
                        this.userModel.userAuthotization = !!1;
                        this.userModel.insert(data.data);
                        this.router.navigate(['/tickets']);
                    } else {
                        (window as any).location.href = GlobalServices.getCompanyUrl(data.data.company_url);
                    }
                }
                this.formSubmit = !!0;
            });
    }

    /**
     * remember user after login
     */
    public rememberMe(): void {
        this.isRememberMe = !!(+this.isRememberMe - 1);
    }

    public goBack(): void {
        this.loginStep =  this.loginStep - 1;
        if (this.loginStep < 1 ){
            this.router.navigate(['/']);
        }
    }

    /**
     * redirect to forget Password
     */
    public toForgetPassword(): void{
        const hostname: string = environment.domain.replace('[subdomain]', this.subdomain);
        if (location.origin !== hostname){
            (window as any).location = `${hostname}/email-forget-password`;
        }else{
            this.router.navigate(['/email-forget-password']);
        }

    }
}
