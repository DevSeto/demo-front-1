import {UserDtoInterface} from '../../user';

export class DtoMailboxModel {

    public auto_bcc: number = 2;
    public auto_reply: number = 3;
    public auto_reply_body: string = '';
    public auto_reply_subject: string|null = '';
    public closed_tickets: number|null;
    public open_tickets: number|null;
    public open_tickets_count: number|null;
    public spam_tickets_count: number|null;
    public closed_tickets_count: number|null;
    public pending_tickets_count: number|null;
    public pending_tickets: number|null;
    public spam_tickets: number|null;
    public attention_tickets_count: number|null;
    public draft_tickets_count: number|null;
    public draft_tickets: number|null;
    public created_at: string;
    public creator_user_id: number;
    public default: number;
    public deleted_at: string|null;
    public dns_name: string|null;
    public email: string;
    public dns_value: string;
    public dns_verified: number;
    public forward_address: string;
    public from_name: string;
    public users: null|number = 3;
    public id: number;
    public name: string;
    public signature: string = '';
    public forwarding_verified: number|string;
    public showed: boolean;
    public updated_at: string;
    public allowed_users: Array<null|UserDtoInterface> = [];

}