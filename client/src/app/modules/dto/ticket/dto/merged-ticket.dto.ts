import {Injectable} from '@angular/core';
import {MergedTicketFirstDtoInterface} from '../interfaces/merged-ticket-dto.interface';
import {MergedTicketModule} from '../models/merged-ticket.module';

@Injectable()
export class MergedTicket implements MergedTicketFirstDtoInterface {

    public created_at: string = '';
    public merged_tickets_data: Array<MergedTicketModule> = [];
    public type: string|null = null;
}