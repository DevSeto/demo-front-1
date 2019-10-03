import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariables} from '../extra/global.variables';
import {TicketsModel} from '../../models/components/tickets.model';
import {GlobalServices} from '../helpers/global.service';
import {UsersModel} from '../../models/components/users.model';
import {Tickets, Ticket, CustomerTickets, TicketModule} from '../../dto';
import {TicketDtoInterface} from '../../modules/dto/ticket/interfaces/ticket-dto.interface';
import {IndividualHistory, TicketsHistory} from '../../modules/dto/ticket';
import {TicketTimeline} from '../../modules/dto/ticket/dto/ticket-timeline.dto';
import {TicketsNotification} from '../../modules/dto/ticket/dto/tickets-notification.dto';

@Injectable()
export class TicketsService {

    private ticketUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets';
    private customerSearchUrl: string = GlobalVariables.BACKEND_API_URL + '/search';
    private ticketsUrl: string = this.ticketUrl + '/mailbox';
    private deleteTicketUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets';
    private ticketsMergeUrl: string = `${this.ticketUrl}/merge/`;
    private notesUrl: string = GlobalVariables.BACKEND_API_URL + '/notes';
    private searchUserUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/company/users/mentioned/';
    private commentsUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets/comment';
    private usersUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/company/users?role=';
    private ticketAssignUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets/assign/';
    private ticketHistoryUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets/history';
    private getCustomerByTicket: string = GlobalVariables.BACKEND_API_URL + '/tickets/ticket_customer/';
    private ticketortedUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets/sorted/';
    private customerTicketsUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets/merge/';

    constructor(private http: HttpClient,
                private ticketsModel: TicketsModel,
                public ticket: Ticket,
                public tickets: Tickets,
                public ticketTimeline: TicketTimeline,
                public ticketTemporaryTimeline: TicketTimeline,
                public mergeTicketTimeline: TicketTimeline,
                public ticketsHistory: TicketsHistory,
                public ticketsNotification: TicketsNotification,
                public customerTickets: CustomerTickets,
                public readyForMerge: TicketModule,
                public individualHistory: IndividualHistory,
                private usersModel: UsersModel) {
    }

    public changeassignment: EventEmitter<any> = new EventEmitter<any>();
    public createTicektDraft: any = null;
    public filterticketsStatus: string = 'open';
    public currentMailboxId: EventEmitter<number> = new EventEmitter<number>();
    public toTicketPage: EventEmitter<boolean> = new EventEmitter<boolean>();
    public goBack: EventEmitter<boolean> = new EventEmitter<boolean>();
    public addTicket: EventEmitter<boolean> = new EventEmitter<boolean>();
    public mergeMasterTicket: TicketDtoInterface;
    public currentTicketsStatus: EventEmitter<string> = new EventEmitter<string>();
    public searchTicketsByLabel: EventEmitter<any> = new EventEmitter<any>();
    public clearForwarding: EventEmitter<any> = new EventEmitter<any>();
    public selectedImagen: string = '';
    public individualSubmitted: boolean = !!0;
    public onDestroyTicket: boolean = !!1;
    public activeTabe: any = {
        reply: '' as any,
        add_note: '' as any,
        forward: '' as any,
    };

    public setIndividual(ticket: TicketDtoInterface): void {
        this.ticket = new Ticket();

        if (ticket) {
            (Object as any).keys(ticket).forEach((key: string, index: number): void => {
                this.ticket[key] = ticket[key];
            });
        }
    }

