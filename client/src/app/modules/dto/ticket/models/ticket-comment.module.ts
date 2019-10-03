import {TicketCommentDtoInterface} from '../interfaces/ticket-comment-dto.interface';
import {UserDtoInterface} from '../../user/index';

export class TicketCommentModule implements TicketCommentDtoInterface {

    public author: UserDtoInterface;
    public author_id: number|null = null;
    public comment_id: number|null = null;
    public forwarding_emails: Array<string|null> = [];
    public forwarding_addresses: Array<string|null> = [];
    public body: string = '';
    public created_at: string|null = '';
    public deleted_at: string|null = '';
    public type: string|null = '';
    public from_email: string = '';
    public email_status: string|null = '';
    public from_name: string = '';
    public forward: number|null = null;
    public id: number|null = null;
    public status: string = 'closed';
    public ticket_id_hash: string = '';
    public assign_agent_id: number|null = 0;
    public ticket_id: number|null = null;
    public updated_at: string = '';
    public is_forwarded: string = '';
    public attachments: Array<any> = [];
    public files: Array<string|null> = [];
    public note: string;
    public timeline: any;

}
