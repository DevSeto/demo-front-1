import {Injectable} from '@angular/core';
import {TicketDtoInterface} from '../interfaces/ticket-dto.interface';
import {TicketModule} from '../models/ticket.module';
type TICKET = Array<TicketDtoInterface>;

@Injectable()
export class CustomerTickets extends Array<TicketModule> implements TICKET {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, CustomerTickets.prototype);
    }

    public set: (tickets: TICKET) => void = (tickets: TICKET): void => {
        for (const ticket in tickets)
            this[ticket] = tickets[ticket];
    }

    public reset: () => void = (): void => {
        this.splice(0, this.length);
    }
}