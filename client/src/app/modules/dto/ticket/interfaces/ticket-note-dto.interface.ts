import {UserDtoInterface} from '../../user';

export interface TicketNoteDtoInterface {

    author: UserDtoInterface;
    author_id: number|null;
    created_at: string|null;
    type: string|null;
    ticket_id_hash: string|null;
    deleted_at: string|null;
    id: number|null;
    email_status: string|null;
    status: string;
    note: any;
    assign_agent_id: number|null;
    ticket_id: number|null;
    updated_at: string;
    files: Array<string|null>;
    attachments: Array<any>;
    timeline: any;
    forwarding_emails: any;
    body: any;
    from_email: string;
    from_name: string;
}