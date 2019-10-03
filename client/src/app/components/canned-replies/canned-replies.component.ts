import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MailBoxService} from '../../services/components/mailbox.service';
import {CannedrepliesService} from '../../services/components/cannedreplies.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {SocketService} from '../../services/components/socket.service';
import {TicketTimeline} from '../../modules/dto/ticket';
import {ToastrService} from '../../modules/toastr';
import {CannedRepliesInterface} from '../../modules/dto/canned-raply';

declare let $: any;

@Component({
    selector: 'canned-replies',
    templateUrl: '../../html/canned-replies/canned-replies.component.html',
})

export class CannedReplies implements OnInit {

    public cloud: any = showed;
    public previousTitle: string;

    public lastSelectedReply: any = {
        id: '',
        index: '',
    };

    public selectedMailboxName: any = 'Mailbox name';
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;
    constructor(private title: Title,
                public socketServices: SocketService,
                public toastr: ToastrService,
                public cannedrepliesService: CannedrepliesService,
                public mailboxService: MailBoxService,
                private mailboxModel: MailBoxModel) {
    }

    public ngOnInit() {
        // this.cannedrepliesService.mailboxId = this.mailboxModel.getMailboxCurrentId();
        // this.cannedrepliesService.getAllCategory().then((category: any): void => {
        //     this.cannedrepliesService.categorys.set(category.data);
        //     this.cannedrepliesService.categorys.reverse();
        //     this.cannedrepliesService.categoryId = this.cannedrepliesService.categorys[0].id;
        //     this.getRepliesByCategory(this.cannedrepliesService.categoryId );
        // });
        // this.mailboxService.mailboxes.forEach((mailbox: any) => {
        //     if (mailbox.id === this.cannedrepliesService.mailboxId)
        //         this.selectedMailboxName = mailbox.name;
        // });

        this.previousTitle = this.title.getTitle();
    }

    public getRepliesByCategory(id: number): void{
        // this.cannedrepliesService.getCannedrepliesByCatId(id).then((result): void =>{
        //     if (result.data && result.data.canned_replies.length){
        //         this.cannedrepliesService.cannedReplies = result.data.canned_replies;
        //         this.cannedrepliesService.cannedReplies.reverse();
        //     }else{
        //         this.cannedrepliesService.cannedReplies.reset();
        //     }
        // });
    }
    /**
     * switch between mailboxes
     * @param mailBoxId
     * @param mailBoxName
     */
    public changeMailbox(mailBoxId: any, mailBoxName: any): void {
        this.cannedrepliesService.mailboxId = mailBoxId;
        this.mailboxModel.insertMailboxId(mailBoxId);
        this.selectedMailboxName = mailBoxName;

        this.cannedrepliesService.getCannedRepliesByMailboxId()
            .then((data: any) => {
                if (data.success) {
                    this.cannedrepliesService.cannedReplies.reset();
                    this.cannedrepliesService.cannedReplies.set(data.data);
                }
            });
    }

    public confirmModal(id: any, index: number): void {
        this.cloud.effect = 'confirmModal';
        this.lastSelectedReply.id = id;
        this.lastSelectedReply.index = index;
    }

    public deleteReplies(id: number, index: number): void {
        this.cannedrepliesService.deleteReplies(id)
            .then((data: any) => {
                for (const key in  this.cannedrepliesService.categorys){
                    if ( this.cannedrepliesService.categorys[key].id === this.cannedrepliesService.cannedReplies[index].category_id){
                        this.cannedrepliesService.categorys[key].canned_replies_count --;
                    }

                }
                this.cannedrepliesService.cannedReplies.splice(index, 1);
                this.socketServices.changeCannedReplies(this.cannedrepliesService.cannedReplies, this.cannedrepliesService.categorys, this.cannedrepliesService.mailboxId);
                this.cloud.effect = 'confirmModal';
                this.toastr.success('Canned Reply successfully deleted.', 'Success', this.defaultToastrParams);

            });
    }

}
