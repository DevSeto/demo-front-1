import {Component, OnInit} from '@angular/core';
import {NotificationsService} from '../../services/components/notifications.service';
import {ToastrService} from '../../modules/toastr/toastr/toastr-service';
import {UsersService} from '../../services/components/users.service';
import {SocketService} from '../../services/components/socket.service';

@Component({
    templateUrl: '../../html/notifications/notifications.component.html',
})

export class NotificationsComponent implements OnInit {

    public cloud: any = showed;
    public showView: boolean = !!0;
    public notificationFormData: Array<FormDate> = [];
    public notificationSendingData: Array<FormDate> = [];

    constructor(private userService: UsersService,
                private notificationsService: NotificationsService,
                private socketService: SocketService,
                private toastr: ToastrService) {
        this.notificationsService.checkUserPushNot().then((result: any): void => {
            this.socketService.openPushNotification = result.status;
        });
    }

    public ngOnInit(): void {

        this.notificationsService.getNotificationSetings()
            .then((data: any) => {
                if (data.success) {
                    (Object as any).values(data.data).forEach((nots: any, index: any): void => {

                        this.notificationFormData[index] = {  email: nots.email ,
                            browser: nots.browser,
                            id: nots.condition_id,
                        };
                    });
                    this.showView = !!1;
                }
            });
    }

    public clickCheckbox(event: any, emailOrBrowser: string, index: number): void {
        this.notificationFormData[index][emailOrBrowser] = 1 - this.notificationFormData[index][emailOrBrowser];
    }

    /**
     * update notification settings
     */
    public changeNotificationSetings(): void {
        this.notificationsService.openNotificationAccesses({conditions: this.notificationFormData})
            .then((data: any) => {
                if (data.success)
                    this.toastr.success('Notification settings successfully saved.', 'Success', {
                        progressBar: true,
                        positionClass: 'toast-bottom-right',
                    } as any);
            });
    }

    public enableNotification(enable: number): void {
        this.socketService.openPushNotification = 1 - enable;
        if (!this.socketService.openPushNotification ){
            this.socketService.logoutUser();
        }else{
            Notification.requestPermission().then((result) => {
                if (result === 'denied') {
                    this.toastr.error('Notifications disabled.', 'Error', {
                        progressBar: true,
                        positionClass: 'toast-bottom-right',
                    } as any);
                } else if (result === 'granted') {
                    this.notificationsService.getPushNotificationData();
                }
            });
        }
        this.notificationsService.changePusheData(this.socketService.openPushNotification);

    }

    public notificationIsEnable(): boolean {
        if ((Notification as any).permission !== 'granted') {
            return false;
        }

        return true;
    }
}
export interface FormDate {
    id: number;
    email: number;
    browser: number;
}
