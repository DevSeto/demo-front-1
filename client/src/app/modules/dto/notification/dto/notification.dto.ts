import {Injectable} from '@angular/core';
import {NotificationDtoInterface} from '../interfaces/notification-dto.interface';
import {NotificationModel} from '../models/notification.model';

type NOTIFICATION = Array<NotificationDtoInterface>;

@Injectable()
export class Notification extends Array<NotificationModel> implements NOTIFICATION {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, Notification.prototype);
    }

    public set(notifications: NOTIFICATION): void {
        for (const notification in notifications)
            this[notification] = notifications[notification];
    }
}