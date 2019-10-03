import {Injectable} from '@angular/core';
import {TicketDtoInterface} from '../interfaces/ticket-dto.interface';
import {TicketModule} from '../models/ticket.module';

type TICKET = Array<TicketDtoInterface>;

@Injectable()
export class Tickets extends Array<TicketModule> implements TICKET {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, Tickets.prototype);
    }

    public set: (tickets: TICKET) => void = (tickets: TICKET): void => {
        for (const ticket in tickets) {
            if (!this.isFunction(this[ticket])) {
                this[ticket] = tickets[ticket];
            }
        }
    }

    public reset: () => void = (): void => {
        this.splice(0, this.length);
    }

    private  isFunction(functionToCheck: any): boolean {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
}