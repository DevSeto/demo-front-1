import {Component, OnInit, AfterViewInit, OnDestroy, HostListener, Output, EventEmitter} from '@angular/core';
import {TicketsService} from '../../services/components/tickets.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';
import {GlobalServices} from '../../services/helpers/global.service';
import {UsersService} from '../../services/components/users.service';
import {LabelsService} from '../../services/components/labels.service';
import {ToastrService} from '../../modules/toastr';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {MailBoxService} from '../../services/components/mailbox.service';
import {TicketsChildsComponent} from './tickets-childs.component';
import {NotificationsService} from '../../services/components/notifications.service';
import {SocketService} from '../../services/components/socket.service';
import {DraftService} from '../../services/components/draft.service';
import {TicketsComponent} from './tickets.component';
import { LabelModel } from '../../modules/dto/label/models/label.model';
import { ActionGifService } from '../../services/components/action-git.service';
import {_} from '../../services/helpers/helper.service';

@Component({
    selector: 'tickets-grid',
    templateUrl: '../../html/tickets/tickets-grid.component.html',
})

export class TicketsGridComponent  extends TicketsChildsComponent{
    // public readonly _maxShowedLabels: number = 10;
    //
    // public filterBy: string = 'new_created';
    // public cloud: any = showed;
    // public offset: number = 0;
    // public ticketsTotalCount: number;
    //
    // public filterAttributes: Array<any> = [
    //     {
    //         name: 'Updated - by Newest',
    //         key: 'new_updated',
    //     },
    //     {
    //         name: ' Updated - by Oldest',
    //         key: 'old_updated',
    //     },
    //     {
    //         name: 'Created - by Newest',
    //         key: 'new_created',
    //     },
    //     {
    //         name: 'Created - by Oldest',
    //         key: 'old_created',
    //     },
    // ];
    //
    @Output('selectTichetEvent')
    public selectTickets: EventEmitter<any> = new EventEmitter<any>();

    @Output('redirectTicketIndividual')
    public redirectTicketIndividual: EventEmitter<any> = new EventEmitter<any>();
    // public userId: any = null;
    // public addScroll: boolean = !!0;
    // public showHideMessage: boolean = !!0;
    // public defoultTrue: boolean = !!0;
    // public forBlure: boolean = !!0;
    public showLabels: boolean = !!0;
    constructor(public title: Title,
                public route: ActivatedRoute,
                public  router: Router,
                public  userService: UsersService,
                public  labelsService: LabelsService,
                public mailBoxModel: MailBoxModel,
                public  mailboxService: MailBoxService,
                public userModel: UsersModel,
                public toastr: ToastrService,
                public  ticketService: TicketsService,
                public  draftService: DraftService,
                public  socketService: SocketService,
                public  notificationsService: NotificationsService,
                public actionGifService: ActionGifService,
                ) {
        super(ticketService, userService, mailboxService, labelsService, router, notificationsService, socketService, actionGifService);

    }
    public assigneName(id: number): string {
        if (this.userService.activeUsers.length){
            for (const user of this.userService.activeUsers){
                if (user.id === id){
                    return user.first_name + ' ' + user.last_name[0] + '.';
                }
            }
        }

        return 'Anyone';
    }
    public showLabelsEnter(): void{
        setTimeout(() => {
            this.showLabels = !!1;
        }, 500);
    }
    public showLabelsLeave(): void{
        setTimeout(() => {
            this.showLabels = !!0;
        }, 500);
    }
    public parentTag: any = null;
    public labels: any = null;

    public mouseoverLabels(event: any, labels: Array<LabelModel>): void {
        console.log(event);
        this.parentTag = _.getParents(event.target, '.tickets-grid__body-date');
        this.labels = labels;
        this.showLabels = !!1;

    }
}
