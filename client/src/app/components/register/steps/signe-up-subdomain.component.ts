import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OnInit} from '@angular/core';
import {RegisterBaseComponent} from './register-base.component';
import {_} from '../../../services/helpers/helper.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../../services/components/users.service';
import {Title} from '@angular/platform-browser';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {UsersModel} from '../../../models/components/users.model';
import {User} from '../../../modules/dto/user';
import {ToastrService} from '../../../modules/toastr';
import {GlobalServices} from '../../../services/helpers/global.service';
import {ValidationService} from '../../../services/helpers/validation.service';

@Component({
    selector: 'signe-up-subdomain',
    templateUrl: '../../../html/register/steps/signe-up-subdomain.component.html',
})

export class SigneUpSubdomainComponent extends  RegisterBaseComponent implements OnInit {
    public agree: boolean = !!0;
    public oneclick: boolean = !!0;
    public userValidation: any = {
        company_url: [
            this.usersService.stepsData.company_url,
            [
                Validators.required,
                Validators.minLength(3),
                ValidationService.isInt,
                ValidationService.dbValidator,
                Validators.maxLength(40),
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
                public toastr: ToastrService) {
        super(router, usersService, titleService, mailboxModel, formBuilder, userModel, user, toastr);
    }
    public ngOnInit(): void {
        this.userForm = this.formBuilder.group(this.userValidation);
        if (!this.usersService.stepsData.company_url && this.usersService.stepsData.company_name.length <= 40){
            this.usersService.stepsData.company_url = this.usersService.stepsData.company_name.replace(/ /g, '').toLowerCase();
        }
    }

    @Input()
    public register: any = (): void => {
        this.userForm.submitted = !!1;
        if (this.agree){
            if (this.userForm.valid){
                this.oneclick = !!1;
                this.usersService.checkExistCompany(this.userForm.value.company_url).then((result: any): void => {
                    if (result.success) {
                        this.splitFullName();
                        this.usersService.stepsData.company_url = this.userForm.value.company_url;
                        this.usersService.saveSteps(this.usersService.stepsData, 3).then((data: any): void => {
                            if (!data.success) {
                                this.userFormErrors = data.errors;
                            } else {
                                this.usersService.setStepData(data.data)
                                this.saveData();
                                this.router.navigate(['register', data.data.step + 1]);
                            }
                        });

                    }else{
                        this.oneclick = !!0;
                    }
                });
            }
            // this.changeStep.emit('subdomain');
         } else {
            this.toastr.info(
            'You need to agree with Terms of Service  and Privacy Policy before to get registered.',
            'Info',
            {progressBar: true, positionClass: 'toast-bottom-right'} as any,
            );
        }
    }

}
