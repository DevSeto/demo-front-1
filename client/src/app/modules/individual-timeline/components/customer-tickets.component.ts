import {Component, OnInit} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {TicketDtoInterface, TicketTimeline} from '../../../dto';
import {TicketsService} from '../../../services/components/tickets.service';
import {UsersService} from '../../../services/components/users.service';
import {TicketsChildsComponent} from '../../../components/tickets/tickets-childs.component';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {Router} from '@angular/router';
import {NotificationsService} from '../../../services/components/notifications.service';
import {SocketService} from '../../../services/components/socket.service';
import { ActionGifService } from '../../../services/components/action-git.service';

@Component({
    selector: 'customer-tickets',
    templateUrl: '../html/customer-tickets.component.html',
})

export class CustomerTickets extends TicketsChildsComponent implements OnInit {

    public cloud: any = showed;
    public availableHeight: number = 0;

    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                public ticketsService: TicketsService,
                public router: Router,
                public usersService: UsersService,
                public notificationsService: NotificationsService,
                public socketService: SocketService,
                public actionGifService: ActionGifService,
                public mailboxService: MailBoxService) {
        super(ticketsService, usersService, mailboxService, labelService, router, notificationsService, socketService, actionGifService);
    }

    public ngOnInit(): void {
        // this.getTicketCustomerTickets(this.ticketsService.ticket);
    }

    public individualMerge(ticket: TicketDtoInterface): void {
        this.ticketsService.mergeMasterTicket = this.ticketService.ticket;
        this.ticketsService.readyForMerge = ticket;
        this.cloud.effect = 'mergeTicket';
    }

    public redirectToTicketPage(ticketId: number): void {
        this.ticketService.ticketTimeline = [] as TicketTimeline;
        this.router.navigate(['/ticket', ticketId]);

    }

    public previousTicketsHeight(): void {
        this.availableHeight = this.ticketsService.individualHistory.length ? window.innerHeight - 266 : window.innerHeight - 225;
        this.cloud.effect = 'open_previous_ticket';

        if (this.cloud.effect.individual_history)
            this.cloud.effect = 'individual_history';

        const customerTickets = document.querySelector('customer-tickets');
        customerTickets.parentNode.appendChild(customerTickets);
    }
}
