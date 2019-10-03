import {Component, OnInit, Input, OnDestroy, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {ToastrService} from '../../../modules/toastr';
import {TicketDtoInterface} from '../../../dto';
import {TicketsService} from '../../../services/components/tickets.service';
import {TicketNoteModule} from '../../dto/ticket';
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
    selector: 'add-note',
    templateUrl: '../html/add-note.component.html',
})

export class AddNote extends TicketsChildsComponent implements OnInit, OnDestroy, AfterViewInit {

    public cloud: any = showed;
    public setFile: any;
    public isDraft: any;
    public textEditor: any;

    @Input('statusList')
    public statusList: any;
    @Output('showLoader')
    public showLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
    public defaultAssigne: string = 'Anyone';
    public channedRepliesshowed = !!1;
    public assignmentUser: UserDtoInterface = this.ticketsService.ticket.assigned_user;
    public noteData: TicketNoteModule;

    constructor(public labelService: LabelsService,
                public usersPreferencesModel: UsersPreferencesModel,
                public labelsModel: LabelsModel,
                public usersModel: UsersModel,
                private mailBoxModel: MailBoxModel,
                public mailBoxService: MailBoxService,
                public usersService: UsersService,
                public notificationsService: NotificationsService,
                public ticketNoteModule: TicketNoteModule,
                public cannedrepliesService: CannedrepliesService,
                public ticketsService: TicketsService,
                public draftService: DraftService,
                private toastr: ToastrService,
                public socketService: SocketService,
                public actionGifService: ActionGifService,
                public router: Router) {
        super(ticketsService, usersService, mailBoxService, labelService, router, notificationsService, socketService, actionGifService);

        this.activeTickets = this.ticketsService.ticket.status;
        this.noteData = ticketNoteModule;
        this.noteData.status = 'closed';
        this.noteData.assign_agent_id = (!this.ticketsService.ticket.assign_agent_id) ? 0 : this.ticketsService.ticket.assign_agent_id;
        this.textEditor = new TextEditor(usersModel.getToken(), this.ticketsService, 'note', toastr);
        this.textEditor.attachFile = !!1;
    }

    public subscribechangeassignment: any;
    public subscribechangestatus: any;
    public subscribeEditorData: any;

