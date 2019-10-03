import {Component, OnInit, OnDestroy} from '@angular/core';
import {UsersService} from '../../../services/components/users.service';
import {UsersModel} from '../../../models/components/users.model';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';
import {TicketsService} from '../../../services/components/tickets.service';
import {Router} from '@angular/router';
import {NotificationsService} from '../../../services/components/notifications.service';
import {TicketDtoInterface} from '../../dto/ticket/interfaces/ticket-dto.interface';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {SocketService} from '../../../services/components/socket.service';
import {CurrentNotificationsModule} from "../../dto/ticket/models/general-notification.module";

@Component({
    selector: 'notification-dropdown',
    templateUrl: 'notification-dropdown.component.html',
})

export class NotificationDropdownComponent implements OnInit, OnDestroy {

    public cloud: any = showed;
    public incomplete: boolean = !!0;
    public inprogress: boolean = !!1;
    public mailboxId: number = 1;

    constructor(private router: Router,
                public usersService: UsersService,
                public ticketService: TicketsService,
                private notificationsService: NotificationsService,
                private socketService: SocketService,
                private mailBoxModel: MailBoxModel,
                private cannedRepliesService: CannedrepliesService,
                private mailboxService: MailBoxService) {
    }

    public ngOnInit(): void {
        console.log(this.usersService.user)

        if (this.usersService.user.step && typeof this.usersService.user.step === 'string') {
            this.usersService.user.step = (JSON as any).parse(this.usersService.user.step);
        }
        this.getAllNotification();
    }

    public ngOnDestroy(): void {
    }

    public getAllNotification(): void {
        const offSet: number = (this.ticketService.ticketsNotification.notifications) ? this.ticketService.ticketsNotification.notifications.length : 0;
        if (this.mailboxId && this.inprogress && this.ticketService.ticketsNotification.total !== offSet) {
            this.inprogress = !!0;
            this.notificationsService.getAllNotification(offSet)
                .then((data: any): void => {
                    if (data.success) {
                        if (this.ticketService.ticketsNotification.notifications) {
                            data.data.notifications = this.ticketService.ticketsNotification.notifications.concat(data.data.notifications);
                        }
                        this.ticketService.ticketsNotification.set(data.data);
                        this.inprogress = !!1;
                    }
                });
        }
    }

    public scrollingNotification(event: any): void {
        if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight && this.inprogress) {
            this.getAllNotification();
        }
    }

    public redirectToTicketPage(ticket: CurrentNotificationsModule, idx: number): void {
        if (!ticket.ticket_id) {
            ticket.ticket_id = ticket.id;
        }
        if (!ticket.is_viewed && this.ticketService.ticketsNotification.total_new > 0) {

            // this.notificationsService.setViewedNotification(ticket.ticket_id);
            // }
            this.ticketService.ticketsNotification.total_new = this.ticketService.ticketsNotification.total_new - 1;
            this.ticketService.ticketsNotification.notifications[idx].is_viewed = 1;
        }

            // this.mailboxService.mailboxes.forEach((mailbox: any, res: number) => {
            //     if (mailbox.id === ticket.notifications.mailbox_id && !mailbox.showed)
            //         this.mailboxService.mailboxes[res].showed = !!1;
            // });
        // this.cannedRepliesService.mailboxId = ticket.notifications.mailbox_id;
        // this.ticketService.currentMailboxId.emit(ticket.notifications.mailbox_id);
        this.router.navigate(['/ticket', ticket.ticket_id]);
    }

}
