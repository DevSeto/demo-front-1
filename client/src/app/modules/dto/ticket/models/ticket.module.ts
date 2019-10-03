import {UserDtoInterface} from '../../user';
import {TicketLabelDtoInterface} from '../../label';
import {TicketCommentDtoInterface} from '../interfaces/ticket-comment-dto.interface';
import {TicketNoteDtoInterface} from '../interfaces/ticket-note-dto.interface';
import {AssignedUser} from '../dto/assigned-user.dto';
import {MergedTicketDtoInterface} from '../interfaces/merged-ticket-dto.interface';
import {TicketDraftDtoInterface} from '../interfaces/ticket-draft-dto.interface';
import {TicketDraftModule} from './ticket-draft.module';

export class TicketModule {
    public all_email_data: string = '';
    public assign_agent_id: number = 0;
    public assigned_user: UserDtoInterface = new AssignedUser();
    public isTrCop: boolean = !!0;
    public body: string = '';
    public color: string|null = null;
    public comments: Array<TicketCommentDtoInterface> = [];
    public created_at: string|null = null;
    public customer_email: string = '';
    public clear: boolean|null = null;
    public customer_id: number|null = null;
    public customer_name: string = '';
    public deleted_at: string|null = null;
    public files: Array<any> = [];
    public comments_count: number|null = null;
    public notes_count: number|null = null;
    public id: number|null = null;
    public draft_id: number|null = null;
    public in_reply_to: string = '';
    public is_demo: number|null = null;
    public attachments: Array<any> = [];
    public labels: Array<TicketLabelDtoInterface> = [];
    public mailbox_id: number|null = null;
    public merged: number = 0;
    public merged_tickets: Array<MergedTicketDtoInterface> = [];
    public message_id: string = '';
    public notes: Array<TicketNoteDtoInterface> = [];
    public server_time: string|null = null;
    public owner_id: number = 0;
    public snooze: any = null;
    public status: string = '';
    public ticketDraft: TicketDraftDtoInterface = new TicketDraftModule();
    public ticketTrCop: TicketDraftDtoInterface = new TicketDraftModule();
    public subject: string = '';
    public ticket_id_hash: string = '';
    public updated_at: string = '';
    public viewed: number = 0;
    public opened_count: number = 0;
    [key: string]: any
}