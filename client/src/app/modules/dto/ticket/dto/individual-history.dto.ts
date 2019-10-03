import {Injectable} from '@angular/core';
import {TicketHistory} from '../models/ticketsHistory.module';
import {TicketHistoryDtoInterface} from '../interfaces/ticket-history-dto.interface';

@Injectable()
export class IndividualHistory extends Array<TicketHistory> {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, IndividualHistory.prototype);
    }

    public set: (ticketsHistory: TicketHistoryDtoInterface) => void = (ticketsHistory: TicketHistoryDtoInterface): void => {
        for (const history in ticketsHistory)
            this[history] = ticketsHistory[history];
    }

    public reset: () => void = (): void => {
        this.splice(0, this.length);
    }
}