    public getCustomerByTicketid(ticketId: any): Promise<any> {
        const url: string = this.getCustomerByTicket + ticketId;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getTicketHistory(ticketId: any): Promise<any> {
        const url: string = this.ticketHistoryUrl + '/' + ticketId;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }
    public getIndividualMergeData(ticketId: any): Promise<any> {
        const url: string = this.ticketUrl + '/timeline/' + ticketId;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getAllTicketHistory(mailbox_id: any, offset: number, count: number): Promise<any> {
        const url: string = this.ticketHistoryUrl + '?mailbox_id=' + mailbox_id + '&count=' + count + '&offset=' + offset;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getInboxdata(mailbox_id: number): Promise<any> {
        const url: string = this.ticketortedUrl + '?mailbox_id=' + mailbox_id;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getTickets(mailbox_id: number, status: string, label: number|string = '', attribute: string = '', offset: number): Promise<any> {
        const url: string = this.ticketsUrl + '/' + mailbox_id + '?status=' + status + '&label=' + label + '&filter=' + attribute + '&offset=' + offset;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getCustomerTickets(ticket_id_hash: string): Promise<any> {
        const url: string = this.customerTicketsUrl  + ticket_id_hash;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getTicket(id: any, offset?: number, merge?: string): Promise<any> {
        let url: string = this.ticketUrl + '/' + id + '?offset=' + offset + '&count=5' ;
        if (merge){
            url = url + merge;
        }

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractDataForIndividual)
            .catch(this.ticketsModel.handleError);
    }

    public createNewTicket(newTicket: any): Promise<any> {
        return this.http.post(
            this.ticketUrl,
            this.ticketsModel.dataCompile(newTicket),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public addSnoozeTicket(snooze: any, ticketIdHash: Array<string>): Promise<any> {
        const url: string = this.ticketUrl + '/snooze/' + snooze;

        return this.http.post(
            url,
            this.ticketsModel.dataCompile({tickets_id_hashs: ticketIdHash}),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public removeSnooze(ticketIdHash: any) {
        const url: string = this.ticketUrl + '/remove/snooze/';

        return this.http.post(
            url,
            this.ticketsModel.dataCompile(ticketIdHash),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public mergeTickets(masterId: string, ticketsIds: Array<number>): Promise<any> {
        const url: string = this.ticketsMergeUrl + masterId;

        return this.http.put(
            url,
            this.ticketsModel.dataCompile(ticketsIds),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public updateTicket(data: any): Promise<any> {
        return this.http.put(
            this.ticketUrl,
            this.ticketsModel.dataCompile(data),
            GlobalServices.AuthHeader(),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public addComment(data: any) {
        return this.http.post(
            this.commentsUrl,
            this.ticketsModel.dataCompile(data),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getAgents(): Promise<any> {
        const url = this.usersUrl + 4;

        return this.http.get(
            url,
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public setAgents(agentId: any, ticketsIdHashs: Array<string>): Promise<any> {
        return this.http.post(
            this.ticketAssignUrl + agentId,
            this.ticketsModel.dataCompile({ tickets_id_hashs: ticketsIdHashs}),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public deleteTicket(idHashs: Array<string>): Promise<any> {
        const url: string = this.deleteTicketUrl + '/delete_all';

        return this.http.post(url,
            this.ticketsModel.dataCompile({tickets_id_hashs: idHashs}),
            GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public deleteDraftTicket(ids: Array<number>, mailbox_id: number): Promise<any> {
        const url: string = this.ticketUrl + '/' + mailbox_id + '/drafts/delete_drafts';

        return this.http.post(url,
            this.ticketsModel.dataCompile(ids),
            GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public deleteAllTickets(): Promise<any> {
        return this.http.delete(this.deleteTicketUrl, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getNotes(): Promise<any> {
        return this.http.get(this.notesUrl, GlobalServices.AuthHeader())
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getNote(id: number): Promise<any> {
        const url: string = this.notesUrl + '/' + id;

        return this.http.get(url, GlobalServices.AuthHeader())
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public createNote(newNote: any, ticketIdHash: string): Promise<any> {
        const url = this.ticketUrl + '/' + ticketIdHash + '/notes';

        return this.http.post(
            url,
            this.ticketsModel.dataCompile(newNote),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public changeTciketStatus(ticketsIdAndStatus: any): Promise<any> {
        const url = this.ticketUrl + '/status';

        return this.http.put(
            url,
            this.ticketsModel.dataCompile(ticketsIdAndStatus),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public updateNote(updatedNote: any): Promise<any> {
        return this.http.put(
            this.notesUrl,
            this.ticketsModel.dataCompile(updatedNote),
            GlobalServices.AuthHeader(),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public deleteNote(id: number): Promise<any> {
        const url: string = this.notesUrl + '/' + id;

        return this.http.delete(url, GlobalServices.AuthHeader())
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public searchUser(query: any, mailboxId?: number): Promise<any> {
        if (!mailboxId)
            mailboxId = this.ticket.mailbox_id;

        const url = this.searchUserUrl + mailboxId + '/' + query;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public searchTickets(value: string): Promise<any> {
        const url = this.ticketUrl + '/search?key=' + value;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getCustomerEmails(value: string): Promise<any> {
        const url = this.customerSearchUrl + '/customers_emails?search=' + value;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }
}
