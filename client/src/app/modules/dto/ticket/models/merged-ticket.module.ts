import {MergedTicketDtoInterface} from '../interfaces/merged-ticket-dto.interface';
import {TicketDtoInterface} from '../interfaces/ticket-dto.interface';

export class MergedTicketModule implements MergedTicketDtoInterface {

    public batch: string = '';
    public created_at: string|null = null;
    public deleted_at: string|null = null;
    public id: number|null = null;
    public master_ticket_id: number|null = null;
    public ticket: TicketDtoInterface;
    public ticket_id: number = null;
    public updated_at: string = null;
}
