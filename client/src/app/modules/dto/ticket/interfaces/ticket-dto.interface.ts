import {UserDtoInterface} from '../../user';
import {TicketCommentDtoInterface} from './ticket-comment-dto.interface';
import {MergedTicketDtoInterface} from './merged-ticket-dto.interface';
import {TicketNoteDtoInterface} from './ticket-note-dto.interface';
import {TicketLabelDtoInterface} from '../../label';
import {TicketDraftDtoInterface} from './ticket-draft-dto.interface';

export interface TicketDtoInterface {

    all_email_data: string;
    assign_agent_id: number;
    assigned_user: UserDtoInterface;
    body: string;
    color: string|null;
    comments: Array<TicketCommentDtoInterface>;
    created_at: string|null;
    customer_email: string;
    customer_id: number|null;
    customer_name: string;
    deleted_at: string|null;
    files: Array<any>;
    attachments: Array<any>;
    id: number|null;
    comments_count: number|null ;
    notes_count: number|null ;
    draft_id: number|null ;
    in_reply_to: string;
    clear: boolean|null;
    is_demo: number|null;
    labels: Array<TicketLabelDtoInterface>;
    mailbox_id: number|null;
    merged: number;
    merged_tickets: Array<MergedTicketDtoInterface>;
    message_id: string;
    notes: Array<TicketNoteDtoInterface>;
    server_time: string|null ;
    owner_id: number;
    isTrCop: boolean;
    snooze: any;
    status: string;
    ticketDraft: TicketDraftDtoInterface;
    ticketTrCop: TicketDraftDtoInterface;
    subject: string;
    ticket_id_hash: string;
    updated_at: string;
    opened_count: number;
    viewed: number;
    [key: string]: any;
}
