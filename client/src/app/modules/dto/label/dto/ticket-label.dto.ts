import {LabelModel} from '../models/label.model';
import {TicketLabelDtoInterface} from '../interfaces/ticket-label-dto.interface';

export class TicketLabel extends LabelModel implements TicketLabelDtoInterface {

    public label_id: number|null = null;
    public ticket_id: number|null = null;
}