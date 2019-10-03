import {Component, Output, EventEmitter, Input, OnInit, OnDestroy} from '@angular/core';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';
import {CannedRepliesModel} from '../../dto/canned-raply';
import {SocketService} from '../../../services/components/socket.service';
import {ToastrService} from '../../toastr';

declare let $: any;

@Component({
    selector: 'view-delete-canned-replies',
    templateUrl: '../html/view-delete-canned-replies.component.html',
})

export class ViewDeleteCannedRepliesComponent implements OnInit, OnDestroy {
    public cloud: any = showed;
    public selectReplies: Array<string|null> = [];
    @Input('text')
    public text: string = '';
    public viewReply: boolean = !!0;
    public currentReply: CannedRepliesModel ;
    public delteReply: boolean = !!0;
    @Output('value')
    public value: EventEmitter<string> = new EventEmitter<string>();
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;
    constructor(private cannedRepliesModel: CannedRepliesModel,
                public socketServices: SocketService,
                public toastr: ToastrService,
                public cannedrepliesService: CannedrepliesService,
    ) {
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        if (this.cloud.effect.deleteReplies){
          this.cloud.effect = 'deleteReplies';
        }

        this.cannedrepliesService.currentCannedReplies.name = null;
        this.cannedrepliesService.currentCannedReplies.body = null;
        this.cannedrepliesService.currentCannedReplies.id = null;
    }


    public deleteReplies(): void {
        this.cannedrepliesService.deleteReplies(this.cannedrepliesService.currentCannedReplies.id)
            .then((data: any) => {
                if (!this.cloud.effect.deleteReplies){
                  for (const key in  this.cannedrepliesService.categorys){
                    if ( this.cannedrepliesService.categorys[key].id === this.cannedrepliesService.currentCannedReplies.category_id){
                      this.cannedrepliesService.categorys[key].canned_replies_count --;
                    }
                  }
                  for (let key: number = 0 ; key < this.cannedrepliesService.cannedReplies.length; key++){
                    if ( this.cannedrepliesService.cannedReplies[key].id === this.cannedrepliesService.currentCannedReplies.id){
                      this.cannedrepliesService.cannedReplies.splice(key, 1);
                    }
                  }
                  if ( this.cannedrepliesService.selectReplies.length){
                    this.cannedrepliesService.selectReplies.splice(this.cannedrepliesService.currentCannedReplies.id, 1);
                  }
                }else{

                    for (let key: number = 0 ; key < this.cannedrepliesService.cannedReplies.length; key++){
                      if (this.cannedrepliesService.repliesList[key].id ===  this.cannedrepliesService.currentCannedReplies.id){
                        this.cannedrepliesService.repliesList.splice(key, 1);
                        break;
                      }
                    }
                }
                this.socketServices.changeCannedReplies(
                    this.cannedrepliesService.cannedReplies,
                    this.cannedrepliesService.categorys,
                    this.cannedrepliesService.mailboxId,
                );
                this.cloud.effect = 'viewReplies';
                this.toastr.success('Canned Reply successfully deleted.', 'Success', this.defaultToastrParams);

            });
    }

}
