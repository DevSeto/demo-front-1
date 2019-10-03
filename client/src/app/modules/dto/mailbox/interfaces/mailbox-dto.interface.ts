import {UserDtoInterface} from '../../user';

export interface MailboxDtoInterface {
    auto_bcc: number;
    auto_reply: number;
    auto_reply_body: string;
    auto_reply_subject: string|null;
    closed_tickets: number|null;
    draft_tickets_count: number|null;
    open_tickets: number|null;
    pending_tickets: number|null;
     open_tickets_count: number|null;
     spam_tickets_count: number|null;
     closed_tickets_count: number|null;
     pending_tickets_count: number|null;
    spam_tickets: number|null;
    attention_tickets_count: number|null;
    draft_tickets: number|null;
    created_at: string;
    creator_user_id: number;
    default: number;
    deleted_at: string|null;
    dns_name: string|null;
    email: string;
    dns_value: string;
    users: number|null;
    dns_verified: number;
    forward_address: string;
    forwarding_verified: number|string;
    from_name: string;
    id: number;
    name: string;
    showed: boolean;
    signature: string;
    updated_at: string;
    allowed_users: Array<null|UserDtoInterface>;
}