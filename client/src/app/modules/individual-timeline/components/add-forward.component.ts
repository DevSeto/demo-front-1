import {Component, OnInit, Input, AfterViewInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {ToastrService} from '../../../modules/toastr';
import {TicketDtoInterface} from '../../../dto';
import {TicketsService} from '../../../services/components/tickets.service';
import {TicketCommentModule} from '../../dto/ticket';
import {UsersService} from '../../../services/components/users.service';
import {TextEditor} from '../../editor';
import {UsersModel} from '../../../models/components/users.model';
import {UserExpandedDtoInterface} from '../../dto/user/interfaces/user-expanded-dto.interface';
import {UserDtoInterface} from '../../dto/user';
import {TicketsChildsComponent} from '../../../components/tickets/tickets-childs.component';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {NotificationsService} from '../../../services/components/notifications.service';
import {Router} from '@angular/router';
import {Ticket} from '../../dto/ticket/dto/ticket.dto';
import {SocketService} from '../../../services/components/socket.service';
import {DraftService} from '../../../services/components/draft.service';
import {UsersPreferencesModel} from '../../../models/components/usersPreferences.model';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';
import { ActionGifService } from '../../../services/components/action-git.service';

declare let $: any;

@Component({
    selector: 'add-forward',
    templateUrl: '../html/add-forward.component.html',
})

export class AddForward extends TicketsChildsComponent implements OnInit, AfterViewInit, OnDestroy {

    public cloud: any = showed;
    public textEditor: any;
    public isDraft: any;
    public setFile: any;

    @Input('statusList')
    public statusList: any;
    @Output('showLoader')
    public showLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
    public defaultAssigne: string = 'Anyone';
    public channedRepliesshowed = !!1;
    public assignmentUser: UserDtoInterface = this.ticketsService.ticket.assigned_user;
    public forwardData: TicketCommentModule;

    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                public usersPreferencesModel: UsersPreferencesModel,
                public usersModel: UsersModel,
                private mailBoxModel: MailBoxModel,
                public cannedrepliesService: CannedrepliesService,
                public notificationsService: NotificationsService,
                public mailBoxService: MailBoxService,
                public usersService: UsersService,
                public ticketCommentModule: TicketCommentModule,
                public ticketsService: TicketsService,
                public draftService: DraftService,
                private toastr: ToastrService,
                public socketService: SocketService,
                public actionGifService: ActionGifService,
                public router: Router) {
        super(ticketsService, usersService, mailBoxService, labelService, router, notificationsService, socketService, actionGifService);

        this.activeTickets = this.ticketsService.ticket.status;
        this.forwardData = ticketCommentModule;
        this.forwardData.status = 'closed';
        this.forwardData.assign_agent_id = (!this.ticketsService.ticket.assign_agent_id) ? 0 : this.ticketsService.ticket.assign_agent_id;
        this.textEditor = new TextEditor(usersModel.getToken(), null, '', toastr);
        this.textEditor.attachFile = !!1;
    }

    public subscribechangeassignment: any;
    public subscribechangestatus: any;
    public subscribeEditorData: any;

    public ngOnInit(): void {
        this.subscribe();
        if (this.ticketsService.ticket.ticketDraft) {
            this.forwardData.body = this.ticketsService.ticket.ticketDraft.forward;
        }

        this.textEditor.initEditorConfigs();
    }

    public subscribe(): void {
        this.subscribechangeassignment = this.ticketsService.changeassignment.subscribe((user: any): void => {
            this.assignmentUser = user;
            if (user) {
                this.forwardData.assign_agent_id = user.id;
            } else {
                this.forwardData.assign_agent_id = 0;
            }
        });

        this.setFile = this.textEditor.setFile.subscribe((data: any): void => {
            this.ticketsService.ticket.ticketDraft.forward = this.textEditor.core.html.get();
            this.ticketsService.ticket.ticketDraft.forward_files.push(data);
            this.draftService.addIndividualdraftData();
        });

        this.isDraft = this.draftService.isDraft.subscribe((isDraft: boolean): void => {
            if (isDraft) {
                this.forwardData.body = this.ticketsService.ticket.ticketDraft.forward;
            }
        });

        this.subscribeEditorData = this.textEditor.changeEditorText.subscribe((forward: string): void => {
            if (this.ticketsService.ticket.ticketDraft.forward !== this.textEditor.core.html.get()) {
                this.ticketsService.ticket.ticketDraft.forward = this.textEditor.core.html.get();
                if ((forward === 'remove' || document.querySelectorAll('.individual-tab-content .data-isFile').length !== this.ticketsService.ticket.ticketDraft.forward_files.length) && this.ticketsService.ticket.ticketDraft.forward_files.length) {
                    let filelengt: number = this.ticketsService.ticket.ticketDraft.forward_files.length;
                    while (filelengt--) {
                        if (this.ticketsService.ticket.ticketDraft.forward_files[filelengt] && this.ticketsService.ticket.ticketDraft.forward_files[filelengt].disposition !== 'attachment' && this.ticketsService.ticket.ticketDraft.forward.search(this.ticketsService.ticket.ticketDraft.forward_files[filelengt].link) === -1) {
                            this.ticketsService.ticket.ticketDraft.forward_files.splice(filelengt, 1);
                        }
                    }
                }

                this.draftService.addIndividualdraftData();
            }
        });

        this.subscribechangestatus = this.ticketsService.currentTicketsStatus.subscribe((status: string): void => {
            this.activeTickets = status;
        });
    }

    public ngOnDestroy(): void {
        this.subscribechangeassignment.unsubscribe();
        this.setFile.unsubscribe();
        this.isDraft.unsubscribe();
        this.subscribechangestatus.unsubscribe();
        this.subscribeEditorData.unsubscribe();
        this.forwardData.body = '';
    }

    public ngAfterViewInit(): void {
        let activeForward: any;
        const parent: any = document.querySelectorAll('div.fr-wrapper');
        const signature: any = document.querySelector('div.editor-signature');
        const editorInnerText: any = document.querySelector('.fr-box.fr-basic .fr-element');

        activeForward = parent[parent.length - 1];
        activeForward.removeAttribute('style');
        activeForward.className = 'fr-wrapper ';

        if (signature.clientHeight)
            editorInnerText.style.paddingBottom = `${signature.clientHeight + 10}px`;
    }

    public changeForwardAssigne(user?: UserExpandedDtoInterface): void {
        if (user) {
            this.assignmentUser = user;
            this.forwardData.assign_agent_id = user.id;
        } else {
            this.assignmentUser = null;
            this.forwardData.assign_agent_id = 0;
        }
    }

    public addForward(): void {
        this.usersPreferencesModel.select(!!1);

        if ((this.usersPreferencesModel.select() && !this.usersPreferencesModel.userPreferences.delay_sending) || this.socketService.isUndo) {
            this.addForwardNotUndo();
            this.socketService.isUndo = !!0;
        } else {
            this.mailboxId = this.mailBoxModel.getMailboxCurrentId();
            this.forwardData.body = this.textEditor.core.html.get();
            this.forwardData.attachments = this.ticketsService.ticket.ticketDraft.forward_files;
            this.forwardData.author = this.usersService.user;
            this.forwardData.author_id = this.usersService.user.id;
            this.forwardData.type = 'comment';
            this.forwardData.ticket_id_hash = this.ticketsService.ticket.ticket_id_hash;
            this.forwardData.is_forwarded = '1';
            this.forwardData.forward = 1;
            this.channedRepliesshowed = !!0;

            this.cloud.effect = 'forwardSpin';

            if ((this.forwardData.body || this.forwardData.attachments.length) && this.forwardData.forwarding_emails.length) {
                this.ticketsService.individualSubmitted = !!1;
                this.ticketsService.ticket.assigned_user = this.assignmentUser;
                this.ticketsService.ticket.assign_agent_id = this.forwardData.assign_agent_id;
                const forwardData: TicketCommentModule = (Object as any).assign({}, this.forwardData);
                const ticket: TicketDtoInterface = (Object as any).assign({}, this.ticketsService.ticket);
                this.ticketsService.ticket.ticketDraft.forwarding_emails = [];
                this.ticketsService.ticket.ticketDraft.forward = '';
                this.ticketsService.ticket.ticketDraft.forward_files = [];

                setTimeout(() => {
                    this.socketService.setCommentData(forwardData, ticket);
                    this.channedRepliesshowed = !!1;
                    this.forwardData.body = '';
                    this.forwardData.attachments = [];
                    this.forwardData.forwarding_emails = [];
                    ticket.ticketDraft.forwarding_emails = [];
                    ticket.ticketDraft.forward_files = [];
                    ticket.ticketDraft.forward = null;
                    this.ticketsService.clearForwarding.emit('as');
                    this.draftService.addIndividualdraftData(ticket);
                    this.ticketsService.individualSubmitted = !!0;
                    this.cloud.effect = 'forwardSpin';
                    this.forwardData.status = 'closed';
                    this.cloud.effect = 'forward';

                }, 500);
            } else {
                if (!this.forwardData.body) {
                    this.toastr.info(this.infoTexts.forward, 'Info', this.defaultToastrParams);
                }

                if (!this.forwardData.forwarding_emails.length) {
                    this.toastr.info(this.infoTexts.forwardTo, 'Info', this.defaultToastrParams);
                }
            }
        }
    }

    public addForwardNotUndo(): void {
        this.mailboxId = this.mailBoxModel.getMailboxCurrentId();
        this.forwardData.body = this.textEditor.core.html.get();
        this.forwardData.attachments = this.ticketsService.ticket.ticketDraft.forward_files;
        this.forwardData.forward = 1;
        this.channedRepliesshowed = !!0;
        if ((this.forwardData.body || this.forwardData.attachments.length) && this.forwardData.forwarding_emails.length) {
            this.showLoader.emit(!!1);
            this.ticketsService.individualSubmitted = !!1;

            this.cloud.effect = 'forwardSpin';
            this.forwardData.author_id = this.usersService.user.id;
            this.forwardData.ticket_id_hash = this.ticketsService.ticket.ticket_id_hash;
            this.ticketsService.addComment(this.forwardData).then((data: any): void => {
                if (data.success) {
                    this.emptyData();
                    this.channedRepliesshowed = !!1;
                    data.data.type = 'comment';
                    this.ticketsService.ticketTimeline.unshift(data.data);
                    this.ticketsService.ticket.assigned_user = this.assignmentUser;
                    this.ticketsService.ticket.assign_agent_id = this.forwardData.assign_agent_id;
                    this.changeInbox(1, !!1, !!1, this.forwardData.status);
                    this.ticketsService.ticket.status = this.forwardData.status;

                    this.activeTickets = this.forwardData.status;
                    this.ticketsService.clearForwarding.emit('as');
                    this.forwardData.forwarding_emails = [];
                    this.ticketsService.ticket.ticketDraft.forward = '';
                    this.ticketsService.ticket.ticketDraft.forwarding_emails = [];
                    this.socketService.changeTicket(this.ticketsService.ticket.id, this.usersService.user.id, this.ticketsService.ticket, this.mailBoxModel.getCurrentStatus());
                    this.draftService.addIndividualdraftData(this.ticketsService.ticket);

                    if (!this.ticketsService.ticket.clear) {
                        this.ticketsService.currentTicketsStatus.emit(this.forwardData.status);
                    } else {
                        this.ticketService.setIndividual(new Ticket());
                    }

                    if (this.ticketsService.ticket && this.usersPreferencesModel.userPreferences.take_back_after_update) {
                        this.ticketsService.ticket = null;
                        this.ticketsService.tickets.reset();
                        this.ticketsService.toTicketPage.emit(!!1);
                    }
                }
                this.showLoader.emit(!!0);

                this.ticketsService.individualSubmitted = !!0;
                this.cloud.effect = 'forwardSpin';
                this.forwardData.status = 'closed';
                this.cloud.effect = 'forward';

            });
        } else {
            if (!this.forwardData.body) {
                this.toastr.info(this.infoTexts.forward, 'Info', this.defaultToastrParams);
            }

            if (!this.forwardData.forwarding_emails.length) {
                this.toastr.info(this.infoTexts.forwardTo, 'Info', this.defaultToastrParams);
            }
        }
    }

    public emptyData() {
        this.forwardData.body = '';
        this.forwardData.attachments = [];
        this.ticketsService.ticket.ticketDraft.forward_files = [];
    }
}
