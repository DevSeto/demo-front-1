import {Component, AfterViewInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {TicketsModel} from '../../models/components/tickets.model';
import {TicketsService} from '../../services/components/tickets.service';
import {UsersService} from '../../services/components/users.service';
import {NotificationsService} from '../../services/components/notifications.service';
import {MailBoxService} from '../../services/components/mailbox.service';
import {CompanyStorageModel} from '../../models/components/company.model';
import {IntegrationService} from '../../services/integration/integration.service';
import {UsersPreferencesModel} from '../../models/components/usersPreferences.model';

const io: any = (window as any).io;


@Component({
    selector: 'old-main-header-logged',
    templateUrl: '../../html/main/old.main.header.logged.html',
})
export class OldMainHeaderLoggedComponent implements AfterViewInit {

    public precent: any = 0;
    public cloud: any = showed;

    public blurEffect: boolean = !!0;
    public openSteps: boolean = !!0;
    public userBlurEffect: any = {};

    public stepData: any = {
        step: 0,
    };
    public userId: any;
    public mailbox_id: any;
    public isNotificationShowed: boolean = !!0;
    public condition: any = false;
    public allNotification: any = [];
    public notificationVariables: any = {
        total_new: 0,
        total: 0,
        notificationCount: 0,
        stepData: 0,
        notificationOffset: 0,
        comments: [],
    };

    constructor(public userService: UsersService,
                public companyStorageModel: CompanyStorageModel,
                public mailBoxModel: MailBoxModel,
                public usersModel: UsersModel,
                private router: Router,
                public usersPreferencesModel: UsersPreferencesModel,
                public ticketService: TicketsService,
                private mailboxService: MailBoxService,
                private ticketsModel: TicketsModel,
                public notificationsService: NotificationsService,
                private integrationService: IntegrationService) {

        if (this.usersModel.getCookiAfterReg()) {
            this.userService.forBlure = !!1;
        } else {
            this.userService.forBlure = !!0;
        }

        this.userId = this.usersModel.getLoggedUserId();
        if (!this.usersModel.getLoggedUser()) {
            this.userService.getUserData().then((data: any) => {
                if (data.success) {
                    this.userService.setUser(data.data);
                    this.usersModel.setLoggedUserId(data.data.id);
                    this.usersModel.insert(data.data);
                }
            });
        } else {
            this.userService.setUser(this.usersModel.getLoggedUser());
        }
    }

    public chatClick() {
        // const link = this.integrationService.getRedirectLink();
        // location.assign(link);
    }

    public run(): void {
        this.notificationEvent();
        this.pushNotification();
        this.update_token();
        this.notificationVariables = this.notificationsService.notificationVariables;
        this.allNotification = this.notificationsService.notificationVariables.notificationData;
        this.mailbox_id = this.mailBoxModel.getMailboxCurrentId();
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                if (!this.usersModel.getLoggedUser()) {
                    this.userService.getUserData().then((data: any) => {
                        if (data.success) {
                            this.userService.setUser(data.data);
                            this.usersModel.setLoggedUserId(data.data.id);
                            this.usersModel.insert(data.data);
                        }
                    });
                } else {
                    this.userService.setUser(this.usersModel.getLoggedUser());
                }
            }
        });
    }

    public ngAfterViewInit(): void {
        const interval: any = setInterval(() => {
            if (this.usersModel.getLoggedUserId()) {
                this.run();
                this.notificationsService.getPushNotificationData();
                clearInterval(interval);
            }
        }, 1000);

        if (!this.usersPreferencesModel.select()) {
            this.userService.getPreferences();
        }
    }

    public update_token(): void {
        const logetData: any = this.usersModel.getExpiredTime();
        if (logetData) {
            const newDate: any = new Date();
            const seconds: any = Math.round((newDate.getTime() - logetData ) / 1000);

        }
    }

    /**
     * enable socket connection
     */
    public notificationEvent(): void {
        const user_id = this.usersModel.getLoggedUserId();
        this.notificationsService.connectionSocket(user_id, io);
    }

    public pushNotification() {
        if (!this.userService.user) {
            this.userService.getUserData().then((data: any) => {
                if (data.success) {
                    this.usersModel.insert(data.data);
                }
            });
        }
    }

    public closeSteps(showed: boolean = !!0): void {
        this.mailbox_id = this.mailBoxModel.getMailboxCurrentId();
        this.isNotificationShowed = !!0;
        this.router.navigate(['/mailbox-settings/' + this.mailbox_id + '/2']);
    }

    public redirectToTicekt() {
        this.router.navigate(['tickets'])
            .then((data: boolean): void => {
                this.ticketService.tickets.reset();
                this.ticketService.toTicketPage.emit(!!1);
            });
    }

    public cangePrecent(precent: any) {
        this.precent = precent * 100 / 4;
    }

}