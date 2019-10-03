import {TicketDraftDtoInterface} from '../interfaces/ticket-draft-dto.interface';
import {TicketCommentModule} from './ticket-comment.module';

export class TicketDraftModule implements TicketDraftDtoInterface {

    public reply: string|null = '';
    public forward: string|null = '';
    public customer_email: string|null = '';
    public subject: string|null = '';
    public body: string|null = '';
    public customer_name: string|null = '';
    public forwarding_emails: Array<string|null> = [];
    public comment_files: Array<any> = [];
    public forward_files: Array<any> = [];
    public note_files: Array<any> = [];
    public note: string|null = '';
    public created_at: string|null = null;
    public deleted_at: string|null = null;
    public ticket_id: number|null = null;
    public id: number|null = null;
    public comment_id: number|null = null;
    public cop_id: number|null = null;
    public updated_at: string = '';
    public commentData: TicketCommentModule|null;
}
