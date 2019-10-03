import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {UsersService} from '../../../services/components/users.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from '../../../modules/toastr';

@Component({
    selector: 'reset-password',
    templateUrl: '../html/reset-password.html',
})
export class ResetPassword implements OnInit {

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    @Input('individualUser')
    public individualUser: any;

    public previousTitle: string;
    public resetForm: any;

    public resetData: any = {
        old_password: '',
        password: '',
        password_confirmation: '',
    };
    public resetFormValidation: any = {
        old_password: '',
        password: '',
        password_confirmation: '',
    };

    public typeOld: string = 'password';
    public typeNew: string = 'password';
    public showOld: boolean = false;
    public showNew: boolean = false;
    public showImgOld: string = '../../../../../../public/images/icons/eye.svg';
    public showImgNew: string = '../../../../../../public/images/icons/eye.svg';

    @Output('closeResetEmit')
    public closeResetEmit: EventEmitter<void | boolean> = new EventEmitter<void | boolean>();

    constructor(private usersService: UsersService,
                private titleService: Title,
                private toastr: ToastrService) {
    }

    public ngOnInit() {
    }

    public ngAfterViewInit(){
        const newElement = document.querySelector('.tickets-wrapper.scroll');
        document.querySelector('.tickets-wrapper.scroll').scrollTo(0, newElement.scrollHeight);
    }
    public resetValidatia(): number {
        let verify: number = 0;
        Object.keys(this.resetData).forEach((index: string): void => {
            if (index === 'old_password') {
                if (this.resetData.old_password.length < 6) {
                    this.resetFormValidation.old_password = 'Invalid current password. Password must be at least 6 characters long.';
                    return;
                } else if (!this.resetData.old_password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
                    this.resetFormValidation.old_password = 'Invalid password. Password must be contain a number.';
                    return;
                } else {
                    verify++;
                    this.resetFormValidation.old_password = null;
                }
            }

            if (index === 'password') {
                if (this.resetData.password.length < 6) {
                    this.resetFormValidation.password = 'Invalid password. Password must be at least 6 characters long.';
                    return;
                } else if (!this.resetData.password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
                    this.resetFormValidation.password = 'Invalid password. Password must be contain a number.';
                    return;
                } else {
                    verify++;
                    this.resetFormValidation.password = null;
                }
            }

            if (index === 'password_confirmation') {
                if (this.resetData.password_confirmation !== this.resetData.password) {
                    this.resetFormValidation.password_confirmation = 'The passwords don\'t match.';
                    return;
                } else {
                    verify++;
                    this.resetFormValidation.password_confirmation = null;
                }
            }
        });

        return verify;
    }

    public valueIsPassword(name: any): void {
        if (this.resetData[name].length === 0) {
            this.resetFormValidation[name] = 'Field is required.';
        }
    }

    public valueIsntPassword(name: any): void {
        this.resetFormValidation[name] = null;
    }

    public closeResetPopup(): void {
        this.closeResetEmit.emit();
        this.titleService.setTitle(this.previousTitle);
    }

    public showSuccess() {
        this.toastr.success('Password successfully changed', 'Success', this.defaultToastrParams);
    }

    public passwordReset(): void {

        this.resetData.id = this.individualUser.id;
        this.resetData.password_confirmation = this.resetData.password;
        if (this.resetValidatia() === 3) {
            this.usersService.resetUserPassword(this.resetData, this.resetData.id)
                .then((data: any) => {
                    if (data.success) {
                        this.showSuccess();
                        this.closeResetEmit.emit();
                    }
                });
        }
    }
    public visibilityOldPassword(): void {
        this.showOld = !this.showOld;
        if (this.showOld){
            this.typeOld = 'text';
            this.showImgOld = '../../../../../../public/images/icons/eye-green.svg';
        }
        else{
            this.typeOld = 'password';
            this.showImgOld = '../../../../../../public/images/icons/eye.svg';
        }
    }
    public visibilityNewPassword(): void {
        this.showNew = !this.showNew;
        if (this.showNew){
            this.typeNew = 'text';
            this.showImgNew = '../../../../../../public/images/icons/eye-green.svg';
        }
        else{
            this.typeNew = 'password';
            this.showImgNew = '../../../../../../public/images/icons/eye.svg';
        }
    }
}
