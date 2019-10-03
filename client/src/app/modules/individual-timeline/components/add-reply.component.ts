import {Component, OnInit, Input, OnDestroy, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {ToastrService} from '../../../modules/toastr';
import {TicketDraftModule, TicketDtoInterface} from '../../../dto';
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
    selector: 'add-reply',
    templateUrl: '../html/add-reply.component.html',
})

export class AddReplyComment extends TicketsChildsComponent implements OnInit, OnDestroy, AfterViewInit {

    public cloud: any = showed;
    public channedRepliesshowed: boolean = !!1;
    public commentData: TicketCommentModule;
    public isDraft: any;
    public textEditor: any;
    public isTrcop: boolean = !!0;

    @Input('statusList')
    public statusList: any;

    public defaultAssigne: string = 'Anyone';
    public assignmentUser: UserDtoInterface = this.ticketsService.ticket.assigned_user;
    @Output('showLoader')
    public showLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                public usersModel: UsersModel,
                private mailBoxModel: MailBoxModel,
                public mailBoxService: MailBoxService,
                public cannedrepliesService: CannedrepliesService,
                public usersService: UsersService,
                public ticketCommentModule: TicketCommentModule,
                public notificationsService: NotificationsService,
                public ticketsService: TicketsService,
                public usersPreferencesModel: UsersPreferencesModel,
                private toastr: ToastrService,
                public socketService: SocketService,
                public draftService: DraftService,
                public actionGifService: ActionGifService,
                public router: Router) {
        super(ticketsService, usersService, mailBoxService, labelService, router, notificationsService, socketService, actionGifService);

        this.activeTickets = this.ticketsService.ticket.status;
        this.commentData = ticketCommentModule;
        this.commentData.status = 'closed';
        this.commentData.assign_agent_id = (!this.ticketsService.ticket.assign_agent_id) ? 0 : this.ticketsService.ticket.assign_agent_id;
        this.textEditor = new TextEditor(usersModel.getToken(), null, '', toastr);
        this.textEditor.attachFile = !!1;
    }

    public subscribechangeassignment: any;
    public subscribeEditorData: any;
    public setFile: any;
    public subscribechangestatus: any;
    public subscribeEditorTyping: any;

    public ngOnInit(): void {
        console.log(this.assignmentUser)
        if (this.ticketsService.ticket.ticketDraft) {
            this.commentData.body = this.ticketsService.ticket.ticketDraft.reply;
        }

        this.subscribe();
        this.textEditor.initEditorConfigs();
    }

    public ngAfterViewInit(): void {
        const wrapper: any = document.querySelector('div.fr-wrapper'),
            signature: any = document.querySelector('div.editor-signature'),
            editorInnerText: any = document.querySelector('.fr-box.fr-basic .fr-element');

        wrapper.removeAttribute('style');

        if (signature.clientHeight)
            editorInnerText.style.paddingBottom = `${signature.clientHeight + 10}px`;
    }

    public subscribe(): void {
        this.subscribechangeassignment = this.ticketsService.changeassignment.subscribe((user: any): void => {
            this.assignmentUser = user;
            if (user) {
                this.commentData.assign_agent_id = user.id;
            } else {
                this.commentData.assign_agent_id = 0;
            }
        });

        this.isDraft = this.draftService.isDraft.subscribe((isDraft: boolean): void => {
            if (isDraft) {
                this.commentData.body = this.ticketsService.ticket.ticketDraft.reply;
            }
        });

        this.setFile = this.textEditor.setFile.subscribe((data: any): void => {
            this.ticketsService.ticket.ticketDraft.reply = this.textEditor.core.html.get();
            this.ticketsService.ticket.ticketDraft.comment_files.push(data);
            this.draftService.addIndividualdraftData();
        });

        this.subscribeEditorData = this.textEditor.changeEditorText.subscribe((rolle: string): void => {
            if (this.textEditor.core.html.get() !== this.ticketsService.ticket.ticketDraft.reply) {
                this.ticketsService.ticket.ticketDraft.reply = this.textEditor.core.html.get();
                if ((rolle === 'remove' || document.querySelectorAll('.individual-tab-content .data-isFile').length !== this.ticketsService.ticket.ticketDraft.comment_files.length) && this.ticketsService.ticket.ticketDraft.comment_files.length) {
                    let filelengt: number = this.ticketsService.ticket.ticketDraft.comment_files.length;
                    while (filelengt--) {
                        if (
                            this.ticketsService.ticket.ticketDraft.comment_files[filelengt]
                            && this.ticketsService.ticket.ticketDraft.comment_files[filelengt].disposition !== 'attachment'
                            && this.ticketsService.ticket.ticketDraft.reply.search(this.ticketsService.ticket.ticketDraft.comment_files[filelengt].link) === -1
                        ) {
                            this.ticketsService.ticket.ticketDraft.comment_files.splice(filelengt, 1);
                        }
                    }
                }
                this.draftService.addIndividualdraftData();
            }
        });

        this.subscribechangestatus = this.ticketsService.currentTicketsStatus.subscribe((status: string): void => {
            this.activeTickets = status;
        });

        this.subscribeEditorTyping = this.textEditor.editorTyping.subscribe((status: boolean) => {
            const user: any = (Object as any).assign({}, this.usersService.user);
            if (status) {
                user.typing = !!1;
            } else {
                user.typing = !!0;
            }
            this.socketService.getTicketTemporaryTimeline(this.ticketsService.ticket.id, user);
        });
    }

    public changeCommentAssigne(user?: UserExpandedDtoInterface): void {
        if (user) {
            this.assignmentUser = user;
            this.commentData.assign_agent_id = user.id;
        } else {
            this.assignmentUser = null;
            this.commentData.assign_agent_id = 0;
        }
    }

    public ngOnDestroy(): void {
        this.subscribeEditorData.unsubscribe();
        this.setFile.unsubscribe();
        this.isDraft.unsubscribe();
        this.subscribechangeassignment.unsubscribe();
        this.subscribechangestatus.unsubscribe();
        this.subscribeEditorTyping.unsubscribe();
        this.commentData.attachments = [];
        this.commentData.body = '';
    }

    public addComment(): void {
        if (!this.cloud.effect.commentSpin){
            this.usersPreferencesModel.select(!!1);
            if ((this.usersPreferencesModel.select() && !this.usersPreferencesModel.userPreferences.delay_sending ) || this.socketService.isUndo) {
                this.addCommentNoUndo();
                this.socketService.isUndo = !!0;
            } else {
                this.mailboxId = this.mailBoxModel.getMailboxCurrentId();
                this.commentData.body = this.textEditor.core.html.get();
                this.commentData.attachments = this.ticketsService.ticket.ticketDraft.comment_files;
                this.commentData.author = this.usersService.user;
                this.commentData.author_id = this.usersService.user.id;
                this.commentData.type = 'comment';
                this.commentData.ticket_id_hash = this.ticketsService.ticket.ticket_id_hash;
                this.channedRepliesshowed = !!0;

                if (this.commentData.body || this.commentData.attachments.length) {
                    this.cloud.effect = 'commentSpin';

                    this.commentData.ticket_id_hash = this.ticketsService.ticket.ticket_id_hash;
                    this.ticketsService.ticket.assigned_user = this.assignmentUser;
                    this.ticketsService.ticket.assign_agent_id = this.commentData.assign_agent_id;
                    const commentData: TicketCommentModule = (Object as any).assign({}, this.commentData);
                    const ticket: TicketDtoInterface = (Object as any).assign({}, this.ticketsService.ticket);
                    this.ticketsService.ticket.ticketDraft.comment_files = [];
                    this.ticketsService.ticket.ticketDraft.reply = null;
                    this.ticketsService.individualSubmitted = !!1;
                    setTimeout(() => {
                        this.socketService.setCommentData(commentData, ticket);
                        this.channedRepliesshowed = !!1;
                        this.commentData.body = '';
                        this.commentData.attachments = [];
                        ticket.ticketDraft.comment_files = [];
                        ticket.ticketDraft.reply = null;
                        this.draftService.addIndividualdraftData(ticket);
                        this.ticketsService.individualSubmitted = !!0;
                        this.cloud.effect = 'commentSpin';
                        this.commentData.status = 'closed';
                        this.cloud.effect = 'reply';
                    }, 500);
                }
                else {
                    this.toastr.info(this.infoTexts.reply, 'Info', this.defaultToastrParams);
                }
            }
        }
    }

    public addCommentNoUndo(): void {
        this.mailboxId = this.mailBoxModel.getMailboxCurrentId();
        this.commentData.body = this.textEditor.core.html.get();
        this.commentData.attachments = this.ticketsService.ticket.ticketDraft.comment_files;
        this.commentData.ticket_id_hash = this.ticketsService.ticket.ticket_id_hash;

        const lastComment: any = this.ticketService.ticketTimeline[0];
        const lastCommentCreatedAt: any = new Date(new Date(lastComment.created_at).toLocaleString('en-US', {timeZone: 'Asia/Shanghai'}));

        if (!this.isTrcop  && this.commentData.body &&  this.ticketService.ticketTimeline.length > 1 && lastComment.author && (lastComment.author.id !== this.usersModel.getLoggedUser().id) && this.diffDates(new Date() , lastCommentCreatedAt, 'minutes') < 3 ) {
            this.ticketsService.ticket.isTrCop = !!1;
            this.isTrcop = !!1;
            this.toastr.info('Need attention', 'Info', this.defaultToastrParams);
            this.ticketsService.ticket.ticketDraft.comment_id = lastComment.id;
            this.ticketsService.ticket.ticketTrCop.comment_id = lastComment.id;
            this.ticketsService.ticket.ticketDraft.commentData = (Object as any).assign({}, this.commentData);
            this.ticketsService.ticket.ticketTrCop.commentData = (Object as any).assign({}, this.commentData);
            this.socketService.setTrCopData((Object as any).assign({}, this.commentData), (Object as any).assign({}, this.ticketsService.ticket));
            this.ticketsService.ticket.ticketDraft.reply = null;
            this.ticketsService.ticket.ticketDraft.comment_files = [];
            this.commentData.body = '';
            this.commentData.attachments = [];
            this.cloud.effect = 'reply';
            this.draftService.addIndividualdraftData(this.ticketsService.ticket);
            // this.draftService.addIndividualdraftData(this.ticketsService.ticket, !!1);
        } else if (this.commentData.body || this.commentData.attachments.length) {
            this.cloud.effect = 'commentSpin';
            this.showLoader.emit(!!1);

            this.ticketsService.individualSubmitted = !!1;
            this.isTrcop = !!0;
            this.ticketsService.addComment(this.commentData)
                .then((data: any): void => {

                    if (data.success) {

                        if (this.ticketsService.ticket.isTrCop) {
                            this.ticketsService.ticket.isTrCop = !!0;
                            this.socketService.deleteTrafficCopByTicketId([this.ticketsService.ticket.id], this.mailboxId, !!1);
                        }

                        this.channedRepliesshowed = !!1;
                        this.commentData.body = '';
                        this.commentData.attachments = [];
                        this.ticketsService.ticket.ticketDraft.comment_files = [];

                        data.data.type = 'comment';
                        data.data.is_forwarded = '0';
                        this.ticketsService.ticketTimeline.unshift(data.data);
                        this.ticketsService.ticket.assigned_user = this.assignmentUser;
                        this.ticketsService.ticket.assign_agent_id = this.commentData.assign_agent_id;

                        if (this.activeTickets !== 'attention'){
                            this.changeInbox(1, !!1, !!1, this.commentData.status);
                        }

                        // this.socketService.changeCompanyTicketStatus(this.mailboxService.mailboxes, [this.ticketsService.ticket], this.ticketsService.ticket.status, this.ticketService.filterticketsStatus);

                        this.ticketsService.ticket.status = this.commentData.status;
                        this.ticketsService.ticket.ticketDraft.reply = null;
                        this.socketService.changeTicket(this.ticketsService.ticket.id, this.usersService.user.id, this.ticketsService.ticket, this.mailBoxModel.getCurrentStatus());

                        this.activeTickets = this.commentData.status;

                        this.draftService.addIndividualdraftData(this.ticketsService.ticket);
                        if (!this.ticketsService.ticket.clear) {
                            this.ticketsService.currentTicketsStatus.emit(this.commentData.status);
                        } else {
                            this.ticketsService.setIndividual(new Ticket());
                        }

                        if (this.ticketsService.ticket.id) {
                            this.checkPreferences();
                        }
                    }
                    this.showLoader.emit(!!0);

                    this.cloud.effect = 'reply';
                    this.ticketsService.individualSubmitted = !!0;
                    this.commentData.status = 'closed';
                    this.cloud.effect = 'commentSpin';
                });
        } else {
            this.toastr.info(this.infoTexts.reply, 'Info', this.defaultToastrParams);
        }
    }

    private checkPreferences() {
        if (this.usersPreferencesModel.userPreferences.assign_after_reply && !this.commentData.assign_agent_id) {
            this.ticketsService.ticket.assigned_user = this.usersService.user;
            this.ticketsService.ticket.assign_agent_id = this.usersService.user.id;
            this.assignmentUser = this.usersService.user;
            this.commentData.assign_agent_id = this.usersService.user.id;
        }

        if (this.usersPreferencesModel.userPreferences.take_back_after_reply || this.usersPreferencesModel.userPreferences.take_back_after_update) {
            this.ticketsService.ticket = null;
            this.ticketsService.tickets.reset();
            this.ticketsService.toTicketPage.emit(!!1);
        }
    }
}
