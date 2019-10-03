import {UserDtoInterface} from '../../user';

export interface CurrentNotificationsDtoInterface {
    author: UserDtoInterface;
    customer: UserDtoInterface;
    body: string|null ;
    files: Array<any>;
    type: string|null;
    title: string|null;
    message: string|null;
    color: string|null;
    mailbox_id: number|null;
    ticket_id: number|null;
    id: number|null;
    is_viewed: number|null;
    notification_id: number;
    notifications: any;
}