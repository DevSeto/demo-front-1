import {TicketCommentModule} from '..';

export interface TicketDraftDtoInterface {

    reply: string|null ;
    customer_name: string|null;
    customer_email: string|null;
    subject: string|null;
    body: string|null;
    forward: string|null;
    forwarding_emails: Array<string|null>;
    forward_files: Array<any>;
    comment_files: Array<any>;
    note_files: Array<any>;
    note: string|null ;
    created_at: string|null;
    deleted_at: string|null;
    comment_id: number|null ;
    id: number|null ;
    cop_id: number|null ;
    ticket_id: number|null ;
    updated_at: string ;
    commentData: TicketCommentModule|null;
}
