import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariables} from '../extra/global.variables';
import {TicketsModel} from '../../models/components/tickets.model';
import {GlobalServices} from '../helpers/global.service';
import {UsersModel} from '../../models/components/users.model';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {TicketsService} from './tickets.service';
import {DtoMailboxModel} from '../../dto';
import {MailBoxService} from './mailbox.service';
import {UsersService} from './users.service';
import {ToastrService} from '../../modules/toastr/toastr/toastr-service';

@Injectable()
export class NotificationsService {

    private usersNotificatiUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/user/profile/notifications';
    private appUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets';
    private ticketUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets';
    private notificationUrl: string = GlobalVariables.BACKEND_API_URL;
    private notificationSetingsUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/user/profile/notifications';
    private pushNotPath: string = GlobalVariables.BACKEND_API_URL + '/settings/user/profile/push_notification';
    private updateToken: string = GlobalVariables.BACKEND_API_URL + '/update_token';

    public socket: any;
    public subdomain: string;
    public ticketId: number;
    public notificationVariables: any = {
        noHistorys: !!0,
        total_new: 0,
        total: 0,
        notificationCount: 0,
        historyCount: 0,
        stepData: 0,
        history: [],
        notificationData: [],
        newTicketData: [],
    };
    public user_id: number;
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public individualdata: any = {
        timeline: [],
    };
    public inboxDataActive: any = 'open';

    public checkForwarding: EventEmitter<number> = new EventEmitter<number>();
    public updateStatus: EventEmitter<any> = new EventEmitter<any>();

    constructor(private http: HttpClient,
                public usersService: UsersService,
                private mailBoxModel: MailBoxModel,
                private ticketService: TicketsService,
                private ticketsModel: TicketsModel,
                private usersModel: UsersModel,
                private toastr: ToastrService,
                private mailboxService: MailBoxService) {
    }

    public getAllNotification(offset: number): Promise<any> {
        const url: string = this.notificationUrl + '/notifications?offset=' + offset + '&count=5';

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getNotificationSetings(): Promise<any> {
        return this.http.get(this.notificationSetingsUrl, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public checkUserPushNot(): Promise<any> {
        return this.http.get(this.pushNotPath, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }
    public changePusheData(checked: number): Promise<any> {
        return this.http.put(
            this.pushNotPath,
            this.ticketsModel.dataCompile({ status : checked}),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public setViewedNotification(id: number): Promise<any> {
        const url: string = this.notificationUrl + '/notifications' + '/' + id;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public openNotificationAccesses(accesses?: any): Promise<any> {
        return this.http.post(
            this.usersNotificatiUrl,
            this.ticketsModel.dataCompile(accesses),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public updateUserToken(user_id: number): Promise<any> {
        const url: string = this.updateToken;

        return this.http.post(url, this.ticketsModel.dataCompile({user_id}), GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then()
            .catch();
    }

    public setViewed(ticketHash: string): Promise<any> {
        const url: string = this.notificationUrl + '/tickets' + '/' + ticketHash + '/set_viewed_ticket';

        return this.http.post(url, {}, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public changeInbox(count: number, status: any, mailboxId: number): void {
        this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
            if (mailbox.id === mailboxId && this.mailboxService.mailboxes[index][status + '_tickets_count'] + count >= 0) {
                this.mailboxService.mailboxes[index][status + '_tickets_count'] = this.mailboxService.mailboxes[index][status + '_tickets_count'] + count;
            }
        });
    }

    public connectionSocket(user_id: any, io: any) {
        const self: any = this;
        this.user_id = user_id;

        this.socket.on('connect', () => {
            self.socket.emit('connection', {user_id});
        });

        self.socket.emit('connection', {user_id});

        this.socket.on('exception', (data: any) => {
            // console.log('event', data);
        });
        this.socket.on('disconnect', () => {
            // console.log('Disconnected');
        });

        this.socket.on('checkForwarding', (data: any) => {
            self.checkForwarding.emit(data.data.mailbox_id);
            self.toastr.success('Your forwarding code is copied.', 'Success', self.defaultToastrParams);
        });
    }

    public getTicket(id: number): Promise<any> {
        const url: string = this.ticketUrl + '/' + id;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractDataForIndividual)
            .catch(this.ticketsModel.handleError);
    }

    public getNotificationForScroll(event: any) {
        if (event.target.offsetTop <= event.target.scrollTop && this.notificationVariables.notificationOffset < this.notificationVariables.total) {
            this.notificationVariables.notificationOffset = this.notificationVariables.notificationOffset + 5;
            this.getAllNotification(this.notificationVariables.notificationOffset).then((data: any): void => {
                if (data.success && data.data.tickets.length > 0) {
                    this.notificationVariables.total = data.data.total;
                    this.notificationVariables.notificationData = this.notificationVariables.notificationData.concat(data.data.tickets);
                    this.notificationVariables.total_new = data.data.total_new;
                }
            });
        }
    }

    public setTicketHistory(history: any, historyCount: any) {
        this.notificationVariables.historyCount = historyCount;
        this.notificationVariables.history = history;
        this.notificationVariables.history.reverse();
    }

    public getAlltcikets(activeTickets: any, ticketsData: any) {
        this.notificationVariables.newTicketData = [];

        if (ticketsData.length > 0) {
            (Object as any).values(ticketsData).forEach((ticket: any, index: any): void => {
                if (ticket.status === activeTickets) {
                    this.notificationVariables.newTicketData.push(ticket);
                }
            });
        }
    }

    public getPushNotificationData() {
        const userdata = this.usersService.user;
        const self = this;
        const sender: any = {
            clieantId: userdata.id,
            userRoom: userdata.company_url,
            type: 'create',
        };

        function buildApplicationServerKey() {
            const base64 = 'BE8PyI95I_jBIfb_LTS_nkUJnOwjLP2zAaGBSFEi3jmFJ3l5ox7-NtNqrVuyPL4Qmt4UxDI-YgwYI1sEMIpoU90=';
            const rfc4648 = base64.replace(/-/g, '+').replace(/_/g, '/');
            const characters = atob(rfc4648).split('').map(character => character.charCodeAt(0));
            return new Uint8Array(characters);
        }

        function permissionGranted() {
            navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
                serviceWorkerRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: buildApplicationServerKey(),
                })
                    .then((subscription) => {
                        sender.senderBrowserData = subscription;
                        self.sendPushNotificationData(sender);
                    });
            });
        }

        function subscribeUserToPush() {
            return navigator.serviceWorker.register('service-worker.js')
                .then((registration) => {
                    const subscribeOptions = {
                        userVisibleOnly: true,
                        applicationServerKey: buildApplicationServerKey(),
                    };
                    return registration.pushManager.subscribe(subscribeOptions).then((pushSubscription) => {
                        sender.senderBrowserData = pushSubscription;
                        self.sendPushNotificationData(sender);
                        return pushSubscription;
                    }).catch((error) => {
                        permissionGranted();
                    });
                });
        }

        if ((Notification as any).permission === 'granted') {
            subscribeUserToPush();
        }
    }

    public sendPushNotificationData(data: any): void {
        if (this.socket) {
            data.authToken = this.usersModel.getToken();
            this.socket.emit('setPushNotificationData', data);
        }
    }
}
