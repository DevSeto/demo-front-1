import {TicketDraftDtoInterface} from '../interfaces/ticket-draft-dto.interface';

export class NewTicketDraftModule implements TicketDraftDtoInterface {

    public reply: string|null = '';
    public forward: string|null = '';
    public customer_email: string|null = '';
    public subject: string|null = '';
    public body: string|null = '';
    public customer_name: string|null = '';
    public forwarding_emails: Array<string|null> = [];
    public note: string|null = '';
    public created_at: string|null = null;
    public deleted_at: string|null = null;
    public ticket_id: number|null = null;
    public id: number|null = null;
    public updated_at: string = '';
}