import {Component, OnInit} from '@angular/core';
import {LabelsService} from '../../services/components/labels.service';
import {LabelsModel} from '../../models/components/labels.model';
import {TicketsService} from '../../services/components/tickets.service';
import {TicketDtoInterface} from '../dto/ticket';
import {LabelDtoInterface} from '../dto/label/interfaces/label-dto.interface';
import {SocketService} from '../../services/components/socket.service';

@Component({
    selector: 'parent-labels',
    template: '',
})

export class ParentLabelsComponent implements OnInit {

    public readonly _maxShowedLabels: number = 3;
    public showLabels: boolean = !!1;
    public cloud: any = showed;
    public searchVale: string = '';
    public lastTreeLabels: Array<any> = [];
    public labels: Array<any> = [];
    public addScroll: boolean = !!0;
    public labelsIsUpdated: Array<any> = [];

    public selectMenu: any = {
        boxSearch: !!0 as boolean,
        changelabel: !!0 as boolean,
        createLabel: !!0 as boolean,
    };

    constructor(public labelsService: LabelsService,
                public labelsModel: LabelsModel,
                public ticketsService: TicketsService,
                public socketService: SocketService) {
    }

    public ngOnInit(): void {}

    public searchLabel(key: string): void {

        this.labelsService.labels.forEach((label: any, index: number): void => {
            const lab_name: string = label.body.toLowerCase();
            if (lab_name.search(key.toLowerCase()) >= 0) {
                this.labelsService.labels[index].verify = !!1;
            } else {
                this.labelsService.labels[index].verify = !!0;
            }
        });
    }

    public addLabel(label: any, onCreate?: boolean): void {
        const selectedTicketsId: Array<number> = [];

        if (this.cloud.effect.createTicket) {
            this.labelsService.mergeLabel(label.id, 1);
            this.labelsService.readyForAssign.push(label);
            this.cloud.effect = 'changeLabelCreateTicket';
        } else {
            this.ticketsService.tickets.forEach((ticket: any, index: number) => {
                if (ticket.checked && !this.hesLabels(this.ticketsService.tickets[index], label)) {
                    this.ticketsService.tickets[index].labels.push(label);
                    this.labelsService.mergeLabel(label.id, 1);
                    selectedTicketsId.push(ticket.id);
                }
            });

            if (this.ticketsService.ticket && this.ticketsService.ticket.id && !onCreate) {
                selectedTicketsId.push(this.ticketsService.ticket.id);
                this.labelsService.mergeLabel(label.id, 1);
                this.ticketsService.ticket.labels.push(label);
            }

            if (selectedTicketsId.length) {
                this.socketService.mergeLabel(selectedTicketsId, label);

                this.labelsService.applyLabels(label.id, selectedTicketsId)
                    .then((data: any): void => {
                        if (data.success) {
                            if (this.cloud.effect.changeLabelTicket) {
                                this.cloud.effect = 'changeLabelTicket';
                            }
                        }
                    });
            }
        }
    }

    private hesLabels(ticket: TicketDtoInterface, label: LabelDtoInterface): boolean {
        const check: any = !!0;
        if (ticket.labels.length) {
            for (const lab in ticket.labels) {
                if (label.label_id === ticket.labels[lab].label_id) {
                    return true;
                }
            }
        }
        return check;
    }
}