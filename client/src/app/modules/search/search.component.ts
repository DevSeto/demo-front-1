import {Component, OnInit} from '@angular/core';
import {TicketsService} from '../../services/components/tickets.service';
import {TicketDtoInterface} from '../dto/ticket/interfaces/ticket-dto.interface';
import {Router} from '@angular/router';
import {NotificationsService} from '../../services/components/notifications.service';

@Component({
    selector: 'search-tickets',
    templateUrl: './search.component.html',
})

export class SearchTickets implements OnInit {

    public opendrop: boolean = !!0;
    public searchedTickets: Array<TicketDtoInterface> = [];

    constructor(public ticketsService: TicketsService,
                public notificationsService: NotificationsService,
                public router: Router) {
    }

    public ngOnInit(): void {}

    public search(value: any): void {
        if (value.trim().length) {
            this.ticketsService.searchTickets(value)
                .then((data: any) => {
                    if (data.success)
                        this.searchedTickets = data.data;
                });
        } else {
            this.searchedTickets = [];
        }
    }

    public redirectToTicketPage(ticket: TicketDtoInterface): void {
        this.searchedTickets = [];
        this.router.navigate(['/ticket', ticket.id]);
    }
}