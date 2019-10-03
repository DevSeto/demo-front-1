import {Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ValidationService} from '../../services/helpers/validation.service';
import {UsersModel} from '../../models/components/users.model';
import {UsersService} from '../../services/components/users.service';
import {_} from '../../services/helpers/helper.service';

@Component({
    selector: 'forget-password',
    templateUrl: '../../html/forget-password/forget-password.component.html',
})

export class ForgetPassword implements OnInit {

    public passwordsErrorText: string = 'The passwords don\'t match';

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private titleService: Title,
                private userModel: UsersModel,
                private usersService: UsersService) {
        if (!(window as any).location.search){
            this.router.navigate(['/']);
        }
    }

    public ngOnInit(): void {
        this.titleService.setTitle('Birddesk: Forget password');
        this.resetPasswordForm = this.formBuilder.group(this.passwordValidation, {validator: this.checkIfMatchingPasswords('password', 'password_confirmation')});
    }

    public checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string): any {

        return (group: FormGroup) => {
            const passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];

            if (passwordInput.value !== passwordConfirmationInput.value || passwordInput.value === '' && passwordConfirmationInput.value === '') {
                return passwordConfirmationInput.setErrors({notEquivalent: true});
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }

    private _resetPasswordFormErrors: any = {
        password: {
            verify: !!0,
            text: _._,
        },
        password_confirmation: {
            verify: !!0,
            text: _._,
        },
    };

    private passwordValidation: any = {
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
    public resetPasswordForm: any;

    public get resetPasswordFormErrors(): any {
        return this._resetPasswordFormErrors;
    }

    public set resetPasswordFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                if (currentErrors.hasOwnProperty(key) && this._resetPasswordFormErrors.hasOwnProperty(key)) {
                    this._resetPasswordFormErrors[key].verify = !!1;
                    this._resetPasswordFormErrors[key].text = currentErrors[key];
                }
            }
        }
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.resetPasswordForm.controls[param].valid && this.resetPasswordForm.controls[param].touched) ||
            (!this.resetPasswordForm.controls[param].valid && this.resetPasswordForm.submitted)) {
            return !!1;
        } else if (this.resetPasswordFormErrors[param].verify) {
            return !!1;
        } else {
            return !!0;
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.resetPasswordForm.controls[param].valid && this.resetPasswordForm.controls[param].touched;
    }

    /**
     * reset user password after checking token
     */
    public changePassword(): void {
        this.usersService.checkToken()
            .then((data: any) => {
                if (data.success) {
                    this.usersService.forgetPassword(this.resetPasswordForm.value)
                        .then((passwordData: any) => {
                            if (!data.success) {
                                this.resetPasswordFormErrors = passwordData.errors;
                            } else {
                                this.router.navigate(['/login']);
                            }
                        });
                }
            });
    }
}
