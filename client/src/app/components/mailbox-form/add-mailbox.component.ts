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
    selector: 'addMailbox',
    templateUrl: '../../html/mailbox-form/add-mailbox.component.html',
})

export class AddMailbox implements OnInit {
    public cloud: any = showed;

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public showPopup: boolean = !!0;
    public textEditor: any;
    public verifyModalOpening: boolean = !!0;
    public oneclick: boolean = !!0;
    public textEditorBody: any;
    public allAgents: Array<any> = [];
    public allowedUsers: Array<any> = [];
    public createdMailbox: any;
    public confirmationKey: number;

    public persons: Array<object> = [
        {
            value: 2,
            name: 'Everyone',
            verify: !!1,
        },
        {
            value: 3,
            name: 'Only Me',
            verify: !!1,
        },
        {
            value: 1,
            name: 'Selected Users',
            verify: !!0,
        },
    ];

    public dataToModal: any = {
        dnsName: '',
        dnsValue: '',
        forwardAddress: '',
        mailboxId: '',
    };

    public mailboxData: DtoMailboxModel = new DtoMailboxModel() ;
    public mailboxForm: any ;

    public mailboxFormErrors: any = {
        name: {
            verify: !!0,
            text: _._,
        },
        email: {
            verify: !!0,
            text: _._,
        },
        auto_reply_subject: {
            verify: !!0,
            text: _._,
        },
        auto_reply_body: {
            verify: !!0,
            text: _._,
        },
        auto_reply: {
            verify: !!0,
            text: _._,
        },
        users: {
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
            this.mailboxData.name,
            [
                Validators.required,
                Validators.minLength(3),
            ],
        ],
        email: [
            this.mailboxData.email,
            [
                Validators.required,
                ValidationService.emailValidator,
                Validators.minLength(6),
            ],
        ],
        auto_reply: [
            this.mailboxData.auto_reply,
            [],
        ],
        users: [
            this.mailboxData.users,
            [
                Validators.required,
            ],
        ],
        allowed_users: [
            _._,
            [
                Validators.required,
            ],
        ],
        signature: [
            this.mailboxData.signature,
            [],
        ],
        auto_reply_subject: [
            this.mailboxData.auto_reply_subject,
            [
                Validators.required,
                Validators.minLength(3),
            ],
        ],
        auto_reply_body: [
            this.mailboxData.auto_reply_body,
            [
                Validators.required,
                Validators.minLength(3),
            ],
        ],
        auto_bcc: [
            this.mailboxData.auto_bcc,
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
                public variablesJson: VariablesJson,
                private socketService: SocketService,
                private mailboxService: MailBoxService,
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
                    if (this.allAgents.length > 0) {
                        this.persons.forEach((person: any): void => {
                            person.verify = !!1;
                        });
                    }
                }
            });
    }
    public selectedAgents(checked: boolean, agent: any, index: any): void {
        if (checked){
            this.allowedUsers.push(agent.id);
        }else{
            this.allowedUsers.splice(this.allowedUsers.indexOf(agent.id), 1);
        }
        this.allAgents[index]['checked'] = checked;
    }
    public selectAll(checked: boolean){
        for (const key in this.allAgents) {
            this.selectedAgents(checked, this.allAgents[key], key);
        }
    }
    public labelClick(id: string): void{
        document.getElementById(id).click();
    }

    @Input()
    public onSubmitted(): void {

        this.mailboxForm.submitted = !!1;
        this.oneclick = !!1;
        this.addMailbox();
    }

    public sendConfirmCode(): any {

        this.mailboxService.checkEmailConfirmation(this.confirmationKey)
          .then((data: any): void => {

              if (!data.success) {

              } else {
                  if (data.data.result) {
                      const mailboxes = this.mailboxService.mailboxes;
                      mailboxes.push(this.createdMailbox.data);
                      this.mailboxService.mailboxes.set(mailboxes);
                      this.mailboxModel.insert(this.createdMailbox.data);
                      this.dataToModal.dnsName = this.createdMailbox.data.dns_name;
                      this.dataToModal.dnsValue = this.createdMailbox.data.dns_value;
                      this.dataToModal.forwardAddress = this.createdMailbox.data.forward_address;
                      this.dataToModal.mailboxId = this.createdMailbox.data.id;
                      this.createdMailbox = null;
                      this.router.navigate(['/settings/mailbox']);
                  }
                  else
                  {
                      console.log('sxal kod');
                  }
              }
          });
    }


    /**
     * creating new mailbox
     */
    public addMailbox(): void {
        this.mailboxData.signature = this.textEditor.core.html.get();
        this.mailboxService.createNewMailbox(this.mailboxData)
            .then((data: any): void => {

                this.oneclick = !!0;
                if (!data.success) {
                    this.showPopup = !!0;
                    if (!data.domain)
                        this.settingFormErrors = data;
                } else {
                    this.createdMailbox = data;
                    this.showSuccess();
                    this.mailboxForm.submitted = !!0;
                    this.showPopup = !!1;
                }
            });
    }

    public verifyModal() {
        this.mailboxService.verifyMailbox(this.dataToModal.mailboxId)
            .then((data: any): void => {
                if (data.success) {
                    this.router.navigate(['/mailbox']);
                    this.verifyModalOpening = !!0;
                }
                else {
                    this.verifyModalOpening = !!0;
                    this.router.navigate(['/mailbox']);
                }
            });
    }
    public onlyNumber(event: KeyboardEvent): void {
        if (!+event.key && event.key !== '0') {
            event.preventDefault();
        }
    }

    public insertVariables(value: string, variable: any) {
        if (variable === 'signature') {
            this.textEditor.core.selection.restore();
            this.textEditor.core.html.insert(value, false);
            this.mailboxData[variable] = this.textEditor.core.html.get();
        } else
            this.mailboxData[variable] = (document.getElementById(variable) as any).value + ' ' + value;
    }

    public closeVerifyModal() {
        this.dataToModal.dnsName = '';
        this.dataToModal.dnsValue = '';
        this.dataToModal.forwardAddress = '';
        this.dataToModal.mailboxId = '';
        this.verifyModalOpening = !!0;
    }
}
