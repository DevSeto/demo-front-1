import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MailBoxService} from '../../services/components/mailbox.service';
import {CannedrepliesService} from '../../services/components/cannedreplies.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {SocketService} from '../../services/components/socket.service';
import {TicketTimeline} from '../../modules/dto/ticket';
import {ToastrService} from '../../modules/toastr';
import { CannedReplies, CannedRepliesInterface, CannedRepliesModel } from '../../modules/dto/canned-raply';

declare let $: any;

@Component({
  selector: 'canned-replies-list',
  templateUrl: '../../html/canned-replies-list/canned-replies-list.component.html',
})
export class CannedRepliesList implements OnInit {

  public repliesList: Array<CannedRepliesInterface>;
  public cloud: any = showed;
  public delteReply: boolean = !!0;
  public viewReply: boolean = !!0;
  public currentReply: CannedRepliesModel ;
  @Output('viewReplies')
  public viewReplies: EventEmitter<CannedRepliesModel> = new EventEmitter<CannedRepliesModel>();
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
      cannedrepliesService.getAllReplies()
        .then(( data: any ): void => {
          this.cannedrepliesService.repliesList = data.data;
          console.log( this.repliesList);
      });
  }

  public ngOnInit() {
  }
  public editReplyListItem(repliesData: any): void {
    this.cannedrepliesService.currentCannedReplies = (Object as any).assign({}, repliesData) ;
    this.cloud.effect = 'createCannedReplies';

  }
  public deleteCategoryListItem(repliesData: any): void {
    this.cloud.effect = 'viewReplies';
    this.cloud.effect = 'deleteReplies';
    this.cannedrepliesService.currentCannedReplies = (Object as any).assign({}, repliesData) ;

  }

}