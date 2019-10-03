import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {TicketsInterface} from '../../interfaces/components/tickets.interface';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {CookieService} from '../../services/cookie/cookies.service';
import {ErrorService} from '../../services/components/error.service';

@Injectable()
export class TicketsModel extends Encryption implements TicketsInterface {

    private readonly _expiredKey: string = 'tickets_exp-expiredAt';

    private _key: string = '/tickets/';
    private _tickedId: number;
    private _ticket: any = {};

    private set key(id: string) {
        this._ticket += id;
    }

    private get expiredKey(): string {
        return Encryption.keyEnCrypt(this._expiredKey);
    }

    constructor(private cookieService: CookieService,
                private errs: ErrorService) {
        super();
    }

    public keyExist: any = (): boolean => !!this.select();

    private getKey(id?: number): string {
        return this._key;
    }

    public getTicketByid(id: number) {
        let selectedItem: any = Encryption.storage.getItem(this.getKey());
        let current_ticket: any = {};
        if (selectedItem) {
            selectedItem = Encryption.deCrypt(selectedItem);
            selectedItem.forEach((ticket: any): void => {

                if (ticket.id === id) {
                    this._ticket = ticket;
                    current_ticket = ticket;
                }
            });

            if (_.empty(current_ticket)) {
                return current_ticket;
            }
        }

        return _._;
    }

    public select(getAll?: boolean): any {
        let selectedItem: any = Encryption.storage.getItem(this.getKey());

        if (selectedItem) {
            selectedItem = Encryption.deCrypt(selectedItem);

            if (getAll) {
                this._ticket = selectedItem;
            } else {
                selectedItem.forEach((ticket: any): void => {

                    if (ticket.id === this._tickedId)
                        this._ticket = ticket;
                });
            }

            return this._ticket;
        }

        return _._;
    }

    public id(id: number, insert?: boolean): any {
        if (this._tickedId !== id) {
            this._tickedId = id;
            this._ticket = {};

            if (insert) {
                return !!0;
            } else {
                this.select();
            }
        }

        return this;
    }

    public insert(ticket: any): void {
        Encryption.storage.setItem(this.getKey(), Encryption.enCrypt(ticket));
    }

    public updateTicketData(ticketdata: any, id: any) {
        const allTickets: any = Encryption.deCrypt(Encryption.storage.getItem(this.getKey()));

        allTickets.forEach((ticket: any, index: number) => {
            if (ticket.id === id) {
                allTickets[index] = ticketdata;
            }
        });
        Encryption.storage.setItem(this.getKey(), Encryption.enCrypt(allTickets));
        return allTickets;
    }

    public updateLabelTiket(ticketId?: any, labels?: any) {
        const allTickets: any = Encryption.deCrypt(Encryption.storage.getItem(this.getKey()));

        allTickets.forEach((ticket: any, index: number) => {
            if (ticket.id === ticketId)
                allTickets[index].labels = labels;
        });

        Encryption.storage.setItem(this.getKey(), Encryption.enCrypt(allTickets));
        return allTickets;
    }

    public update(ticket?: any, checked?: boolean): any {
        let existTicket: Array<any> = this.select(!!1);

        if (!existTicket)
            existTicket = [];
        if (ticket)
            existTicket.push(ticket);

        Encryption.storage.setItem(this._key, Encryption.enCrypt(existTicket));

        return existTicket;
    }

    public delete(id: number): any {
        const allTickets: any = Encryption.deCrypt(Encryption.storage.getItem(this.getKey()));

        allTickets.forEach((ticket: any, index: number) => {
            if (ticket.id === id)
                allTickets.splice(index, 1);
        });

        Encryption.storage.setItem(this.getKey(), Encryption.enCrypt(allTickets));
        return allTickets;
    }

    public deleteProperty(propertyName: string): void {
        if (this.keyExist() && this._ticket.hasOwnProperty(propertyName)) {
            delete this._ticket[propertyName];
            this.update(!!0, !!1);
        }
    }

    public updateProperty(propertyName: string, data: any): void {
        if (this.keyExist() && this._ticket.hasOwnProperty(propertyName)) {
            this._ticket[propertyName] = data;
            this.update(!!0, !!1);
        }
    }

    public insertProperty(propertyName: string, data: any): void {
        if (this.keyExist()) {
            this._ticket[propertyName] = data;
            this.update(!!0, !!1);
        }
    }

    public getProperty(propertyName: string): any {
        if (this.keyExist() && this._ticket.hasOwnProperty(propertyName))
            return this._ticket[propertyName];
    }

    public filterByProperty(properties: object): Array<any> {
        const selectedTickets: Array<any> = [];

        this.select().forEach((ticket: any): void => {

            Object.keys(properties).forEach((index: string): void => {
                if (properties[index]) {
                    if (ticket[index] === properties[index]) {
                        selectedTickets.push(ticket);
                    }
                    else if (_.empty(selectedTickets)) {
                        if (selectedTickets[selectedTickets.length - 1][index] !== properties[index])
                            selectedTickets.pop();
                    }
                }
            });
        });

        return selectedTickets;
    }

    public extractDataForIndividual: any = (res: HttpResponse<any>): any => {
        const body: any = res;

        // if (_.empty(body.data))
        //     body.data = body.data;

        body.ticketData = body.data.ticket_data;
        body.data = body.data.timeline;
        return body || {};
    }

    public extractData: any = (res: HttpResponse<any>): any => {
        const body: any = res;

        // if (_.empty(body.data))
        //     body.data = Encryption.deCrypt(body.data);

        return body || {};
    }

    public extractDataForUrl(propertyName: string): any {
        const body: any = propertyName;

        return body || {};
    }

    public handleError: any = (error: HttpResponse<any>): any => {
        return this.errs.handleError(error);

    }

    public dataCompile: (data: any) => any = (data: any): any => data;
}