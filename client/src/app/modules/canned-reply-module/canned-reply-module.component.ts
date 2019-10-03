import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SocketService} from '../../services/components/socket.service';
import {ToastrService} from '../toastr';
import {CannedrepliesService} from '../../services/components/cannedreplies.service';
import {MailBoxService} from '../../services/components/mailbox.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {CannedReplies, CannedRepliesModel} from '../dto/canned-raply';

@Component({
    selector: 'canned-reply-module',
    templateUrl: './canned-reply-module.component.html',
})

export class CannedReplyModuleComponent  implements OnInit {

    public cloud: any = showed;
    public previousTitle: string;
    public showCreatePage: boolean = !!0;

    @Output('selectReplies')
    public selectReplies: EventEmitter<Array<string|null>> = new EventEmitter<Array<string|null>>();

    @Output('viewReplies')
    public viewReplies: EventEmitter<CannedRepliesModel> = new EventEmitter<CannedRepliesModel>();

    private selectedReply: any = {};
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
        this.cannedrepliesService.mailboxId = this.mailboxModel.getMailboxCurrentId();
        this.cannedrepliesService.getAllCategory().then((category: any): void => {
            this.cannedrepliesService.categorys.set(category.data);
            this.cannedrepliesService.categorys.reverse();
            if (category.data.length){
                this.cannedrepliesService.categoryId = this.cannedrepliesService.categorys[0].id;
                this.getRepliesByCategory(this.cannedrepliesService.categoryId );
            }
        });
        this.mailboxService.mailboxes.forEach((mailbox: any) => {
            if (mailbox.id === this.cannedrepliesService.mailboxId)
                this.selectedMailboxName = mailbox.name;
        });

        this.previousTitle = this.title.getTitle();
    }

    public selectReply(reply: CannedRepliesModel){
        if (this.selectedReply && this.selectedReply[reply.id]){
            delete this.selectedReply[reply.id];
        }else{
            this.selectedReply[reply.id] = reply.body;
        }
        this.selectReplies.emit( this.selectedReply);
    }
    public getRepliesByCategory(id: number): void{
        this.cannedrepliesService.getCannedrepliesByCatId(id).then((result): void =>{
            if (result.data && result.data.canned_replies.length){
                if (!this.cannedrepliesService.cannedReplies){
                    this.cannedrepliesService.cannedReplies  = new CannedReplies();
                }
                this.cannedrepliesService.cannedReplies = result.data.canned_replies;
                this.cannedrepliesService.cannedReplies.reverse();
            }else{
                this.cannedrepliesService.cannedReplies =   new CannedReplies();

            }
            this.cannedrepliesService.currentCannedReplies.category_id = id;
        });
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

    public deleteCategory(id: number, index: number): void {
        this.cannedrepliesService.deleteCategories(id)
            .then((data: any) => {
                this.cannedrepliesService.cannedReplies = new CannedReplies();
                this.cannedrepliesService.categorys.splice(index, 1);
                this.socketServices.changeCannedReplies(this.cannedrepliesService.cannedReplies, this.cannedrepliesService.categorys, this.cannedrepliesService.mailboxId);
                this.cloud.effect = 'confirmModal';
                this.toastr.success('Category successfully deleted.', 'Success', this.defaultToastrParams);

            });
    }

    public editReply(repliesData: any): void {
        // this.viewReplies.emit(repliesData);
        this.cloud.effect = 'viewReplies';
        this.cannedrepliesService.currentCannedReplies = (Object as any).assign({}, repliesData) ;

    }

    public editCategory(name: string, diff: boolean , index: number): void {
        this.cannedrepliesService.categorys[index].edit = !!0;
        if (diff && name){
            this.cannedrepliesService.editCannedReplyCategory(name, this.cannedrepliesService.categorys[index].id).then((data: any): void => {
                this.cannedrepliesService.categorys[index].name = name;
                this.toastr.success('Category successfully update.', 'Success', this.defaultToastrParams);

            });
        }else if (diff && !name){
            this.deleteCategory(this.cannedrepliesService.categorys[index].id, index);
        }
    }
    public focuseInput(selector: string, index: number): void{
        setTimeout((): void => {
            document.getElementById(selector).focus();
        }, 2);
    }
}
