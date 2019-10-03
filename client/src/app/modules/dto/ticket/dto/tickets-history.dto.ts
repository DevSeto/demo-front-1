import {Injectable} from '@angular/core';
import {TicketHistory} from '../models/ticketsHistory.module';
import {TicketHistoryDtoInterface} from '../interfaces/ticket-history-dto.interface';

@Injectable()
export class TicketsHistory extends Array<TicketHistory> {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, TicketsHistory.prototype);
    }

    public not_viewed_count: number|null = null;
    public histories: Array<TicketHistoryDtoInterface> = [];

    public set: (ticketsHistory: TicketHistory) => void = (ticketsHistory: TicketHistory): void => {
        for (const history in ticketsHistory)
            this[history] = ticketsHistory[history];
    }

    public reset: () => void = (): void => {
        this.splice(0, this.length);
    }
}