import {Component, OnInit} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {ToastrService} from '../../../modules/toastr';
import {Label} from '../../../dto';
import {TicketsService} from '../../../services/components/tickets.service';
import {UsersService} from '../../../services/components/users.service';
import {TicketsChildsComponent} from "../../../components/tickets/tickets-childs.component";
import {Router} from "@angular/router";
import {NotificationsService} from "../../../services/components/notifications.service";
import {SocketService} from "../../../services/components/socket.service";
import {MailBoxService} from "../../../services/components/mailbox.service";
import { ActionGifService } from '../../../services/components/action-git.service';

@Component({
    selector: 'individual-history',
    templateUrl: '../html/ticket-history.component.html',
})

export class TicketHistory extends TicketsChildsComponent implements OnInit {

    public cloud: any = showed;
    public availableHeight: number = 0;

    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                private label: Label,
                private toastr: ToastrService,
                public ticketsService: TicketsService,
                public router: Router,
                public usersService: UsersService,
                public notificationsService: NotificationsService,
                public socketService: SocketService,
                public mailboxService: MailBoxService,
                public actionGifService: ActionGifService
                ) {
        super(ticketsService, usersService, mailboxService, labelService, router, notificationsService, socketService, actionGifService);
    }

    public ngOnInit(): void {
        this.ticketsService.individualHistory.reset();
        this.getTicketHistory();
    }



    public changeHistoryDateFormat(date: any) {
        const newDate: any = date.split(' ')[0];
        return newDate;
    }

    public historyHeight(): void {
        this.availableHeight = this.ticketsService.customerTickets.length ? window.innerHeight - 266 : window.innerHeight - 225;
        this.cloud.effect = 'individual_history';

        if (this.cloud.effect.open_previous_ticket)
            this.cloud.effect = 'open_previous_ticket';

        const history = document.querySelector('individual-history');
        history.parentNode.appendChild(history);
    }
}
