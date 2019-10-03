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
    selector: 'signe-up-another-email',
    templateUrl: '../../../html/register/steps/signe-up-another-email.component.html',
})

export class SigneUpAnotherEmailComponent extends  RegisterBaseComponent implements OnInit {

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
        // this.userForm = this.formBuilder.group(this.userValidation);
        // if (this.usersService.stepsData.password){
        //    this.passwordIncludes( this.usersService.stepsData.password);
        // }
    }

    public skip(): void{
        this.saveRegistration();
    }
    // @Input()
    // public register: any = (): void => {
    //     this.userForm.submitted = !!1;
    //     if (this.userForm.valid){
    //         // this.changeStep.emit(3);
    //         this.usersService.stepsData.password = this.userForm.value.password;
    //         this.saveData();
    //         this.router.navigate(['register', 3]);
    //
    //     }
    // }

}
