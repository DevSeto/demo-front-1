import {TicketModule} from './ticket.module';
import {CurrentNotificationsDtoInterface} from '../interfaces/current-notifications-dto.interface';
import {UserDtoInterface} from '../../user';

export class GeneralNotificationModule {
    public total: number|null = null;
    public total_new: number|null = null;
    public notifications: Array<CurrentNotificationsModule>;
}

export class CurrentNotificationsModule implements CurrentNotificationsDtoInterface{
    public author: UserDtoInterface;
    public customer: UserDtoInterface;
    public files: Array<any> = [];
    public body: string|null = null;
    public id: number|null = null;
    public type: string|null = null;
    public title: string|null = null;
    public color: string|null = null;
    public message: string|null = null;
    public mailbox_id: number|null = null;
    public ticket_id: number|null = null;
    public is_viewed: number|null = null;
    public notification_id: number = null;
    public notifications: any = null;
}