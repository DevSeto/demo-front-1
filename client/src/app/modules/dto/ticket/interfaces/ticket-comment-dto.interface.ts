import {UserDtoInterface} from '../../user';

export interface TicketCommentDtoInterface {

    author: UserDtoInterface;
    author_id: number|null;
    comment_id: number|null;
    forwarding_emails: Array<string|null>;
    body: string;
    type: string|null;
    created_at: string|null;
    deleted_at: string|null;
    from_email: string;
    email_status: string|null;
    from_name: string;
    forward: number|null;
    id: number|null;
    status: string;
    ticket_id_hash: string;
    ticket_id: number|null;
    assign_agent_id: number|null;
    updated_at: string;
    is_forwarded: string;
    attachments: Array<any>;
    files: Array<string|null>;
    timeline: any;
}
