import {Component, Output, EventEmitter, Input, OnInit, OnDestroy} from '@angular/core';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';
import {CannedRepliesModel} from '../../dto/canned-raply';

@Component({
    selector: 'canned-replies-dropdown',
    providers: [CannedRepliesModel],
    templateUrl: 'canned-replies.component.html',
})

export class CannedRepliesDropdown implements OnInit, OnDestroy {

    public cloud: any = showed;
    public selectReplies: Array<string|null> = [];
    @Input('text')
    public text: string = '';
    public viewReply: boolean = !!0;
    public currentReply: CannedRepliesModel ;
    public delteReply: boolean = !!0;

    @Output('value')
    public value: EventEmitter<string> = new EventEmitter<string>();

    constructor(private cannedRepliesModel: CannedRepliesModel,
                public cannedrepliesService: CannedrepliesService) {
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        // this.cannedrepliesService = null;
    }

    public setCannedReplies(): void {
        // this.value.emit(text);
        if (this.cannedrepliesService.selectReplies.length &&  this.cannedrepliesService.textArea && this.cannedrepliesService.textArea.core){
            this.cannedrepliesService.textArea.core.selection.restore();
            this.cannedrepliesService.textArea.core.html.insert((Object as any).values(this.cannedrepliesService.selectReplies).join(' '), false);
        }
        this.cloud.effect = 'showReply';
    }

    public viewReplies(currentReply: CannedRepliesModel): void {
        this.currentReply = currentReply;
        // this.cloud.effect = 'createCannedReplies';
        // this.cannedrepliesService.currentCannedReplies = (Object as any).assign({}, currentReply) ;
        this.viewReply = !!1;
    }
    public showedRepliesModal(): void {
        this.cannedrepliesService.cannedrepliesBody = this.text;
        this.cloud.effect = 'createCannedReplies';
    }
}
