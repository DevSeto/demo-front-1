import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CannedrepliesService} from '../../services/components/cannedreplies.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {NotificationsService} from '../../services/components/notifications.service';
import {SocketService} from '../../services/components/socket.service';
import {DraftService} from '../../services/components/draft.service';
import {UsersModel} from '../../models/components/users.model';

declare let $: any;
const io: any = (window as any).io;

@Component({
    selector: 'socket-commponet',
    template: '',
})

export class SocketComponent implements OnInit {

    public socket: any;
    public subdomain: any;

    constructor(private title: Title,
                public cannedrepliesService: CannedrepliesService,
                public socketService: SocketService,
                public draftService: DraftService,
                public usersModel: UsersModel,
                public notificationsService: NotificationsService,
                private mailboxModel: MailBoxModel) {
    }

    public ngOnInit() {
        this.getSubdomain();
        this.socket = io('https://birdtest.nl:3000', {secure: true});
        // this.socket = io('http://localhost:3000', {secure: true});
        this.socketService.socket = this.socket;
        this.draftService.user_id = this.usersModel.getLoggedUserId();
        this.draftService.socket = this.socket;
        this.draftService.subdomain = this.subdomain;
        this.socketService.subdomain = this.subdomain;
        this.draftService.draftEvents();
        this.socketService.socketEvents();
        this.notificationsService.socket = this.socket;
        this.notificationsService.subdomain = this.subdomain;

    }

    private getSubdomain() {
        const domain = window.location.hostname;
        if (domain.indexOf('.') < 0 ||
            domain.split('.')[0] === 'example' || domain.split('.')[0] === 'lvh' || domain.split('.')[0] === 'www') {
            this.subdomain = '';
        } else {
            this.subdomain = domain.split('.')[0];
        }
    }
}
