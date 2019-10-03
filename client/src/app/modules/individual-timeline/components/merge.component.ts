import {Component, OnInit, Input} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {TicketsService} from '../../../services/components/tickets.service';
import {MergedTicketFirstDtoInterface} from '../../dto/ticket/interfaces/merged-ticket-dto.interface';
import {CoreComment} from '../core/core.component';

@Component({
    selector: 'ticket-merge',
    templateUrl: '../html/merge.component.html',
})

export class TicketMerge extends CoreComment implements OnInit {

    public openMore: boolean = !!0;
    public cloud: any = showed;
    public mergeTimeline: Array<any> = [];
    @Input('merge')
    public merge: MergedTicketFirstDtoInterface;

    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                public ticketsService: TicketsService) {
        super();
    }

    public ngOnInit(): void {
        this.showTimeline(this.merge.merged_tickets_data.ticket_id);
    }
    public showTimeline(ticketId: number): void{
        this.ticketsService.getIndividualMergeData(ticketId).then((result: any): void => {
            if (result.success && result.data.timeline.length ){
               this.mergeTimeline = result.data.timeline;
            }
        });
    }

    public scrollToOpenMore(event: any): any {
        if( this.openMore )
            event.target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
}
