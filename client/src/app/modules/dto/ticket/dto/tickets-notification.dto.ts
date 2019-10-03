import {Injectable} from '@angular/core';
import {GeneralNotificationModule} from '../models/general-notification.module';
import {TicketModule} from '../models/ticket.module';

@Injectable()
export class TicketsNotification extends GeneralNotificationModule {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, TicketsNotification.prototype);
    }

    public set: (ticketsNotification: GeneralNotificationModule) => void = (ticketsNotification: GeneralNotificationModule): void => {
        for (const notification in ticketsNotification)
            this[notification] = ticketsNotification[notification];
    }

    public reset: () => void = (): void => {
        // this.splice(0, this.length);
    }
}