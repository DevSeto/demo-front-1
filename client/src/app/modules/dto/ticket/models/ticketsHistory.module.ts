import {TicketHistoryDtoInterface} from '../interfaces/ticket-history-dto.interface';

export class TicketHistory {
    public not_viewed_count: number|null = null;
    public histories: Array<TicketHistoryDtoInterface>;
}