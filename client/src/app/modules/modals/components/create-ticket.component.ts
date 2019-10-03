import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {TicketsService} from '../../../services/components/tickets.service';
import {UsersService} from '../../../services/components/users.service';
import {Title} from '@angular/platform-browser';
import {UsersModel} from '../../../models/components/users.model';
import {ToastrService} from '../../../modules/toastr';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {TextEditor} from '../../editor';
import {_} from '../../../services/helpers/helper.service';
import {Ticket} from '../../dto/ticket/dto/ticket.dto';
import {DtoMailboxModel} from '../../dto/mailbox/models/mailbox.model';
import {UserDtoInterface} from '../../dto/user';
import {LabelsService} from '../../../services/components/labels.service';
import {Router} from '@angular/router';
import {ValidationService} from '../../../services/helpers/validation.service';
import {FormBuilder, Validators} from '@angular/forms';
import {DraftService} from '../../../services/components/draft.service';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';

@Component({
    selector: 'create-ticket',
    templateUrl: '../html/create-ticket.component.html',
})

export class CreateTicket implements OnInit, OnDestroy {

    public cloud: any = showed;

    public infoTexts: any = {
        reply: 'You cannot send an empty reply.',
        add_note: 'You cannot send an empty note.',
        forward: 'You cannot send an empty forward.',
        invalidForwardEmail: 'Invalid email address.',
        forwardEmail: 'You cannot send an empty forward.',
        forwardTo: 'Please, write an email address you are forwarding to.',
    };
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public copyinactiveLabel: any = {
        ids: {},
        selectedTicketsCount: 0,
    };
    public allUsers: any;
    public textEditor: any;
    public afterSucces: boolean = !!0;
    public mailboxname: string = this.mailboxService.mailbox.name;
    public changeLabelBottom: boolean = !!0;
    public showBccCC: boolean = !!0;
    public addedLabels: Array<any> = [];
    public isOpenedFontsBlock: boolean = !!0;
    public previousTitle: string;
    public selectedMailboxId: number;
    public customerEmails: Array<any> = [];
    public changeInEditor: boolean = !!0;
    public openFrom: boolean = !!0;
    public loggedUserId: number;
    public allAgents: any = null;
    public everyone: string = 'Anyone';
    public from: any = 'from';
    public agentId: number = 0;
    public errorTryLater: boolean = !!0;
    public oneclick: boolean = !!0;
    public showReply: boolean = !!0;
    public showLoading: boolean = !!0;
    public defaultAssign: any = 'Anyone';
    public accountOwner: any = {
        name: 'Account Owner',
        id: 1,
    };

    public selectMenu: any = {
        showCannedRepliesList: !!0,
        cannedReply: !!0,
    };

    public setFile: any;
    public newDraftId: any;
    public subscribeEditorData: any;
    public repliesOptions: any = [];

    public panelButton: any = {
        createCannedReply: !!0 as boolean,
    };

    public createTicketValidation: any = {
        customer_name: '',
        email: '',
        subject: '',
        cc: '',
        bcc: '',
    };

    public _ticketFormErrors: any = {
        customer_name: {
            verify: !!0,
            text: _._,
        },
        customer_email: {
            verify: !!0,
            text: _._,
        },
        body: {
            verify: !!0,
            text: _._,
        },
        subject: {
            verify: !!0,
            text: _._,
        },
        cc: {
            verify: !!0,
            text: _._,
        },
        bcc: {
            verify: !!0,
            text: _._,
        },
    };

    private ticketFormValidation: any = {
        customer_email: [
            _._,
            [
                Validators.required,
                Validators.email,
                ValidationService.emailValidator,
                Validators.minLength(6),
            ],
        ],
        customer_name: [
            _._,
            [
                ValidationService.fullNameValidator,
                ValidationService.dbValidator,
                Validators.required,
                Validators.minLength(6),
            ],
        ],
        subject: [
            _._,
            [
                Validators.required,
                Validators.minLength(3),
            ],
        ],
        cc: [
            _._,
            [
                ValidationService.dbValidator,
                Validators.minLength(3),
            ],
        ],
        bcc: [
            _._,
            [
                ValidationService.dbValidator,
                Validators.minLength(3),
            ],
        ],
        body: [
            _._,
            [],
        ],
    };

