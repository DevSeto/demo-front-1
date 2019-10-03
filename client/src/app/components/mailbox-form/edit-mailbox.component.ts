import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../services/helpers/validation.service';
import {_} from '../../services/helpers/helper.service';
import {MailBoxService} from '../../services/components/mailbox.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {ToastrService} from '../../modules/toastr';
import {Router} from '@angular/router';
import {TicketsService} from '../../services/components/tickets.service';
import {TextEditor} from '../../modules/editor';
import {DtoMailboxModel} from '../../modules/dto/mailbox';
import {SocketService} from '../../services/components/socket.service';
import {VariablesJson} from '../../jsons/variables.json';

@Component({
    selector: 'editMailbox',
    templateUrl: '../../html/mailbox-form/edit-mailbox.component.html',
})

export class EditMailbox implements OnInit {

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public textEditor: any;
    public textEditorBody: any;
    public oneclick: boolean = !!0;
    public allAgents: Array<any> = [];

    public mailboxForm: any ;

    public mailboxFormErrors: any = {
        name: {
            verify: !!0,
            text: _._,
        },
        signature: {
            verify: !!0,
            text: _._,
        },
        auto_bcc: {
            verify: !!0,
            text: _._,
        },
    };

    public mailboxValidation: any = {
        name: [
            this.mailboxService.mailbox.name,
            [
                Validators.required,
                Validators.minLength(3),
            ],
        ],
        signature: [
            _._,
            [],
        ],
        auto_bcc: [
            _._,
            [],
        ],
    };

    /**
     * get errors from server
     * @returns {any}
     */
    public get settingFormErrors(): any {
        return this.mailboxFormErrors;
    }

    /**
     * set errors from server
     * @param currentErrors
     */
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

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.mailboxForm.controls[param].valid && this.mailboxForm.controls[param].touched;
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if ((!this.mailboxForm.controls[param].valid && this.mailboxForm.controls[param].touched && this.mailboxForm.submitted) ||
            (!this.mailboxForm.controls[param].valid && this.mailboxForm.submitted)) {
            return !!1;
        } else if (this.mailboxFormErrors[param].verify && !this.mailboxForm.controls[param].valid && this.mailboxForm.submitted) {
            return !!1;
        } else {
            return !!0;
        }
    }

    constructor(private formBuilder: FormBuilder,
                private ticketService: TicketsService,
                private router: Router,
                private socketService: SocketService,
                public variablesJson: VariablesJson,
                public mailboxService: MailBoxService,
                private mailboxModel: MailBoxModel,
                private toastr: ToastrService) {
        this.textEditor = new TextEditor('', null, '', null, !!1);
    }

    public ngOnInit() {
        this.getAllAgents();
        this.mailboxForm = this.formBuilder.group(this.mailboxValidation);
        this.textEditor.initEditorConfigs();
    }
    public showSuccess() {
        this.toastr.success('Mailbox has been successfully created.', 'Success', this.defaultToastrParams);
    }

    public getAllAgents(): void {
        this.ticketService.getAgents()
            .then((data: any): void => {
                if (data.success) {
                    this.allAgents = data.data;
                }
            });
    }

    @Input()
    public onSubmitted(): void {
        this.mailboxForm.submitted = !!1;
        this.changeMailbox();
    }

    public changeMailbox(): void {
        if (!this.mailboxService.mailbox.auto_bcc){
            this.mailboxService.mailbox.auto_bcc = 2;
        }
        this.oneclick = !!1;
        this.mailboxService.mailbox.signature = this.textEditor.core.html.get();

        this.mailboxService.changeMailbox(this.mailboxService.mailbox, this.mailboxService.mailbox.id)
            .then((data: any): void => {
                this.oneclick = !!0;
                if (data.success) {
                    this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: any) => {
                        if (mailbox.id === this.mailboxService.mailbox.id) {
                            this.mailboxService.mailboxes[index] = data.data;
                        }
                    });
                    this.socketService.changeMailboxData(data.data);
                    this.toastr.success('Mailbox has been successfully updated.', 'Success', this.defaultToastrParams);
                    this.mailboxForm.submitted = !!0;
                    // this.router.navigate(['tickets']);
                }
            });
    }

    public insertVariables(value: string, variable: any) {
        if (variable === 'signature') {
            this.textEditor.core.selection.restore();
            this.textEditor.core.html.insert(value, false);
            this.mailboxForm[variable] = this.textEditor.core.html.get();
        } else
            this.mailboxForm[variable] = (document.getElementById(variable) as any).value + ' ' + value;
    }

}