    public ngOnInit(): void {
        if (this.ticketsService.ticket.ticketDraft) {
            this.noteData.note = this.ticketsService.ticket.ticketDraft.note;
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
        this.isDraft = this.draftService.isDraft.subscribe((isDraft: boolean): void => {
            if (isDraft) {
                this.noteData.note = this.ticketsService.ticket.ticketDraft.note;
            }
        });

        this.setFile = this.textEditor.setFile.subscribe((data: any): void => {
            this.ticketsService.ticket.ticketDraft.note = this.textEditor.core.html.get();
            this.ticketsService.ticket.ticketDraft.note_files.push(data);
            this.draftService.addIndividualdraftData();
        });

        this.subscribechangeassignment = this.ticketsService.changeassignment.subscribe((user: any): void => {
            this.assignmentUser = user;
            if (user) {
                this.noteData.assign_agent_id = user.id;
            } else {
                this.noteData.assign_agent_id = 0;
            }
        });

        this.subscribechangestatus = this.ticketsService.currentTicketsStatus.subscribe((status: string): void => {
            this.activeTickets = status;
        });

        this.subscribeEditorData = this.textEditor.changeEditorText.subscribe((note: string): void => {
            if (this.ticketsService.ticket.ticketDraft.note !== this.textEditor.core.html.get()) {
                this.ticketsService.ticket.ticketDraft.note = this.textEditor.core.html.get();

                if ((note === 'remove' || document.querySelectorAll('.individual-tab-content .data-isFile').length !== this.ticketsService.ticket.ticketDraft.note_files.length) && this.ticketsService.ticket.ticketDraft.note_files.length) {
                    let filelengt: number = this.ticketsService.ticket.ticketDraft.note_files.length;
                    while (filelengt--) {
                        if (this.ticketsService.ticket.ticketDraft.note_files[filelengt] && this.ticketsService.ticket.ticketDraft.note_files[filelengt].disposition !== 'attachment' && this.ticketsService.ticket.ticketDraft.note.search(this.ticketsService.ticket.ticketDraft.note_files[filelengt].link) === -1) {
                            this.ticketsService.ticket.ticketDraft.note_files.splice(filelengt, 1);
                        }
                    }
                }
                this.draftService.addIndividualdraftData();
            }
        });
    }

    public ngOnDestroy(): void {
        this.subscribechangeassignment.unsubscribe();
        this.subscribechangestatus.unsubscribe();
        this.setFile.unsubscribe();
        this.isDraft.unsubscribe();
        this.subscribeEditorData.unsubscribe();
        this.noteData.attachments = [];
        this.noteData.note = '';
    }

    public changeNoteAssigne(user?: UserExpandedDtoInterface): void {
        if (user) {
            this.assignmentUser = user;
            this.noteData.assign_agent_id = user.id;
        } else {
            this.assignmentUser = null;
            this.noteData.assign_agent_id = 0;
        }
    }

    public addNote(): void {
        this.usersPreferencesModel.select(!!1);

        if ((this.usersPreferencesModel.select() && !this.usersPreferencesModel.userPreferences.delay_sending) || this.socketService.isUndo) {
            this.addNoteNoUndo();
            this.socketService.isUndo = !!0;
        } else {
            this.mailboxId = this.mailBoxModel.getMailboxCurrentId();
            this.noteData.note = this.textEditor.core.html.get();
            this.noteData.attachments = this.ticketsService.ticket.ticketDraft.note_files;
            this.noteData.author = this.usersService.user;
            this.noteData.author_id = this.usersService.user.id;
            this.noteData.type = 'note';
            this.noteData.ticket_id_hash = this.ticketsService.ticket.ticket_id_hash;
            this.channedRepliesshowed = !!0;

            if (this.noteData.note || this.noteData.attachments.length) {
                this.ticketsService.individualSubmitted = !!1;
                this.ticketsService.ticket.assigned_user = this.assignmentUser;
                this.ticketsService.ticket.assign_agent_id = this.noteData.assign_agent_id;
                const noteData: TicketNoteModule = (Object as any).assign({}, this.noteData);
                const ticket: TicketDtoInterface = (Object as any).assign({}, this.ticketsService.ticket);
                this.ticketsService.ticket.ticketDraft.note_files = [];
                this.ticketsService.ticket.ticketDraft.note = '';
                this.cloud.effect = 'noteSpin';
                setTimeout(() => {
                    this.socketService.setCommentData(noteData, ticket);
                    this.channedRepliesshowed = !!1;
                    this.noteData.note = '';
                    this.noteData.attachments = [];
                    ticket.ticketDraft.note_files = [];
                    ticket.ticketDraft.note = null;
                    this.draftService.addIndividualdraftData(ticket);
                    this.cloud.effect = 'noteSpin';
                    this.ticketsService.individualSubmitted = !!0;
                    this.noteData.status = 'closed';
                    this.cloud.effect = 'add_note';

                }, 500);
            }
            else {
                this.toastr.info(this.infoTexts.add_note, 'Info', this.defaultToastrParams);
            }
        }
    }

    public addNoteNoUndo(): void {
        this.mailboxId = this.mailBoxModel.getMailboxCurrentId();
        this.noteData.note = this.textEditor.core.html.get();
        this.noteData.attachments = this.ticketsService.ticket.ticketDraft.note_files;
        this.channedRepliesshowed = !!0;

        if (this.noteData.note || this.noteData.attachments.length) {
            this.showLoader.emit(!!1);
            this.ticketsService.individualSubmitted = !!1;
            this.cloud.effect = 'noteSpin';
            this.noteData.author_id = this.usersService.user.id;
            this.ticketsService.createNote(this.noteData, this.ticketsService.ticket.ticket_id_hash)
                .then((data: any): void => {
                    this.showLoader.emit(!!0);

                    if (data.success) {
                    this.channedRepliesshowed = !!1;
                    this.noteData.note = '';
                    this.noteData.attachments = [];
                    this.ticketsService.ticket.ticketDraft.note_files = [];
                    data.data.type = 'note';
                    this.ticketsService.ticketTimeline.unshift(data.data);
                    this.ticketsService.ticket.assigned_user = this.assignmentUser;
                    this.ticketsService.ticket.assign_agent_id = this.noteData.assign_agent_id;
                    this.changeInbox(1, !!1, !!1, this.noteData.status);
                    this.ticketsService.ticket.status = this.noteData.status;
                    this.activeTickets = this.noteData.status;
                    this.ticketsService.ticket.ticketDraft.note = '';
                    this.socketService.changeTicket(this.ticketsService.ticket.id, this.usersService.user.id, this.ticketsService.ticket, this.mailBoxModel.getCurrentStatus());
                    this.draftService.addIndividualdraftData(this.ticketsService.ticket);

                    if (!this.ticketsService.ticket.clear) {
                        this.ticketsService.currentTicketsStatus.emit(this.noteData.status);
                    } else {
                        this.ticketService.setIndividual(new Ticket());
                    }

                    if (this.ticketsService.ticket.id) {
                        this.checkPreferences();
                    }
                }

                    this.cloud.effect = 'noteSpin';
                    this.ticketsService.individualSubmitted = !!0;
                    this.noteData.status = 'closed';
                    this.cloud.effect = 'add_note';

            });
        } else {
            this.toastr.info(this.infoTexts.add_note, 'Info', this.defaultToastrParams);
        }
    }

    private checkPreferences() {
        if (this.usersPreferencesModel.userPreferences.assign_after_note && !this.noteData.assign_agent_id) {
            this.ticketsService.ticket.assigned_user = this.usersService.user;
            this.ticketsService.ticket.assign_agent_id = this.usersService.user.id;
            this.assignmentUser = this.usersService.user;
            this.noteData.assign_agent_id = this.usersService.user.id;
        }

        if (this.usersPreferencesModel.userPreferences.take_back_after_note || this.usersPreferencesModel.userPreferences.take_back_after_update) {
            this.ticketsService.ticket = null;
            this.ticketsService.tickets.reset();
            this.ticketsService.toTicketPage.emit(!!1);
        }
    }
}
