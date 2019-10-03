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
    selector: 'signe-up-company-forward',
    templateUrl: '../../../html/register/steps/signe-up-company-forward.component.html',
})

export class SigneUpCompanyForwardComponent extends  RegisterBaseComponent implements OnInit {
    public disabled: boolean = !!0;
    public mailboxForm: any ;
    public nextLibAvailable: boolean = !!0;
    public nextLibAvailable2: boolean = !!0;
    public userValidation: any = {
        mailbox_name: [
            this.usersService.stepsData.mailbox_name ,
            [
                Validators.required,
                ValidationService.dbValidator,
                Validators.minLength(3),
                Validators.maxLength(250),

            ],
        ],
        mailbox_email: [
            this.usersService.stepsData.mailbox_email,
            [
                Validators.required,
                Validators.email,
                ValidationService.emailValidator,
                Validators.minLength(6),
                Validators.maxLength(250),

            ],
        ],
    };
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
        this.mailboxForm = this.formBuilder.group({
            demo_mailbox_name: [
                this.usersService.stepsData.demo_mailbox_name,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(250),

                ],
            ],
        });
    }
    @Input()
    public register: any = (): void => {
        this.userForm.submitted = !!1;
        if (this.userForm.valid){
            this.disabled = !!1;

            //     // this.changeStep.emit(4);
            //     this.usersService.stepsData.company_name = this.userForm.value.company_name;
            //     this.saveData();
            //     this.router.navigate(['register', 4]);
            //
            this.usersService.stepsData.mailbox_name = this.userForm.value.mailbox_name;
            this.usersService.stepsData.mailbox_email = this.userForm.value.mailbox_email;
            this.userModel.userAuthotization = !!0;
            this.usersService.saveSteps(
              {
                  mailbox_name: this.userForm.value.mailbox_name,
                  mailbox_email: this.userForm.value.mailbox_email,
                  email: this.usersService.stepsData.email,

              }
              , 3).then((data: any): void => {
                if (!data.success) {
                    this.userFormErrors = data.errors;
                    this.disabled = !!0;
                } else {
                    this.usersService.setStepData(data.data);
                    this.saveData();
                    this.saveRegistration();
                    /*this.disabled = !!0;*/

                    // this.router.navigate(['register', data.data.step + 1]);
                }
            });

        }
    }

    @Input()
    public registerMailboxName: any = (): void => {
        this.mailboxForm.submitted = !!1;
        if ( this.mailboxForm.value){
            this.disabled = !!1;

            //     // this.changeStep.emit(4);
        //     this.usersService.stepsData.company_name = this.userForm.value.company_name;
        //     this.saveData();
        //     this.router.navigate(['register', 4]);
        //
            const sendData: any = {
                demo_mailbox_name: this.mailboxForm.value.demo_mailbox_name,
                email: this.usersService.stepsData.email,
                demo: !!1,
            };
            console.log(sendData);
            this.usersService.stepsData.demo_mailbox_name = this.mailboxForm.value.demo_mailbox_name;

            this.usersService.saveSteps(
                sendData
              , 3).then((data: any): void => {
                if (!data.success) {
                    // this.userFormErrors = data.errors;
                    this.disabled = !!0;
                } else {
                    this.usersService.setStepData(data.data);
                    this.saveData();
                    this.saveRegistration();
                    /*this.disabled = !!0;*/

                    // this.router.navigate(['register', data.data.step + 1]);
                }
            });

        }
    }

    public copyTextToClipboard(name: string) {
        const copyTextarea = document.querySelector('.' + name);

        (copyTextarea as any).select();

        try {
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            // @ts-ignore
            dummy.setAttribute('value', copyTextarea.value);
            dummy.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(dummy);

            const msg = successful ? 'successful' : 'unsuccessful';
            this.toastr.success('Forwarding code has been successfully copied.', 'Success', this.defaultToastrParams);
        } catch (err) {
            console.log('asdasdwww', err);

        }
    }
   /* public nextLibAvailableF(){
        this.nextLibAvailable = !!1;
        console.log(this.nextLibAvailable);
    }
    public nextLibAvailableB(){
        this.nextLibAvailable = !!0;
        console.log(this.nextLibAvailable);
    }*/
}
