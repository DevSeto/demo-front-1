import {Component} from '@angular/core';
import {TicketsService} from '../../services/components/tickets.service';
import {TicketsGlobalRequestsComponent} from '../ticket-golbal-request/ticket-global-requests.component';
import {UsersService} from '../../services/components/users.service';
import {MailBoxService} from '../../services/components/mailbox.service';
import {TicketDtoInterface} from '../../modules/dto/ticket';
import {LabelsService} from '../../services/components/labels.service';
import {LabelDtoInterface} from '../../modules/dto/label';
import {Router} from '@angular/router';
import {NotificationsService} from '../../services/components/notifications.service';
import {SocketService} from '../../services/components/socket.service';
import { ActionGifService } from '../../services/components/action-git.service';

@Component({
    selector: 'tickets-Childs',
    template: '',
})

export class TicketsChildsComponent extends TicketsGlobalRequestsComponent {

    public timedate: string = '';
    public forEvent: boolean = !!1;
    public selectedLabels: any = [];
    public selectedTicketsCount: any = 0;

    public selectedTicketsId: Array<string> = [];
    public snoozeTime: any = {
        fourHour: '1',
        tomorrowMorning: '2',
        tomorrowMidDay: '3',
        twoDays: '4',
        fourDays: '5',
        oneWeek: '6',
    };

    public statusList: Array<string> = [
        'open',
        'pending',
        'closed',
        'spam',
    ];

    public defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public infoTexts: any = {
        reply: 'You cannot send an empty reply.',
        add_note: 'You cannot send an empty note.',
        forward: 'You cannot send an empty forward.',
        invalidForwardEmail: 'Invalid email address.',
        forwardEmail: 'You cannot send an empty forward.',
        forwardTo: 'Please, write an email address you are forwarding to.',
    };

    constructor(public ticketService: TicketsService,
                public userService: UsersService,
                public mailboxService: MailBoxService,
                public labelsService: LabelsService,
                public router: Router,
                public notificationsService: NotificationsService,
                public socketService: SocketService,
                public actionGifService: ActionGifService) {
        super(ticketService, userService, mailboxService, router, socketService);
        console.log(this);

        this.socketService.changeSelectedTickets.subscribe((data: boolean) => {
            this.selectedTickets.main = [];
            if (this.ticketService.tickets) {
                this.ticketService.tickets.forEach((ticket: TicketDtoInterface, index: number) => {
                    if (ticket.checked) {
                        this.selectedTickets.main.push(ticket);
                    }
                });
            }
        });
    }

    public getSelectedTickets() {
        console.log("getSelectedTickets")
        this.selectedTickets.main = [];
        if (this.selectedTicketsId.length === this.ticketService.tickets.length) {
            this.selectAllTickets(!!1);
        } else {
            this.selectAllTickets(!!0);
            this.ticketService.tickets.forEach((ticket: TicketDtoInterface, index: number): void => {
                if ((this.selectedTicketsId as any).includes(ticket.ticket_id_hash)) {
                    this.ticketService.tickets[index].checked = !!1;
                    this.selectedTickets.main.push(ticket);
                }
            });
        }

        this.selectedTicketsId = [];
    }

    /**
     *  ticket checkbox part
     * @param {boolean} checked
     * @param ticket
     * @param index
     */
    public selectTicket(checked: boolean, ticket: any, index: any): void {
        let counter: number = 1;
        if (checked) {
            this.ticketService.tickets[index].checked = !!1;
            this.selectedTickets.main.push(ticket);
        } else {
            counter = -1;
            this.ticketService.tickets[index].checked = !!0;
            for (const tick in this.selectedTickets.main) {
                if (this.selectedTickets.main[tick].id === ticket.id) {
                    this.selectedTickets.main.splice(tick, 1);
                }
            }
        }
        // console.log("assad222",this.selectedTickets.main.length)

        if (this.selectedTickets.main.length === 1 && this.activeTickets !== 'draft')
        {
            this.getTicketCustomerTickets(this.selectedTickets.main[0]);
        }
        if (ticket.labels) {
            this.setOrUnsetLabelcount(ticket.labels, counter);
        }

        this.labelsService.inactiveLabel.selectedTicketsCount = this.selectedTickets.main.length;

        if (this.selectedTickets.main.length < this.ticketService.tickets.length) {
            this.selectMenu.selectAllTickets = !!0;
        } else if (this.selectedTickets.main.length === this.ticketService.tickets.length) {
            this.selectMenu.selectAllTickets = !!1;
        }
    }

    public selectAllTickets(property: boolean): void {
        this.selectedTickets.main = [];
        this.selectMenu.selectAllTickets = property;
        if (property) {
            Object.keys(this.ticketService.tickets).forEach((ticket: any, index: number): void => {
                if (this.ticketService.tickets[index]) {
                    this.selectedTickets.main.push(this.ticketService.tickets[index]);
                    this.ticketService.tickets[index].checked = !!1;
                    if (this.ticketService.tickets[index].labels) {
                        this.setOrUnsetLabelcount(this.ticketService.tickets[index].labels, 1);
                    }
                }
            });
        } else {
            Object.keys(this.ticketService.tickets).forEach((ticket: any, index: number): void => {
                if (this.ticketService.tickets[index]) {
                    this.ticketService.tickets[index].checked = !!0;
                    if (this.ticketService.tickets[index].labels) {
                        this.setOrUnsetLabelcount(this.ticketService.tickets[index].labels, -1);
                    }
                }
            });
        }

        this.labelsService.inactiveLabel.selectedTicketsCount = this.selectedTickets.main.length;
    }

