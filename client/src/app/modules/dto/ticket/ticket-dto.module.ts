import {NgModule} from '@angular/core';
import {
    AssignedUser,
    TicketModule,
    MergedTicketModule,
    Ticket,
    TicketsNotification,
    IndividualHistory,
    TicketDraftModule,
    TicketCommentModule,
    TicketTimeline,
    TicketNoteModule,
    TicketsHistory,
    Tickets,
} from './';
import {CustomerTickets} from './dto/customer-tickets.dto';

@NgModule({
    providers: [
        AssignedUser,
        TicketModule,
        MergedTicketModule,
        TicketsNotification,
        IndividualHistory,
        Ticket,
        TicketDraftModule,
        TicketCommentModule,
        CustomerTickets,
        TicketTimeline,
        TicketNoteModule,
        TicketsHistory,
        Tickets,
    ],
})

export class TicketDtoModule { }
