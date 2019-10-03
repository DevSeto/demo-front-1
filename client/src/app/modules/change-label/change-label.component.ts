import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LabelsService} from '../../services/components/labels.service';
import {LabelsModel} from '../../models/components/labels.model';
import {Label} from '../../modules/dto/label/dto/label.dto';
import {TicketsService} from '../../services/components/tickets.service';
import {ParentLabelsComponent} from '../paren-labels/parent-labels.component';
import {SocketService} from '../../services/components/socket.service';

@Component({
    selector: 'change-label',
    templateUrl: './change-lable.component.html',
})

export class ChangeLabel extends ParentLabelsComponent implements OnInit {

    public showLabels: boolean = !!1;
    public cloud: any = showed;
    public lastTreeLabels: Array<any> = [];
    public labels: Array<any> = [];
    public addScroll: boolean = !!0;
    public labelsIsUpdated: Array<any> = [];

    public selectMenu: any = {
        boxSearch: !!0 as boolean,
        changelabel: !!0 as boolean,
        createLabel: !!0 as boolean,
    };

    constructor(private router: Router,
                public labelsService: LabelsService,
                public labelsModel: LabelsModel,
                public ticketsService: TicketsService,
                public socketService: SocketService,
                private label: Label) {

        super(labelsService, labelsModel, ticketsService, socketService);
    }

    public ngOnInit(): void {
        this.subScribe();
        this.filterLabel(this.labelsService.labels);
    }

    public subScribe(): void {
        this.labelsService.changedLabelsLength.subscribe((count: number): void => {
            if (count > this._maxShowedLabels) {
                this.addScroll = !!1;
                this.selectMenu.boxSearch = !!1;
            }
        });
    }

    public filterLabel(labels: any, updated?: boolean): void {
        this.labelsService.labels = labels;
        this.labelsService.changedLabelsLength.emit(labels.length);
    }

    public showAllLabels(): void {
        this.searchVale = '';
        this.labelsService.labels.forEach((label: any, index: number): void => {
            this.labelsService.labels[index].verify = !!0;
        });
    }
}