    public setOrUnsetLabelcount(labels: Array<LabelDtoInterface>, counter: number): void {
        labels.forEach((label: any): void => {
            this.labelsService.mergeLabel(label.label_id, counter);
        });
    }

    /**
     *
     * @param {string} time
     * @param {ResponseData<Ticket>} ticketIndividual
     */

    public addSnooze(time: string, ticketIndividual?: TicketDtoInterface): void {
        this.selectedTicketsId = [];

        if (!ticketIndividual) {
            this.selectedTickets.main.forEach((ticket: TicketDtoInterface, index: number): void => {
                if (ticket.snooze) {
                    this.selectedTickets.main[index].snooze = !!0;
                }
                this.selectedTicketsId.push(ticket.ticket_id_hash);
            });

            if (this.selectedTicketsId.length) {
                this.ticketService.removeSnooze(this.selectedTicketsId)
                    .then((data: any): void => {
                        if (data.success) {
                            this.setSnzoozeAfterRemove(time, this.selectedTicketsId);
                        }
                    });
            } else {
                this.setSnzoozeAfterRemove(time, this.selectedTicketsId);
            }
        } else {
            this.selectedTicketsId.push(ticketIndividual.ticket_id_hash);
            if (ticketIndividual.snooze) {
                this.ticketService.removeSnooze(this.selectedTicketsId)
                    .then((data: any): void => {
                        if (data.success) {
                            this.ticketService.ticket.snooze = null;
                            this.setSnzoozeAfterRemove(time, this.selectedTicketsId);
                        }
                    });
            } else {
                this.setSnzoozeAfterRemove(time, this.selectedTicketsId);
            }
        }
    }

    /**
     * for synchronous requests
     * @param {string} timechangeStatus
     * @param {Array<string>} selectedTicketsIdHash
     */

    private setSnzoozeAfterRemove(time: string, selectedTicketsIdHash: Array<string>) {
        this.ticketService.addSnoozeTicket(this.snoozeTime[time], selectedTicketsIdHash)
            .then((data: any): void => {
                if (data.success) {
                    this.changeInbox(selectedTicketsIdHash.length, !!1, (this.ticketService.filterticketsStatus !== 'draft'), 'closed');
                    if (this.ticketService.ticket) {
                        this.ticketService.ticket.snooze = data.snoozeData;
                        this.ticketService.ticket.status = 'closed';
                    }

                    let tickets = this.selectedTickets.main;
                    if (this.ticketService.ticket) {
                        tickets = [this.ticketService.ticket];
                    }

                    this.socketService.changeCompanyTicketStatus(this.mailboxService.mailboxes, tickets, 'closed', this.ticketService.filterticketsStatus);
                    this.socketService.addSnooze(tickets, data.snoozeData);
                    this.ticketService.currentTicketsStatus.emit('closed');
                }
            });
    }

    public changeTicketsStatus(status: string, ticketIndividual?: TicketDtoInterface): void {
        if (this.forEvent) {
            this.forEvent = !!0;
            status = status.toLowerCase();
            this.selectedTicketsId = [];
            if (!ticketIndividual) {
                this.selectedTickets.main.forEach((ticket: TicketDtoInterface): void => {
                    if (ticket) {
                        this.selectedTicketsId.push(ticket.ticket_id_hash);
                    }
                });
            } else {
                this.selectedTicketsId.push(ticketIndividual.ticket_id_hash);
            }

            this.ticketService.changeTciketStatus({tickets_id_hashs: this.selectedTicketsId, status})
                .then((data: any): void => {
                    if (data.success) {
                        this.changeInbox(this.selectedTicketsId.length, !!1, (this.ticketService.filterticketsStatus !== 'draft'), status);
                        let tickets: any = this.selectedTickets.main;
                        if (ticketIndividual) {
                            tickets = [ticketIndividual];
                        }
                        this.socketService.changeCompanyTicketStatus(this.mailboxService.mailboxes, tickets, status, this.ticketService.filterticketsStatus);
                        this.forEvent = !!1;
                        this.selectedTickets.main = [];
                        this.ticketService.currentTicketsStatus.emit(status);
                    }
                });
        }
        // TODO
        if (status === 'closed') {
            this.actionGifService.actionEvent.emit();
        }
    }

    /**
     * remove label in ticket
     * @param {number} labelId
     * @param {number} index
     */
    public labelRemove(labelId: number, index: number): void {
        this.labelsService.deleteLabelForTicket(labelId, this.ticketService.ticket.id)
            .then((data: any): void => {
                if (data.success) {
                    this.ticketService.ticket.labels.splice(index, 1);
                    this.labelsService.mergeLabel(labelId, -1);
                    this.socketService.removeLabel({
                        index,
                        labelId,
                        ticketId: this.ticketService.ticket.id,
                    });
                }
            });
    }
}
