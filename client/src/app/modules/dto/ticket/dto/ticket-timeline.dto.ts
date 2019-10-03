import {Injectable} from '@angular/core';
import {TicketCommentDtoInterface} from '../interfaces/ticket-comment-dto.interface';
import {TicketNoteDtoInterface} from '../interfaces/ticket-note-dto.interface';
import {TicketNoteModule} from '../models/ticket-note.module';
import {TicketCommentModule} from '../models/ticket-comment.module';

type TICKETTIMELINE = Array<any>;

@Injectable()
export class TicketTimeline extends Array<any> implements TICKETTIMELINE {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, TicketTimeline.prototype);
    }

    public set: (ticketTimeline: TICKETTIMELINE) => void = (ticketTimeline: TICKETTIMELINE): void => {
        for (const timeline in ticketTimeline)
            this[timeline] = ticketTimeline[timeline];
    }

    public reset: () => void = (): void => {
        this.splice(0, this.length);
    }
}