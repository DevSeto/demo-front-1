import {Injectable, EventEmitter} from '@angular/core';
import {UsersModel} from '../../models/components/users.model';
import {Label} from '../../dto';
import {DtoMailboxModel} from '../../modules/dto/mailbox/models/mailbox.model';
import {MailBoxService} from './mailbox.service';
import {TicketDtoInterface} from '../../modules/dto/ticket/interfaces/ticket-dto.interface';
import {TicketsService} from './tickets.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {SocketService} from './socket.service';
import {UsersService} from './users.service';
import {TicketsModel} from '../../models/components/tickets.model';
import {UsersPreferencesModel} from '../../models/components/usersPreferences.model';

@Injectable()
export class DraftService {

    public subdomain: string;
    public user_id: number;
    public socket: any;
    public isDraft: EventEmitter<boolean> = new EventEmitter<boolean>();
    public newDraftId: EventEmitter<number> = new EventEmitter<number>();
    public mailboxDraftData: Array<any> = [];

    constructor(private mailBoxModel: MailBoxModel,
                public ticketService: TicketsService,
                public usersPreferencesModel: UsersPreferencesModel,
                public socketService: SocketService,
                public ticketsModel: TicketsModel,
                public usersService: UsersService,
                public mailboxService: MailBoxService,
                private usersModel: UsersModel,
                public labels: Label) {
    }

