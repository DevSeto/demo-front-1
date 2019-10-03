import {Component, OnInit, Input} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {TicketsService} from '../../../services/components/tickets.service';
import {TicketNoteModule} from '../../dto/ticket/models/ticket-note.module';
import {UsersService} from '../../../services/components/users.service';
import {CoreComment} from '../core/core.component';
import {SocketService} from '../../../services/components/socket.service';

@Component({
    selector: 'time-line-files',
    templateUrl: '../html/timeline-files.component.html',
})

export class TimelineFilesComponent extends CoreComment implements OnInit {

    public cloud: any = showed;

    @Input('note')
    public note: TicketNoteModule;

    @Input('ind')
    public ind: number = 0;

    @Input('ticketTemporaryTimeline')
    public ticketTemporaryTimeline: boolean = !!0;

    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                public socketService: SocketService,
                public usersService: UsersService,
                public ticketsService: TicketsService) {
        super();
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
    }
}
