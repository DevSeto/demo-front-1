import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

@Component({
    selector: 'login-check-subdomain',
    templateUrl: '../../html/login/subdomain-login.component.html',
})

export class SubdomainLoginComponent implements OnInit {

    public formSubmit: boolean = !!0;

    @Input('subdomain')
    public subDomain: string =  '';

    @Input('clickChange')
    public clickChange: boolean = !!0;
    @Output('nextStep')
    public nextStep: EventEmitter<number> = new EventEmitter<number>();
    @Output('subdomainOutput')
    public subdomainOutput: EventEmitter<string> = new EventEmitter<string>();
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

    public companyUrlFormVAlidation: any = {
    company_url: [
            this.subDomain,
            [
                Validators.required,
                ValidationService.dbValidator,
                Validators.minLength(3),
            ],
        ],
    };

    @Input()
    public companyUrlForm: any;

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
    public checkCompany(): void {
        this.companyUrlForm.submitted = !!1;
        if ( this.companyUrlForm.valid){
            this.formSubmit = !!1;
            this.usersService.checkExistCompany(this.companyUrlForm.value.company_url + '?login=""').then((result: any): void => {
                if (result.success){
                    this.nextStep.emit(2);
                    this.subdomainOutput.emit(this.companyUrlForm.value.company_url);
                }
                this.formSubmit = !!0;

            });
        }
            // this.loginUser();
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.companyUrlForm.controls[param].valid && this.companyUrlForm.controls[param].touched && this.companyUrlForm.submitted) ||
            (!this.companyUrlForm.controls[param].valid && this.companyUrlForm.submitted)) {
            return !!1;
        } else if (this.userFormErrors[param].verify && this.companyUrlForm.submitted) {
            return !!1;
        } else {
            return !!0;
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.companyUrlForm.controls[param].valid && this.companyUrlForm.controls[param].touched;
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
        this.companyUrlForm = this.formBuilder.group(this.companyUrlFormVAlidation);
        if ((window as any).location.host.split('.').length > 2 && (window as any).location.host.split('.')[0] !== 'login'){
            this.subDomain = (window as any).location.host.split('.')[0];
        //     if (!this.clickChange){
        //         this.showView = !!0;
        //         setTimeout((): void => {
        //             this. checkCompany();
        //         }, 200);
        //     }
        }
    }

}
