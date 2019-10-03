import {TicketDtoInterface} from './ticket-dto.interface';
import {MergedTicketModule} from '../models/merged-ticket.module';

export interface MergedTicketDtoInterface {

    batch: string;
    created_at: string|null;
    deleted_at: string|null;
    id: number|null;
    master_ticket_id: number|null;
    ticket: TicketDtoInterface;
    ticket_id: number;
    updated_at: string;
}

export interface MergedTicketFirstDtoInterface {

    created_at: string ;
    merged_tickets_data: MergedTicketModule;
    type: string|null ;
}
