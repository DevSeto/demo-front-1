import {Component, OnInit, Input} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {TicketsService} from '../../../services/components/tickets.service';
import {TicketCommentModule} from '../../dto/ticket';
import {UsersService} from '../../../services/components/users.service';
import {CoreComment} from '../core/core.component';
import {SocketService} from '../../../services/components/socket.service';

@Component({
    selector: 'ticket-forward',
    templateUrl: '../html/forward.component.html',
})

export class TicketForward extends CoreComment implements OnInit {

    public cloud: any = showed;

    @Input('forward')
    public forward: TicketCommentModule;

    @Input('ind')
    public ind: number = 0;

    @Input('ticketTemporaryTimeline')
    public ticketTemporaryTimeline: boolean = !!0;

    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                public socketService: SocketService,
                public usersService: UsersService,
                public ticketService: TicketsService) {
        super();
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
    }
}
