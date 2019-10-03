import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {TicketsService} from '../../../services/components/tickets.service';
import {TicketCommentModule} from '../../dto/ticket';
import {UsersService} from '../../../services/components/users.service';
import {CoreComment} from '../core/core.component';
import {SocketService} from '../../../services/components/socket.service';

@Component({
    selector: 'ticket-comment',
    templateUrl: '../html/comment.component.html',
})

export class TicketComment extends CoreComment implements OnInit {

    public cloud: any = showed;
    public images: NodeListOf<Element>;
    public inputSetterValue: boolean;

    @Input('comment')
    public comment: TicketCommentModule;

    @Input('ticketTemporaryTimeline')
    public ticketTemporaryTimeline: boolean = !!0;

    @Input('ind')
    public ind: number = 0;

    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                public usersService: UsersService,
                public ticketService: TicketsService,
                public socketService: SocketService) {
        super();
    }

    public ngOnInit(): void {
    }

    @Input('showDisabledImages')
    public set showDisabledImages(value: boolean) {
        this.inputSetterValue = value;

        if (value && this.images) {
            Array.prototype.forEach.call(this.images, (img: any) => {
                if (img.hasAttribute('dir')) {
                    img.querySelectorAll('div > img').forEach((image: any) => {
                        if (image.className === '')
                            image.style.display = 'inline-block';
                    });
                }
            });
        }
    }

    @Output('showHideMsg')
    public showHideMsg: EventEmitter<boolean> = new EventEmitter<boolean>();

    public ngAfterViewInit(): void {

    }
}
