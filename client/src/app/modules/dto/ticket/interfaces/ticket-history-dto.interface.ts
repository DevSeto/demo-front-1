import {UserDtoInterface} from '../../user';
import {TicketDtoInterface} from './ticket-dto.interface';

export interface TicketHistoryDtoInterface {

    author: UserDtoInterface;
    author_id: number|null;
    created_at: string|null;
    history: string|null;
    individual: string|null;
    is_viewed: number|null;
    customer_id: number|null;
    id: number|null;
    note: string;
    mailbox_id: number|null;
    ticket_id: number|null;
    ticket: TicketDtoInterface;
    updated_at: string;
    text: string;
    customer: UserDtoInterface|null;
}