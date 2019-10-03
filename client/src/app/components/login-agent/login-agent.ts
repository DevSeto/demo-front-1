import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../services/components/users.service';
import {ValidationService} from '../../services/helpers/validation.service';
import {UsersModel} from '../../models/components/users.model';
import {TicketsModel} from '../../models/components/tickets.model';
import {GlobalServices} from '../../services/helpers/global.service';
import {_} from '../../services/helpers/helper.service';
import {MailBoxService} from '../../services/components/mailbox.service';
import {MailBoxModel} from '../../models/components/mailbox.model';

@Component({
    templateUrl: '../../html/login-agent/login-agent.html',
})

export class LoginAgent implements OnInit {

    public invite: any;
    public invitationhash: any;
    public addpadding: boolean = !!0;
    public formSubmit: boolean = !!0;
    public loginAgent: any;
    public dontMatch: boolean = !!0;
    public keepsigned: boolean = !!0;
    public passwordsErrorText: string = 'The passwords don\'t match';

    private _agentFormErrors: any = {
        password: {
            verify: !!0,
            text: _._,
        },
        password_confirmation: {
            verify: !!0,
            text: _._,
        },
    };

    public passwordInclude: Array<any> = [
        {
            name: 'One lowercase character',
            active: !!0,
        },
        {
            name: 'One uppercase character',
            active: !!0,
        },
        {
            name: 'One number',
            active: !!0,
        },
        {
            name: 'One special character',
            active: !!0,
        },
        {
            name: '6 characters minimum',
            active: !!0,
        },
    ];

    private userValidation: any = {
        password: [
            _._,
            [
                Validators.required,
                ValidationService.passwordValidator,
                Validators.minLength(6),
            ],
        ],
        password_confirmation: [
            _._,
            [
                Validators.required,
                ValidationService.passwordValidator,
                Validators.minLength(6),
            ],
        ],
    };

    @Input()
    public isRememberMe: boolean = false;

    @Input()
    public agentForm: any;

    /**
     * get errors from server
     * @returns {any}
     */
    public get agentFormErrors(): any {
        return this._agentFormErrors;
    }

