import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/helpers/validation.service';
import {_} from '../../../services/helpers/helper.service';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../../../services/components/users.service';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {ToastrService} from '../../../modules/toastr';

@Component({
    selector: 'addUser',
    templateUrl: '../html/add-user.component.html',
})

export class AddUserComponent implements OnInit {

    public cloud: any = showed;

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public previousTitle: string;
    public mailboxesIds: Array<any> = [];
    public allMailboxes: Array<any> = [];
    public afterSucces: boolean = !!0;
    public addUserForm: any = {
        to_name: '',
        to_email: '',
        role_id: '',
        mailboxes: '',
    };

    public users: Array<any> = [
        {
            name: 'Agent',
            value: 4,
        },
    ];

    public addUserValidation: any = {
        to_name: [
            _._,
            [
                ValidationService.customerNameValidator,
                ValidationService.fullNameValidator,
                Validators.minLength(3),
            ],
        ],
        to_email: [
            _._,
            [
                ValidationService.emailFieldValidator,
                ValidationService.emailValidator,
                Validators.minLength(6),
            ],
        ],
        role_id: [
            '4',
            [],
        ],
    };

    public addUserValidErrors: any = {
        to_name: {
            verify: !!0,
            text: _._,
        },
        to_email: {
            verify: !!0,
            text: _._,
        },
        role_id: {
            verify: !!0,
            text: _._,
        },
    };

    @HostListener('document:keyup', ['$event'])
    public isPressedToEscape(event: any): void {
        if (event.keyCode === 27) {
            this.cloud.effect = 'addUser';
            this.title.setTitle(this.previousTitle);
        }
    }

    constructor(private formBuilder: FormBuilder,
                private title: Title,
                private usersService: UsersService,
                private mailboxService: MailBoxService,
                private toastr: ToastrService) {
    }

    public ngOnInit(): void {
        this.getAllMailboxes();
        this.addUserForm = this.formBuilder.group(this.addUserValidation);
        this.previousTitle = this.title.getTitle();
        this.title.setTitle('Birddesk: Add user');
    }

    public get adduserFormErrors(): any {
        return this.addUserValidErrors;
    }

    public set settingFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {

                if (currentErrors.hasOwnProperty(key) && this.addUserValidErrors.hasOwnProperty(key)) {
                    this.addUserValidErrors[key].verify = !!1;
                    this.addUserValidErrors[key].text = currentErrors[key][0];
                }
            }
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.addUserForm.controls[param].valid && this.addUserForm.controls[param].touched;
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.addUserForm.controls[param].valid && this.addUserForm.controls[param].touched) && this.addUserForm.submitted ||
            (!this.addUserForm.controls[param].valid && this.addUserForm.submitted)) {
            return !!1;
        } else if (this.addUserValidErrors[param].verify && !this.addUserForm.controls[param].valid && this.addUserForm.submitted) {
            return !!1;
        } else {
            return !!0;
        }
    }

    public closeAddUser(): void {
        this.cloud.effect = 'addUser';
        this.title.setTitle(this.previousTitle);
    }

    public getAllMailboxes(): void {
        this.afterSucces = !!0;

        this.mailboxService.getAllMailboxs()
            .then((data: any): void => {
                if (data.success) {
                    this.mailboxService.allMailboxes = data.data;
                    this.allMailboxes = this.mailboxService.allMailboxes;
                }
                this.afterSucces = !!1;
            });
    }

    public selectedAgents(checked: boolean, mailbox: any, index: any): void {
        if (checked)
            this.mailboxesIds.push(mailbox.id);
        else
            this.findIndexOfElement(this.mailboxesIds, mailbox.id);
    }

    public findIndexOfElement(array: Array<any>, value: any) {
        let idx: any;

        if ([].indexOf) {
            array.splice(array.indexOf(value), 1);
        } else {
            for (idx = 0; idx < array.length; idx++) {
                if (array[idx] === value)
                    array.splice(idx, 1);
            }
            return -1;
        }
    }

    public buildUpdatedData(): void {
        let newData: any;

        newData = (this.addUserForm.value) as object;

        if (this.mailboxesIds.length > 0)
            newData.mailboxes = this.mailboxesIds;
    }

    public splitFullName(): void {
        let userFullName: Array<string>;

        if (this.addUserForm.value.to_name) {
            userFullName = this.addUserForm.value.to_name.split(' ');
            userFullName.forEach((value: string, index: number): void => {

                if (!index) {
                    this.addUserForm.value.first_name = value;
                } else {
                    if (!this.addUserForm.value.last_name)
                        this.addUserForm.value.last_name = '';

                    this.addUserForm.value.last_name += '' + value;
                }
            });
        }
        delete this.addUserForm.value.to_name;
    }

    public showError() {
        this.toastr.error('At least one mailbox is required.', 'Error', this.defaultToastrParams);
    }

    public showSuccess() {
        this.toastr.success('Invitation has been successfully sent.', 'Success', this.defaultToastrParams);
    }

    @Input()
    public submitForm: any = (): void => {

        if (this.addUserForm.dirty && this.addUserForm.valid) {
            if (this.addUserForm.submitted)
                delete this.addUserForm.submitted;

            this.addUser();
        } else {
            this.addUserForm.submitted = !!1;
        }
    }

    public addUser(): void {
        this.buildUpdatedData();
        this.splitFullName();

        if (this.addUserForm.value.mailboxes) {
            this.cloud.effect = 'addUserSpin';
            this.usersService.addUser(this.addUserForm.value)
                .then((data: any): void => {
                    if (data.success) {
                        this.cloud.effect = 'addUser';
                        this.usersService.usersAfterInvite.emit(!!1);
                        this.usersService.invitedUsersFormValue = this.addUserForm.value;
                        this.cloud.effect = 'addAnotherUser';
                        this.showSuccess();
                    }
                    this.cloud.effect = 'addUserSpin';
                });
        } else
            this.showError();
    }
}
