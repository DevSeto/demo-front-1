import {Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../services/helpers/validation.service';
import {UsersService} from '../../services/components/users.service';
import {_} from '../../services/helpers/helper.service';
import {ToastrService} from '../../modules/toastr';

@Component({
    selector: 'email-forget-password',
    templateUrl: '../../html/email-forget-password/email-forget-password.component.html',
})

export class EmailForgetPassword implements OnInit {

    public linkSent: boolean = !!0;
    public sendResetLink: boolean = !!1;
    public userEmail: string;
    public successEmail: boolean;
    public emailInputValue: any;
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;
    constructor(private formBuilder: FormBuilder,
                private titleService: Title,
                private usersService: UsersService,
                private toastr: ToastrService,
    ) {
    }

    public ngOnInit(): void {
        this.titleService.setTitle('Birddesk: Forget password');
        this.emailForm = this.formBuilder.group(this.emailValidation);
    }

    private _emailFormErrors: any = {
        email: {
            verify: !!0,
            text: _._,
        },
    };

    private emailValidation: any = {
        email: [
            _._,
            [
                Validators.required,
                ValidationService.emailValidator,
                Validators.minLength(6),
            ],
        ],
    };

    /**
     * get errors from server
     * @returns {any}
     */
    public get emailFormErrors(): any {
        return this._emailFormErrors;
    }

    /**
     * set errors from server
     * @param currentErrors
     */
    public set emailFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                if (currentErrors.hasOwnProperty(key) && this._emailFormErrors.hasOwnProperty(key)) {
                    this._emailFormErrors[key].verify = !!1;
                    this._emailFormErrors[key].text = currentErrors[key];
                }
            }
        }
    }

    @Input()
    public emailForm: any;

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.emailForm.controls[param].valid && this.emailForm.controls[param].touched && this.emailForm.submitted ) ||
            (!this.emailForm.controls[param].valid && this.emailForm.submitted)) {
            return !!1;
        } else if (this.emailFormErrors[param].verify && this.emailForm.submitted) {
            return !!1;
        } else {
            return !!0;
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.emailForm.controls[param].valid && this.emailForm.controls[param].touched;
    }

    /**
     * send link to email, for reset password
     */
    public sendLink(resend?: boolean): void {
        this.emailInputValue = this.emailForm.value;
        if (this.emailForm.dirty && this.emailForm.valid) {
            this.usersService.sendLinkToEmail(this.emailForm.value)
                .then((data: any) => {
                    if (!data.success) {
                        this.successEmail = !!0;
                        this.emailFormErrors = data.errors;
                    } else {
                        this.successEmail = !!1;
                        this.userEmail = this.emailForm.value.email;
                        this.sendResetLink = !!0;
                        this.linkSent = !!1;
                        if (resend){
                            this.showSuccess();
                        }
                    }
                });
        } else {
            this.successEmail = !!0;
            this.emailForm.submitted = !!1;
        }
    }

    public showSuccess() {
        this.toastr.success('successfully Resend.', 'Success', this.defaultToastrParams);
    }

}
