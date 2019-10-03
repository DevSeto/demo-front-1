import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OnInit} from '@angular/core';
import {RegisterBaseComponent} from './register-base.component';
import {_} from '../../../services/helpers/helper.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/helpers/validation.service';
import {Router} from '@angular/router';
import {UsersService} from '../../../services/components/users.service';
import {Title} from '@angular/platform-browser';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {UsersModel} from '../../../models/components/users.model';
import {User} from '../../../modules/dto/user';
import {ToastrService} from '../../../modules/toastr';

@Component({
    selector: 'signe-up-company-options',
    templateUrl: '../../../html/register/steps/signe-up-company-options.component.html',
})

export class SigneUpCompanyOptionsComponent extends  RegisterBaseComponent implements OnInit {
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
    public userValidation: any = {
        first_name: [
            this.usersService.stepsData.first_name,
            [
                Validators.required,
                Validators.pattern,
                ValidationService.dbValidator,
                Validators.minLength(3),
                Validators.maxLength(40),

            ],
        ],
        last_name: [
            this.usersService.stepsData.last_name,
            [
                Validators.required,
                Validators.pattern,
                ValidationService.dbValidator,
                Validators.minLength(3),
                Validators.maxLength(40),

            ],
        ],
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
        company_name: [
            this.usersService.stepsData.company_name ,
            [
                Validators.required,
                ValidationService.dbValidator,
                Validators.minLength(3),
                Validators.maxLength(250),

            ],
        ],
        password: [
            this.usersService.stepsData.password,
            [
                Validators.required,
                ValidationService.dontSpace,
                Validators.minLength(6),
                Validators.maxLength(250),

            ],
        ],
    };
    @Output('changeStep')
    public changeStep: EventEmitter<number> = new EventEmitter<number>();
    public passwordLevel: number = 0;
    public passwordIncludes(password: any): void {
        let validCount = 0;

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
                validCount++;
        });
        if (password.length && password.length > 6) {
            this.passwordLevel = validCount;
        }else if (password.length){
            this.passwordLevel = 1;
        }else{
            this.passwordLevel = 0;
        }
        console.log(this.passwordLevel)

    }
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
        if (this.usersService.stepsData.password){
            this.passwordIncludes( this.usersService.stepsData.password);
        }
    }

    @Input()
    public register: any = (): void => {
        this.userForm.submitted = !!1;
        if (this.userForm.valid){
            // this.changeStep.emit(2);
            this.usersService.stepsData.full_name = this.userForm.value.first_name+' '+this.userForm.value.last_name;
            this.usersService.stepsData.company_name = this.userForm.value.company_name;
            this.usersService.stepsData.last_name = this.userForm.value.last_name;
            this.usersService.stepsData.first_name = this.userForm.value.first_name;
            this.usersService.stepsData.password = this.userForm.value.password;
            this.usersService.stepsData.company_url = this.userForm.value.company_url;
            this.splitFullName();
            this.usersService.saveSteps(this.usersService.stepsData, 2).then((data: any): void => {
                if (!data.success) {
                    this.userFormErrors = data.errors;
                } else {
                    this.usersService.setStepData(data.data)
                    this.saveData();
                    this.router.navigate(['register', data.data.step + 1]);
                }
            });
            // this.saveData();
            // this.router.navigate(['register', 3]);

        }
    }
}