    /**
     * set errors from server
     * @param currentErrors
     */
    public set agentFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                if (currentErrors.hasOwnProperty(key) && this._agentFormErrors.hasOwnProperty(key)) {
                    this._agentFormErrors[key].verify = !!1;
                    this._agentFormErrors[key].text = currentErrors[key];
                }
            }
        }
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.agentForm.controls[param].valid && this.agentForm.controls[param].touched && this.agentForm.submitted) ||
            (!this.agentForm.controls[param].valid && this.agentForm.submitted)) {
            this.addpadding = !!1;
            return !!1;
        } else if (this.agentFormErrors[param].verify && this.agentForm.submitted) {
            return !!1;
        } else {
            this.addpadding = !!0;
            return !!0;
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.agentForm.controls[param].valid && this.agentForm.controls[param].touched;
    }

    @Input()
    public verifyTwinsError(param: string, value: string): void {
        if (_.empty(this.agentFormErrors[param].text)) {
            if (this.agentFormErrors[param].text === value) {
                this.agentFormErrors[param].verify = !!1;
            } else {
                this.agentFormErrors[param].verify = !!0;
            }
        }
    }

    constructor(private router: Router,
                private route: ActivatedRoute,
                private usersService: UsersService,
                private titleService: Title,
                private fb: FormBuilder,
                private mailboxService: MailBoxService,
                private userModel: UsersModel,
                private mailBoxModel: MailBoxModel,
                private ticketsModel: TicketsModel) {

        this.beforeOnInit();
    }

    public ngOnInit(): void {
        if (this.userModel.getLoggedUserId) {
            this.userModel.logoutUser();
        }
        this.titleService.setTitle('Birddesk: Login');
        this.agentForm = this.fb.group(this.userValidation);
    }

    private beforeOnInit(): void {
        if (!this.init())
            this.router.navigate(['logout']);

        this.usersService.getNewAgentData(this.invitationhash).then((userData: any) => {
            if (userData.data){
                this.loginAgent = userData.data;
            }else{
                this.router.navigate(['logout']);
            }
        });
    }

    private init(): boolean {
        const routeParams: any = this.route.snapshot.params;

        if (routeParams.invitationhash) {
            this.invitationhash = routeParams.invitationhash;

            return !!1;
        }

        return !!0;
    }

    @Input()
    public submitForm: any = (): void => {
        if (this.agentForm.dirty && this.agentForm.valid) {
            if (this.agentForm.submitted)
                delete this.agentForm.submitted;

            this.createAgent();
        } else {
            this.agentForm.submitted = !!1;
        }
    }

    public createAgent(): void {
        if (this.agentForm.controls.password.value === this.agentForm.controls.password_confirmation.value) {
            this.dontMatch = !!0;
            const locationPaths: Array<string> = (window as any).location.host.split('.');
            this.userModel.userAuthotization = !!0;
            this.usersService.registerAgent({form_data: this.agentForm.value}, this.invitationhash)
                .then((data: any) => {
                    if (!data.success) {
                        this.agentFormErrors = data.errors;
                    }else {
                        if (locationPaths[0] === data.data.company_url) {
                            this.mailboxService.getAllMailboxs()
                                .then((mailboxData: any) => {
                                    if (mailboxData.success) {
                                        this.mailBoxModel.insertMailboxId(mailboxData.data[0].id);
                                    }
                                });

                            this.userModel.userAuthotization = !!1;
                            this.userModel.insert(data.data);
                            this.router.navigate(['/tickets']);
                        } else {
                            (window as any).location.href = GlobalServices.getCompanyUrl(data.data.company_url);
                        }
                    }
                });
        } else {
            this.dontMatch = !!1;
        }
    }

    public rememberMe(): void {
        this.isRememberMe = !!(+this.isRememberMe - 1);
    }

    /**
     * check password strength
     * @param password
     */
    public validCount: number = 0;
    public passwordIncludes(password: any): void {

        const strengthPasswordText = document.getElementById('strength-text') ;
        this.validCount = 0;
        if (password.match(/^(?=.*[a-z])/))
            this.passwordInclude[0].active = !!1;
        else
            this.passwordInclude[0].active = !!0;

        if (password.match(/^(?=.*[A-Z])/))
            this.passwordInclude[1].active = !!1;
        else
            this.passwordInclude[1].active = !!0;

        if (password.match(/^(?=.*[0-9])/))
            this.passwordInclude[2].active = !!1;
        else
            this.passwordInclude[2].active = !!0;

        if (password.match(/^(?=.*[!@#\$%\^&\*])/))
            this.passwordInclude[3].active = !!1;
        else
            this.passwordInclude[3].active = !!0;

        if (password.match(/^(?=.{6,100})/))
            this.passwordInclude[4].active = !!1;
        else
            this.passwordInclude[4].active = !!0;

        this.passwordInclude.forEach((value: any) => {
            if (value.active)
                this.validCount++;
        });

        // if (password.length) {
        //     switch (this.validCount) {
        //         case 5:
        //             strengthPasswordText.innerText = 'Strong';
        //             strengthPasswordText.style.color = 'green';
        //             // strengthProgressWidth.style.width = '100%';
        //             // strengthProgressWidth.style.backgroundColor = 'green';
        //             break;
        //         case 4:
        //         case 3:
        //             strengthPasswordText.innerText = 'So-so';
        //             strengthPasswordText.style.color = 'orange';
        //             // strengthProgressWidth.style.width = '60%';
        //             // strengthProgressWidth.style.backgroundColor = 'orange';
        //             break;
        //         default:
        //             strengthPasswordText.innerText = 'Weak';
        //             strengthPasswordText.style.color = 'red';
        //             // strengthProgressWidth.style.width = '30%';
        //             // strengthProgressWidth.style.backgroundColor = 'red';
        //             break;
        //     }
        // }
    }
}
