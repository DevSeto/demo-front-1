import {Injectable} from '@angular/core';
import {TicketCommentDtoInterface} from '../interfaces/ticket-comment-dto.interface';
import {MergedTicketDtoInterface} from '../interfaces/merged-ticket-dto.interface';
import {TicketNoteDtoInterface} from '../interfaces/ticket-note-dto.interface';
import {TicketDtoInterface} from '../interfaces/ticket-dto.interface';
import {AssignedUser} from './assigned-user.dto';
import {UserDtoInterface} from '../../user';
import {TicketLabelDtoInterface} from '../../label';
import {TicketDraftModule} from '../models/ticket-draft.module';
import {TicketDraftDtoInterface} from '../interfaces/ticket-draft-dto.interface';

@Injectable()
export class Ticket implements TicketDtoInterface {

    constructor() {
        this.call();
    }

    public all_email_data: string;
    public assign_agent_id: number = 0;
    public assigned_user: UserDtoInterface;
    public body: string;
    public color: string|null = '#ec87bf';
    public comments: Array<TicketCommentDtoInterface> = [];
    public created_at: string|null = null;
    public customer_email: string;
    public customer_id: number|null = null;
    public customer_name: string;
    public deleted_at: string|null = null;
    public files: Array<any> = [];
    public attachments: Array<any> = [];
    public id: number|null = null;
    public isTrCop: boolean = !!0;
    public in_reply_to: string = '';
    public is_demo: number|null = null;
    public comments_count: number|null = null;
    public draft_id: number|null = null;
    public notes_count: number|null = null;
    public clear: boolean|null = null;
    public labels: Array<TicketLabelDtoInterface> = [];
    public mailbox_id: number|null;
    public merged: number = 0;
    public merged_tickets: Array<MergedTicketDtoInterface> = [];
    public message_id: string = '';
    public notes: Array<TicketNoteDtoInterface> = [];
    public owner_id: number = 0;
    public server_time: string|null = null;
    public snooze: string|null = null;
    public status: string;
    public subject: string;
    public ticket_id_hash: string = '';
    public updated_at: string = '';
    public opened_count: number = 0;
    public viewed: number = 0;
    public ticketDraft: TicketDraftDtoInterface = new TicketDraftModule();
    public ticketTrCop: TicketDraftDtoInterface = new TicketDraftModule();
    public cop_id: any;
    public cc: Array<string|null> = [];
    public bcc: Array<string|null> = [];

    public set: (tickets: TicketDtoInterface) => void = (tickets: TicketDtoInterface): void => {
        for (const ticket in tickets)
            this[ticket] = tickets[ticket];
    }

    public resetTicket(): any {
        this.call();
    }

    private call(): void {
        this.all_email_data = '';
        this.assign_agent_id = 0;
        this.assigned_user = new AssignedUser();
        this.body = '';
        this.status = '';
        this.subject = '';
        this.customer_email = '';
        this.customer_name = '';
        this.mailbox_id = null;
        this.cc = [];
        this.bcc = [];
    }
}
