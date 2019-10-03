import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {OnInit} from '@angular/core';
import {_} from '../../../services/helpers/helper.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/helpers/validation.service';
import {RegisterBaseComponent} from './register-base.component';
import {Router} from '@angular/router';
import {UsersService} from '../../../services/components/users.service';
import {Title} from '@angular/platform-browser';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {UsersModel} from '../../../models/components/users.model';
import {User} from '../../../modules/dto/user';
import {IntegrationService} from '../../../services/integration/integration.service';
import {ToastrService} from '../../../modules/toastr';

@Component({
    selector: 'signe-up-email',
    templateUrl: '../../../html/register/steps/signe-up-email.component.html',
})

export class SigneUpEmailComponent extends  RegisterBaseComponent implements OnInit, AfterViewInit {
    public showView: boolean = !!0;
    public steps: Array<number> = [1,2,3];
    public userValidation: any = {
        email: [
            this.usersService.stepsData.email,
            [
                Validators.required,
                Validators.email,
                ValidationService.emailValidator,
                Validators.minLength(6),
                Validators.maxLength(250),

            ],
        ],
    }
    @Output('changeStep')
    public changeStep: EventEmitter<number> = new EventEmitter<number>();

    constructor(public router: Router,
                public usersService: UsersService,
                public titleService: Title,
                public mailboxModel: MailBoxModel,
                public formBuilder: FormBuilder,
                public userModel: UsersModel,
                public user: User,
                private cdRef: ChangeDetectorRef,
                public toastr: ToastrService) {
        super(router, usersService, titleService, mailboxModel, formBuilder, userModel, user, toastr);
    }
    public ngOnInit(): void {
        this.userForm = this.formBuilder.group(this.userValidation);
    }

    @Input()
    public register: any = (): void => {
        this.userForm.submitted = !!1;
        if (this.userForm.valid){
            // this.changeStep.emit(1);
            this.usersService.stepsData.email = this.userForm.value.email;
            this.usersService.saveSteps(this.usersService.stepsData, 1).then((data: any): void => {
                console.log(data)
                if (!data.success) {
                    this.userFormErrors = data.errors;
                } else {
                    this.usersService.setStepData(data.data)
                    this.saveData();
                    this.router.navigate(['register', data.data.step + 1]);
                }
            });
        }
    }

    public ngAfterViewInit(): void{
        const show: boolean = this.isShowExpand();
        if (show !== this.showView) { // check if it change, tell CD update view
            setTimeout((): void => {
                this.showView = show;
                this.cdRef.detectChanges();
            }, 800 );
        }
    }
    private  isShowExpand(): boolean
    {
        return !this.showView;
    }
}