    public draftEvents() {

        this.socketService.isDraft.subscribe((data: boolean) => {
            this.isDraft.emit(!!1);
            this.addIndividualdraftData();
        });

        this.socket.on('deleteIndividualTicketDraft', (data: any) => {
            if (this.ticketService.filterticketsStatus === 'draft' && data.data.draft_id && this.mailBoxModel.getMailboxCurrentId() === data.data.mailbox_id) {
                for (const ticketlist in this.ticketService.tickets) {
                    if (this.ticketService.tickets.hasOwnProperty(ticketlist)) {
                        const index = parseInt(ticketlist, 0);
                        if (this.ticketService.tickets[index].draft_id === data.data.draft_id) {
                            this.ticketService.tickets.splice(index, 1);
                        }
                    }
                }
            }

            let count: number = -1;
            if (data.count) {
                count = -1 * data.count;
            }

            this.changeInbox(count, 'draft', data.data.mailbox_id);
        });

        this.socket.on('mailboxDraftData', (data: any) => {
            const BreakException: any = {};

            this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
                try {
                    if (mailbox.id === data.mailbox_id) {
                        if (data.drafts) {
                            this.mailboxService.mailboxes[index].draft_tickets_count = data.drafts.length;
                        } else {
                            this.mailboxService.mailboxes[index].draft_tickets_count = 0;
                        }

                        this.mailboxDraftData[mailbox.id] = this.mailboxService.mailboxes[index].draft_tickets_count;
                        throw BreakException;
                    }
                } catch (e) {
                    if (e !== BreakException) throw e;
                }
            });

            if (data && this.mailBoxModel.getMailboxCurrentId() === data.mailbox_id && this.ticketService.filterticketsStatus === 'draft' && data.drafts && data.drafts.length) {
                this.ticketService.tickets.reset();
                data.drafts.forEach((draft: any, index: number): void => {
                    data.drafts[index] = JSON.parse(draft);
                });
                this.ticketService.tickets.set(data.drafts);
            }
        });

        this.socket.on('removeIndividualTicketDraft', (data: any) => {
            this.changeInbox(-1, 'draft', data.data.mailbox_id);
            if (this.ticketService.filterticketsStatus === 'draft' && data.data.ticketId) {
                for (const ticketlist in this.ticketService.tickets) {
                    if (this.ticketService.tickets.hasOwnProperty(ticketlist)) {
                        const index = parseInt(ticketlist, 0);
                        if (this.ticketService.tickets[index].id === data.data.ticketId) {
                            this.ticketService.tickets.splice(index, 1);
                        }
                    }
                }
            }
        });

        this.socket.on('checkIndividualTicketDraftClient', (data: any) => {
            if (this.ticketService.ticket.status !== this.mailBoxModel.getCurrentStatus() && (!data.data || !data.data.individualDraft.isDraft)) {
                this.ticketService.currentTicketsStatus.emit(this.ticketService.ticket.status);
            }else if (data.data && data.data.individualDraft.isDraft && this.mailBoxModel.getCurrentStatus() === 'draft'){
                this.ticketService.currentTicketsStatus.emit('draft');

            }
            this.setDraftDataToFront(data);
        });

        this.socket.on('sendIndividualTicketDraftClient', (data: any) => {
            this.setDraftDataToFront(data);
        });

        this.socket.on('sendCreateTicketDraftClient', (data: any) => {
            this.newDraftId.emit(data.data.individualDraft.draft_id);
        });

        this.socket.on('moveComments', (data: any) => {
            const newCommentDom: any = data.data.data;
            if (data.data && this.ticketService.ticket && newCommentDom.ticket_id_hash === this.ticketService.ticket.ticket_id_hash && this.ticketService.ticketTemporaryTimeline.length) {
                this.ticketService.ticketTemporaryTimeline.forEach((comments: any, index: number) => {
                    if (comments.commentId === newCommentDom.commentId) {
                        this.ticketService.ticketTemporaryTimeline.splice(index, 1);
                    }
                });

                const comment: any = this.ticketsModel.extractDataForUrl(data.res.data);
                comment.type = newCommentDom.type;
                this.ticketService.ticketTimeline.unshift(comment);

                if (
                    (
                        this.usersPreferencesModel.userPreferences.take_back_after_reply
                        && newCommentDom.type === 'comment'
                        && (newCommentDom.is_forwarded === '0' || !newCommentDom.is_forwarded)
                    )
                    ||
                    (
                        this.usersPreferencesModel.userPreferences.take_back_after_note
                        && newCommentDom.type === 'note'
                    )
                    || this.usersPreferencesModel.userPreferences.take_back_after_update
                ) {
                    this.ticketService.ticket = null;
                    this.ticketService.tickets.reset();
                    this.ticketService.toTicketPage.emit(!!1);
                }
            }

            this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
                if (mailbox.id === data.mailboxId) {
                    this.mailboxService.mailboxes[index][data.ticket.status + '_tickets_count'] = this.mailboxService.mailboxes[index][data.ticket.status + '_tickets_count'] - 1;
                    this.mailboxService.mailboxes[index][newCommentDom.status + '_tickets_count'] = this.mailboxService.mailboxes[index][newCommentDom.status + '_tickets_count'] + 1;
                }
            });

            const oldStatus = data.ticket.status;
            data.ticket.status = newCommentDom.status;
            if (
                (
                    (
                        this.usersPreferencesModel.userPreferences.assign_after_reply
                        && newCommentDom.type === 'comment'
                        && (newCommentDom.is_forwarded === '0' || !newCommentDom.is_forwarded)
                    )
                    ||
                    (
                        this.usersPreferencesModel.userPreferences.assign_after_note
                        && newCommentDom.type === 'note'
                    )
                )

                && !newCommentDom.assign_agent_id
                && this.ticketService.ticket
            ) {
                data.ticket.assigned_user = this.usersService.user;
                data.ticket.assign_agent_id = this.usersService.user.id;
                this.ticketService.ticket.assigned_user = this.usersService.user;
                this.ticketService.ticket.assign_agent_id = this.usersService.user.id;
                this.ticketService.changeassignment.emit(this.usersService.user);
            }

            this.socketService.changeTicket(data.ticket.id, this.user_id, data.ticket, oldStatus);
        });
    }

    public setDraftDataToFront(data: any) {
        if (data.data) {
            this.ticketService.ticket.draft_id = data.data.individualDraft.draft_id;
            this.ticketService.ticket.ticketDraft = data.data.individualDraft.ticketDraft;
            if (data.data.individualDraft.isDraft && data.data.individualDraft.ticketDraft) {
                this.isDraft.emit(!!1);
            }
        }
    }

    /**
     * send data after key up  individual textarea
     */

    public typing: boolean = false;
    public timeout: any = undefined;

    public timeoutFunction(socketData: any, emitName: string) {
        this.typing = false;
        this.socket.emit(emitName, socketData);
    }

    public addIndividualdraftData(ticketData ?: TicketDtoInterface, reset?: boolean): void {
        let ticket: TicketDtoInterface = this.ticketService.ticket;
        if (ticketData) {
            ticket = ticketData;
        }

        const draftData: any = ticket.ticketDraft;

        draftData.ticket_id = ticket.id;
        draftData.subdomain = this.usersService.company.subdomain;
        draftData.draft_id = ticket.draft_id;
        draftData.forward_emails = draftData.forwarding_emails;

        const socketData: any = {
            user_id: this.user_id,
            ticket,
            room: this.subdomain,
            user_token: this.usersModel.getToken(),
            draft_id: draftData.draft_id,
            encriptData: draftData,
        };
        // if (!this.ticketService.ticket.isTrCop || reset){
        // }
        if (!this.checkEventKey && !ticket.draft_id) {
            this.checkEventKey = !!1;
            this.socket.emit('setindividualdraftData', socketData);
            setTimeout(() => {
                this.checkEventKey = !!0;
            }, 600);
        } else if (ticket.draft_id) {
            this.socket.emit('setindividualdraftData', socketData);
            this.checkEventKey = !!0;
        }
    }

    public destroyIndividualPage(): void {
        // console.log(this.ticketService.ticket)
        if (this.socket && this.ticketService.ticket) {
            this.socket.emit('setIndividualDraftToRedis');
            this.checkEventKey = !!0;
        }
    }

    public getIndividualTicketDrafts(ticketId: number, mailBoxId: number): void {
        if (this.socket) {
            this.socket.emit('getIndividualTicketDrafts',
                [
                    this.subdomain,
                    this.user_id,
                    mailBoxId,
                    ticketId,
                ]);
        }
    }

    public deleteDraftTicket(ticketIds: Array<number>, mailBoxId: number): void {
        if (this.socket) {
            this.changeInbox(-1 * ticketIds.length, 'draft', mailBoxId);
            this.socket.emit('deleteDraftTicket',
                {
                    room: this.subdomain,
                    user_id: this.user_id,
                    mailbox_id: mailBoxId,
                    ticketIds,
                });
        }
    }

    public deleteDraftByTicketId(ticketIds: Array<number>, mailBoxId: number): void {
        if (this.socket) {
            this.socket.emit('deleteDraftByTicketId',
                {
                    room: this.subdomain,
                    user_id: this.user_id,
                    mailbox_id: mailBoxId,
                    ticketIds,
                });
        }
    }

    public getDrafts(mailBoxId: number): void {
        this.socket.emit('getDrafts', {
            room: this.subdomain,
            userId: this.user_id,
            mailBoxId,
        });
    }

    public checkEventKey: boolean = !!0;

    public destroyTicketModal(): void {
        this.checkEventKey = !!0;
        this.socket.emit('sendNewTicketDraftData');
    }

    /**
     * send data after key up all input in form
     * @param {TicketDtoInterface} ticket
     */
    public newDate: any ;
    public newTicketDraft(ticket: TicketDtoInterface): void {
        const sendData: any = {
            user_id: this.user_id,
            mailbox_id: ticket.mailbox_id,
            draft_id: ticket.draft_id,
            ticket,
            mailboxes: this.mailboxService.mailboxes,
            room: this.subdomain,
            user_token: this.usersModel.getToken(),

        };

        if (!this.checkEventKey) {
            this.socket.emit('newTicketDraft', sendData);
            this.checkEventKey = !!1;
            setTimeout(() => {
                this.checkEventKey = !!0;
            }, 600);
        } else if (ticket.draft_id) {
            this.socket.emit('newTicketDraft', sendData);
            this.checkEventKey = !!0;
        }
    }

    public clearTicketDestroy(): void {
        this.socket.emit('clearTicketDestroy', {user_id: this.user_id});
    }

    public changeInbox(count: number, status: any, mailboxId: number): void {
        this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
            if (mailbox.id === mailboxId && this.mailboxService.mailboxes[index][status + '_tickets_count'] + count >= 0) {
                this.mailboxService.mailboxes[index][status + '_tickets_count'] = this.mailboxService.mailboxes[index][status + '_tickets_count'] + count;
                this.mailboxDraftData[mailbox.id] = this.mailboxService.mailboxes[index].draft_tickets_count;
            }
        });
    }
}
