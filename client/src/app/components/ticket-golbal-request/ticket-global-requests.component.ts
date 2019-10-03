import {Component} from '@angular/core';
import {TicketsService} from '../../services/components/tickets.service';
import {UsersService} from '../../services/components/users.service';
import {TicketDtoInterface} from '../../modules/dto/ticket';
import {DtoMailboxModel, UserDtoInterface} from '../../dto';
import {MailBoxService} from '../../services/components/mailbox.service';
import {Router} from '@angular/router';
import {SocketService} from '../../services/components/socket.service';
import { ActionGifService } from '../../services/components/action-git.service';
const dateUnitMs = {
    ms: 1,
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
};

@Component({
    selector: 'tickets-global-request',
    template: '',
})

export class TicketsGlobalRequestsComponent {

    /**
     * for one request
     * @type {boolean}
     */
    public inprogress: boolean = !!1;

    public selectedTickets: any = {
        main: [] as any,
    };

    public mailboxId: number = 1;
    public activeTickets: string = 'open';
    public everyone: string = 'Anyone';
    public selectMenu: any = {
        status: !!0 as boolean,
        ticketsStatus: !!0 as boolean,
        label: !!0 as boolean,
        RHS: !!0 as boolean,
        createTicket: !!0 as boolean,
        createLabel: !!0 as boolean,
        createLabel2: !!0 as boolean,
        selectAllTickets: !!0 as boolean,
        mergeTicket: !!0 as boolean,
        checkAllTickets: !!0 as boolean,
        boxSearch: !!0 as boolean,
        changelabel: !!0 as boolean,
        changeMore: !!0 as boolean,
        ticketsFilter: !!0 as boolean,
        users: !!0 as boolean,
        hours: !!0 as boolean,
        showLoading: !!1 as boolean,
        showData: !!0 as boolean,
    };

    public snoozeData: Array<any> = [
        {
            key: 'fourHour' as string,
            value: ' 4 hours from now' as string,
        },
        {
            key: 'tomorrowMorning' as string,
            value: 'Tomorrow morning' as string,
        },
        {
            key: 'tomorrowMidDay' as string,
            value: 'Tomorrow mid-day' as string,
        },
        {
            key: 'twoDays' as string,
            value: '2 days from now' as string,
        },
        {
            key: 'fourDays' as string,
            value: '4 days from now' as string,
        },
        {
            key: 'oneWeek' as string,
            value: '1 week from now' as string,
        },
    ];

    constructor(public ticketService: TicketsService,
                public userService: UsersService,
                public mailboxService: MailBoxService,
                public router: Router,
                public socketService: SocketService,
                ) {
    }

    public getAllUsers(): void
    {
        this.userService.getAllUsers({active: 'active', mailbox_id: this.mailboxId})
            .then((data: any) => {
                console.log("getalllus")

                if (data.success && data.data) {

                    this.userService.activeUsers = data.data;
                }

            });
    }

    public changeAssigne(agentId: number, ids?: Array<string>, user?: UserDtoInterface): Promise<any> {
        let ticket_idHash: Array<string> = [];
        if (!ids) {
            (Object as any).keys(this.selectedTickets.main).forEach((ticketKey: any): void => {
                const ticket: any = this.selectedTickets.main[ticketKey];
                ticket_idHash.push(ticket.ticket_id_hash);
            });
        }else{
            ticket_idHash = ids;
        }
        return this.ticketService.setAgents(agentId, ticket_idHash)
            .then((data: any): any => {
                if (data.success && user) {
                    this.socketService.changeAssigne(user, agentId, ticket_idHash);
                    //
                    // if (ticket_ids.length === 1)
                    //     this.router.navigate(['/ticket', ticket_ids[0]]);
                }

                return data;
            });
    }

    /**
     * change inbox data for current mailbox
     * @param {number} count
     * @param {boolean} added
     * @param {boolean} deleted
     * @param {string} status
     */
    public changeInbox(count: number, added?: boolean, deleted?: boolean, status?: string): void {
        this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
            if (mailbox.id === this.mailboxId) {
                if (deleted) {
                    this.mailboxService.mailboxes[index][this.activeTickets + '_tickets_count'] = this.mailboxService.mailboxes[index][this.activeTickets + '_tickets_count'] - count;
                }
                if (added && status) {
                    this.mailboxService.mailboxes[index][status + '_tickets_count'] = this.mailboxService.mailboxes[index][status + '_tickets_count'] + count;
                }
            }
        });
    }

    /**
     * get all Customer ticket  from merge
     * @param {TicketDtoInterface} ticket
     */
    public getTicketCustomerTickets(ticket: TicketDtoInterface): void {
        this.ticketService.getCustomerTickets(ticket.ticket_id_hash)
            .then((data: any): void => {
                if (data.success) {
                    this.ticketService.customerTickets.reset();
                    this.ticketService.customerTickets.set(data.data);
                    this.ticketService.mergeMasterTicket = ticket;
                }
            });
    }
    public getTicketHistory() {
        this.ticketService.getTicketHistory(this.ticketService.ticket.id)
            .then((historyData: any) => {
                this.ticketService.individualHistory.reset();
                this.ticketService.individualHistory.set(historyData.data);
                this.ticketService.individualHistory.reverse();
            });
    }
    public diffDates(d1: Date, d2: Date, units?: string|null): number {
        let val = null;
        switch (units) {
            case 'years':
                val = d1.getFullYear() - d2.getFullYear();
                break;
            case 'weeks':
                val = this.diffDates(d1, d2) / dateUnitMs.week;
                break;
            case 'months':
                val = d2.getMonth() - d1.getMonth() + 12 * this.diffDates(d1, d2, 'years');
                break;
            case 'days':
                val = this.diffDates(d1, d2) / dateUnitMs.day;
                break;
            case 'hours':
                val = this.diffDates(d1, d2) / dateUnitMs.hour;
                break;
            case 'minutes':
                val = this.diffDates(d1, d2) / dateUnitMs.minute;
                break;
            case 'seconds':
                val = this.diffDates(d1, d2) / dateUnitMs.second;
                break;
            default:
                return (+d1) - (+d2);
        }

        return Math.round(val);
    }
}