    @Input()
    public ticketForm: any;

    public get ticketFormErrors(): any {
        return this._ticketFormErrors;
    }

    public set ticketFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                if (currentErrors.hasOwnProperty(key) && this._ticketFormErrors.hasOwnProperty(key)) {
                    this._ticketFormErrors[key].verify = !!1;
                    this._ticketFormErrors[key].text = currentErrors[key];
                }
            }
        }
    }

    @Input()
    public create(): void {
        this.ticket.body = this.textEditor.core.html.get();
        this.ticketForm.controls.body.setValue(this.ticket.body);
        this.ticketForm.submitted = !!1;
        if (this.ticketForm.valid) {
            if (this.ticket.body.trim().length || this.ticket.attachments.length)
                this.createTicket();
            else
                this.toastr.error('You cannot send an empty replay.', 'Error', this.defaultToastrParams);
        }
    }

    @Input()
    public classError: any = (param: string): boolean => {

        if (param === 'body' && this.textEditor.core.html.get() && this.ticketForm.submitted) {
            this._ticketFormErrors[param].verify = !!1;
            if (!this.ticketForm.controls.body.value) {
                this.ticketForm.controls.body.setValue(this.textEditor.core.html.get());
            }

            return !!0;
        } else if (param === 'body' && !this.textEditor.core.html.get() && this.ticketForm.submitted) {
            this._ticketFormErrors[param].verify = !!0;
            if (this.ticketForm.controls.body.value) {
                this.ticketForm.controls.body.setValue('');
            }

            return !!1;
        }

        if ((!this.ticketForm.controls[param].valid && this.ticketForm.controls[param].touched && this.ticketForm.submitted) ||
            (!this.ticketForm.controls[param].valid && this.ticketForm.submitted)) {
            return !!1;
        } else if (this.ticketFormErrors[param].verify && this.ticketForm.submitted) {
            return !!1;
        } else {
            return !!0;
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.ticketForm.controls[param].valid && this.ticketForm.controls[param].touched;
    }

    public dropdownOptions: any = {
        assignTo: !!0,
        sendingStatus: !!0,
        from: !!0,
    };

    public selectedOptions: any = {
        assignTo: 'Anyone',
        sendingStatus: {
            showedString: 'Send as Open',
            sendingString: 'open',
        },
        from: 'Inbox',
    };

    public sendingStatusList: Array<SendingStatusList> = [
        {
            showedString: 'Send as Open',
            sendingString: 'open',
        },
        {
            showedString: 'Send as Pending',
            sendingString: 'pending',
        },
        {
            showedString: 'Send as Closed',
            sendingString: 'closed',
        },
    ];

    @HostListener('document:keyup', ['$event'])
    public isPressedToEscape(event: any): void {
        if (event.keyCode === 27) {
            this.cloud.effect = 'createTicket';
            this.title.setTitle(this.previousTitle);
        }
    }


    constructor(private ticketService: TicketsService,
                private title: Title,
                private mailboxModel: MailBoxModel,
                private usersModel: UsersModel,
                public toastr: ToastrService,
                public cannedrepliesService: CannedrepliesService,
                public labelsService: LabelsService,
                public mailboxService: MailBoxService,
                public draftService: DraftService,
                private router: Router,
                public userService: UsersService,
                private formBuilder: FormBuilder,
                public ticket: Ticket) {

        this.ticket = new Ticket();
        this.textEditor = new TextEditor(usersModel.getToken());
        this.textEditor.attachFile = !!1;
        this.loggedUserId = this.usersModel.getLoggedUserId();
        this.selectedMailboxId = this.mailboxModel.getMailboxCurrentId();
        this.copyinactiveLabel = this.labelsService.inactiveLabel;
        this.labelsService.inactiveLabel = {
            ids: {},
            selectedTicketsCount: 1,
        };
        this.ticketForm = this.formBuilder.group(this.ticketFormValidation);
    }

    public ngOnInit(): void {
        this.defaultMailboxName();
        this.previousTitle = this.title.getTitle();
        this.title.setTitle('Birddesk: Create ticket');
        this.textEditor.initEditorConfigs();

        if (this.ticketService.createTicektDraft) {
            this.ticket.id = this.ticketService.createTicektDraft.id;
            this.ticket.draft_id = this.ticketService.createTicektDraft.id;
            for (const ticket in this.ticketService.createTicektDraft) {
                if (this.ticketService.createTicektDraft[ticket] && (ticket === 'customer_name' || ticket === 'attachments' || ticket === 'customer_email' || ticket === 'subject' || ticket === 'mailbox_id')) {
                    this.ticket[ticket] = this.ticketService.createTicektDraft[ticket];
                } else if (ticket === 'body' && this.ticketService.createTicektDraft.body) {
                    setTimeout(() => {
                        this.textEditor.core.selection.restore();
                        this.textEditor.core.html.insert(this.ticketService.createTicektDraft.body, false);
                    });
                }
            }
        }
        this.subScribe();
    }

    public subScribe(): void {
        this.newDraftId = this.draftService.newDraftId.subscribe((id: number): void => {
            this.ticket.draft_id = id;
        });

        this.setFile = this.textEditor.setFile.subscribe((data: any): void => {
            this.ticket.attachments.push(data);
            this.ticket.body = this.textEditor.core.html.get();
            this.draftService.newTicketDraft(this.ticket);
        });

        this.subscribeEditorData = this.textEditor.changeEditorText.subscribe((body: string): void => {
            this.ticket.body = this.textEditor.core.html.get();
            if ((body === 'remove' || document.querySelectorAll('#create_ticket_popup .data-isFile').length !== this.ticket.attachments.length) && this.ticket.attachments.length) {
                let filelengt: number = this.ticket.attachments.length;
                while (filelengt--) {
                    if (this.ticket.attachments[filelengt].disposition !== 'attachment' && this.ticket.attachments[filelengt] && this.ticket.body.search(this.ticket.attachments[filelengt].link) === -1) {
                        this.ticket.attachments.splice(filelengt, 1);
                    }
                }
            }
            this.draftService.newTicketDraft(this.ticket);
            this.changeInEditor = !!1;
        });
    }

    public changeInputData(change?: boolean, mailboxChange?: boolean): void {
        if (mailboxChange) {
            this.changeAssignedUser(0);
            this.everyone = this.defaultAssign;
            this.userService.getAllUsers({active: 'active', mailbox_id: this.ticket.mailbox_id})
                .then((data: any) => {
                    if (data.success && data.data) {
                        this.userService.activeUsers = data.data;
                    }
                });
        }
        if (this.ticketForm.dirty || change) {
            this.changeInEditor = !!1;
            this.draftService.newTicketDraft(this.ticket);
        }
    }

    public ngOnDestroy(): void {
        if (this.ticketForm.dirty || this.changeInEditor) {
            this.draftService.destroyTicketModal();
        }
        this.labelsService.readyForAssign = [];
        this.labelsService.inactiveLabel = this.copyinactiveLabel;
        this.ticketService.createTicektDraft = null;
        this.setFile.unsubscribe();
        this.newDraftId.unsubscribe();
        this.subscribeEditorData.unsubscribe();
    }

    public showSuccess() {
        this.toastr.success('Ticket has been successfully sent.', 'Success', this.defaultToastrParams);
    }

    public closeCreateTicket(): void {
        this.cloud.effect = 'createTicket';
        this.title.setTitle(this.previousTitle);
    }

    public changeSendingStatus(status: SendingStatusList): void {
        this.selectedOptions.sendingStatus = status;
        this.ticket.status = status.sendingString;
        this.cloud.effect = 'ticketStatus';
    }

    public changeAssignedUser(agentid: number): void {
        this.ticket.assign_agent_id = agentid;
        this.cloud.effect = 'assigninCreateticket';
    }

    public buildUpdatedData(): void {
        if (!this.ticket.status) {
            this.ticket.status = this.selectedOptions.sendingStatus.sendingString;
        }
    }

    /**
     * end validation
     */

    public createTicket(): void {
        const labelsId: Array<any> = [];
        this.labelsService.readyForAssign.forEach((label: any) => {
            labelsId.push(label.id);
        });

        this.buildUpdatedData();
        this.oneclick = !!1;
        this.cloud.effect = 'createTicketSpin';

        if (labelsId.length > 0)
            this.ticket.labels = labelsId;

        this.ticketService.createNewTicket(this.ticket)
            .then((data: any): void => {
                this.oneclick = !!0;
                if (!data.success) {
                    this.createTicketValidation = data.errors;
                } else {
                    const demoTicket = new Ticket();
                    demoTicket.mailbox_id = this.ticket.mailbox_id;
                    demoTicket.draft_id = this.ticket.draft_id;

                    this.draftService.newTicketDraft(demoTicket);
                    // if (this.ticket.draft_id) {
                    //     this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
                    //         if (mailbox.id === this.ticket.mailbox_id) {
                    //             this.mailboxService.mailboxes[index].draft_tickets_count = this.mailboxService.mailboxes[index].draft_tickets_count - 1;
                    //         }
                    //     });
                    // }

                    if (this.router.routerState.snapshot.url !== '/tickets') {
                        this.router.navigate(['/tickets']).then((success: any): void => {
                            if (success) {
                                this.afterCreateRequest(data, !!1);
                            }
                        });
                    } else {
                        this.afterCreateRequest(data);
                    }
                    this.ticketForm.submitted = !!0;
                }
                this.cloud.effect = 'createTicketSpin';
            });
    }

    private afterCreateRequest(data: any, onIndividual?: boolean): void {
        if (!onIndividual && this.mailboxService.mailbox.id === this.ticket.mailbox_id && this.ticket.status === this.ticketService.filterticketsStatus) {
            data.data.labels = this.labelsService.readyForAssign;
            this.ticketService.tickets.unshift(data.data);
        } else {
            if (this.mailboxService.mailbox.id !== this.ticket.mailbox_id) {
                this.ticketService.currentMailboxId.emit(this.ticket.mailbox_id);
            }
            this.ticketService.currentTicketsStatus.emit(this.ticket.status);
        }

        this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
            if (mailbox.id === this.ticket.mailbox_id) {
                this.mailboxService.mailboxes[index][this.ticket.status + '_tickets_count'] = this.mailboxService.mailboxes[index][this.ticket.status + '_tickets_count'] + 1;
                this.mailboxService.mailboxes[index].showed = !!1;
            }
        });

        if (this.cloud.effect.createTicket) {
            this.closeCreateTicket();
        }
        this.ticket.resetTicket();
        this.ticketService.addTicket.emit(!!1);
    }

    public labelRemove(labelId: number): void {
        this.labelsService.readyForAssign.forEach((currentLabel: any, index: number): void => {
            if (labelId === currentLabel.id) {
                this.labelsService.inactiveLabel.ids[labelId] = this.labelsService.inactiveLabel.ids[labelId] - 1;
                this.labelsService.readyForAssign.splice(index, 1);
            }
        });
    }

    /**
     * From input name into html, and mailbox id
     * author: Suren;
     */
    public defaultMailboxName(): void {
        this.afterSucces = !!0;
        this.showLoading = !!1;

        this.mailboxService.mailboxes.forEach((name: any): void => {
            if (name.id === this.selectedMailboxId) {
                this.ticket.mailbox_id = this.selectedMailboxId;
            }
        });
        this.afterSucces = !!1;
        this.showLoading = !!0;
    }

    /**
     * username filter
     * @param {UserDtoInterface} user
     * @returns {user name}
     */

    public returnUsername(user: UserDtoInterface): string {
        if (this.usersModel.getLoggedUserId() === user.id) {
            return 'me';
        } else {
            return user.first_name;
        }
    }

    public getCustomerEmails(value: string): void {
        if (value.trim().length && (1 & value.trim().length)) {
            this.ticketService.getCustomerEmails(value)
                .then((data: any) => {
                    if (data.success) {
                        this.customerEmails = data.data;
                    } else {
                        this.customerEmails = [];
                    }
                });
        }
    }

    public emailAutocomplete(customer: any): void {
        this.ticket.customer_name = `${customer.first_name} ${customer.last_name}`;
        this.ticket.customer_email = customer.email;
        this.customerEmails = [];
    }
    public enableCcBcc(event: boolean): void{
        if (event){
            this.ticket.cc = [];
            this.ticket.bcc = [];
        }
        this.showBccCC = event;
    }
}

export interface  SendingStatusList
{
    showedString: string;
    sendingString: string;
}
