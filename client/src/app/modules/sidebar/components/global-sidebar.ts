import {Component, OnInit} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {TicketsService} from '../../../services/components/tickets.service';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {DROP_DOWN} from '../../../services/helpers/animations.service';
import {UsersService} from '../../../services/components/users.service';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import { Label, Ticket, User } from '../../../dto';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';
import {CannedReplies} from '../../dto/canned-raply/dto/canned-replies.dto';
import {CompanyStorageModel} from '../../../models/components/company.model';
import {DraftService} from '../../../services/components/draft.service';
import {SocketService} from '../../../services/components/socket.service';
import {NotificationsService} from '../../../services/components/notifications.service';
import { UsersPreferencesModel } from '../../../models/components/usersPreferences.model';

@Component({
    selector: 'global-sidebar',
    templateUrl: '../html/global-sidebar.html',
    animations: [
        DROP_DOWN,
    ],
})
export class GlobalSidebar implements OnInit {

    public cloud: any = showed;
    public urlparams: string = '';

    public subMenus: Array<string> = [
        'open',
        'pending',
        'closed',
        'spam',
        'draft',
        'attention',
    ];

    public mailboxId: number;
    public activeSubMenu: string = 'open';
    public activeLabelsMenu: boolean = !!0;
    public mailboxes: Array<any> = [];

    constructor(private labelsService: LabelsService,
                private ticketsService: TicketsService,
                public ticketService: TicketsService,
                private mailBoxModel: MailBoxModel,
                private labelsModel: LabelsModel,
                public userPreferencesModel: UsersPreferencesModel,
                public mailboxService: MailBoxService,
                public notificationsService: NotificationsService,
                public companyStorageModel: CompanyStorageModel,
                public usersService: UsersService,
                public draftService: DraftService,
                public ticket: Ticket,
                public user: User,
                private router: Router,
                private cannedRepliesService: CannedrepliesService,
                public socketService: SocketService) {
                    this.router.events.subscribe((event: Event) => {
                        if (event instanceof NavigationStart) {
                            this.urlparams = event.url;
                        }
                    });
                    this.notificationsService.checkUserPushNot().then((result: any): void => {
                        this.socketService.openPushNotification = result.status;
                        if (this.socketService.openPushNotification === 1){
                            Notification.requestPermission().then((result) => {
                                if (result === 'granted') {
                                    this.notificationsService.getPushNotificationData();
                                }
                            });
                        }
                    });
    }
    public ngOnDestroy() {
    }

    public ngOnInit(): void {
    }
    public logOutUser() {
          document.getElementById('myDropdown').classList.toggle('show');
    }

    public redirectToTicekt() {
        this.router.navigate(['tickets'])
            .then((data: boolean): void => {
                this.ticketsService.tickets.reset();
                this.ticketsService.toTicketPage.emit(!!1);
            });
    }

    public changeStyle(name:string): void{
       this.userPreferencesModel.insertStyleKey(name);
        location.reload();
    }
}
