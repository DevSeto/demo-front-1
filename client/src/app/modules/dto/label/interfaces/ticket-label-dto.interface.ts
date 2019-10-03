import {LabelDtoInterface} from './label-dto.interface';

export interface TicketLabelDtoInterface extends LabelDtoInterface {

    label_id: number|null;
    ticket_id: number|null;
}