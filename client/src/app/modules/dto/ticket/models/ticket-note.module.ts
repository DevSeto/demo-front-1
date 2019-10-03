import {UserDtoInterface} from '../../user/index';
import {TicketNoteDtoInterface} from '../interfaces/ticket-note-dto.interface';

export class TicketNoteModule implements TicketNoteDtoInterface {

    public author: UserDtoInterface;
    public author_id: number|null = null;
    public created_at: string|null = null;
    public type: string|null = null;
    public ticket_id_hash: string|null = null;
    public deleted_at: string|null = null;
    public is_forwarded: string = '';
    public id: number|null = null;
    public status: string = 'closed';
    public email_status: string|null = '';
    public note: string = '';
    public ticket_id: number|null = null;
    public assign_agent_id: number|null = null;
    public updated_at: string = '';
    public attachments: Array<any> = [];
    public files: Array<string|null> = [];
    public body: any;
    public forwarding_emails: any;
    public timeline: any;
    public from_email: string;
    public from_name: string;
}