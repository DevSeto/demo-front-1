import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../services/components/users.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MailBoxService} from '../../services/components/mailbox.service';
import {UsersModel} from '../../models/components/users.model';
import {_} from '../../services/helpers/helper.service';
import {MailboxDtoInterface} from '../../modules/dto/mailbox';

declare let $: any;

@Component({
    selector: 'steps',
    templateUrl: '../../html/steps/steps.componen.html',
})

export class StepsComponent implements OnInit {

    @Input('activeStep')
    public activeStep: boolean = !!0;

    public disableStep: boolean = !!1;
    public currentStep: any = 0;
    public skiped: boolean = !!0;

    public mailboxForm: any = {
        name: '',
        email: '',
        auto_reply_subject: '',
        auto_reply_body: '',
        from_name: '',
        users: '',
        signature: '',
        auto_bcc: '',
        mailbox_name: '',
        auto_reply: '',
    };

    public mailboxFormErrors: any = {
        name: {
            verify: !!0,
            text: _._,
        },
    };

    public mailboxValidation: any = {
        name: [
            _._,
            [
            ],
        ],
    };

    public mailboxData: any =
    {
        auto_bcc: '0',
        auto_reply: '0',
        auto_reply_body: '',
        auto_reply_subject: '',
        email: 'gy@sdf.sd',
        from_name: '1',
        mailbox_name: '1',
        name: '',
        signature: '',
        users: '0',
    };

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.mailboxForm.controls[param].valid && this.mailboxForm.controls[param].touched;
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.mailboxForm.controls[param].valid && this.mailboxForm.controls[param].touched) ||
            (!this.mailboxForm.controls[param].valid && this.mailboxForm.submitted)) {
            return !!1;
        } else if (this.mailboxFormErrors[param].verify && !this.mailboxForm.controls[param].valid) {
            return !!1;
        } else {
            return !!0;
        }
    }

    public get settingFormErrors(): any {
        return this.mailboxFormErrors;
    }

    public set settingFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                if (currentErrors.hasOwnProperty(key) && this.mailboxFormErrors.hasOwnProperty(key)) {
                    this.mailboxFormErrors[key].verify = !!1;
                    this.mailboxFormErrors[key].text = currentErrors[key][0];
                }
            }
        }
    }

    constructor(private formBuilder: FormBuilder,
                public usersService: UsersService,
                private userModel: UsersModel,
                private mailboxService: MailBoxService) {
    }

    public ngOnInit(): void {
        this.mailboxForm = this.formBuilder.group(this.mailboxValidation);
    }

    public changeMailboxname(): void {
        if (this.mailboxService.mailbox.name) {
            this.mailboxForm.value.from_step = 1;
            this.mailboxService.changeMailboxName({name: this.mailboxService.mailbox.name})
                .then((data: any): void => {
                    this.userModel.deleteCookiAfterReg();
                    this.mailboxService.newReg = !!1;
                    if (!data.success && !data.errors.domain) {
                        this.settingFormErrors = data.errors;
                    } else {
                        this.usersService.user.step = {step: 1, mailbox_id: ''};
                        this.userModel.updateUserData(this.usersService.user.id, this.usersService.user);
                        this.usersService.forBlure = !!0;
                        if(!document.querySelector('.progressbar-notification-wrapper.notification-container').classList.contains('open')){
                            (document.querySelector('.progressbar-notification-wrapper.notification-container .open-notification-container') as any).click()
                        }
                    }
                });
        }
    }

    public  copyTextToClipboard() {
        const copyTextarea = document.querySelector('.js-copytextarea');
        (copyTextarea as any).select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
            // console.log('Oops, unable to copy');
        }
    }
}
