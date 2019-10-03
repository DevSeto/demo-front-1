import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {Label} from '../../../dto';
import {TicketsService} from '../../../services/components/tickets.service';
import {ParentLabelsComponent} from '../../paren-labels/parent-labels.component';
import {SocketService} from '../../../services/components/socket.service';
import {LabelDtoInterface} from '../../dto/label/interfaces/label-dto.interface';

@Component({
    selector: 'create-label',
    templateUrl: '../html/create-label.component.html',
})

export class CreateLabel extends ParentLabelsComponent implements OnInit {

    public cloud: any = showed;
    public isOpen: boolean = !!0;

    public chooseColor: Array<string> =
        [
            '#f26c4f',
            '#fbaf5d',
            '#fff568',
            '#acd373',
            '#3cb878',
            '#1cbbb4',
            '#00bff3',
            '#448ccb',
            '#8560a8',
            '#f06eaa',
        ];

    public createdLabelData: any = {
        color: '#f26c4f',
        body: '',
    };

    constructor(public labelService: LabelsService,
                public labelsModel: LabelsModel,
                public socketService: SocketService,
                private label: Label,
                public ticketsService: TicketsService) {
        super(labelService, labelsModel, ticketsService, socketService);
    }

    public ngOnInit(): void {
    }

    @Output('labelsUpdated')
    public labelsUpdated: EventEmitter<any> = new EventEmitter<any>();

    public changeColor(color: string, event: any): void {
        let allColors: any;

        this.createdLabelData.color = color;
        allColors = document.getElementsByClassName('label-circle');

        for (const colors of allColors) {
            colors.classList.remove('big-label-size');
        }
        event.target.classList.add('big-label-size');
    }

    public createLabel(): void {
        let timeCount: number = 0,
            checkInterval: any;

        if (this.createdLabelData.color && this.createdLabelData.body) {
            this.labelService.createLabel(this.createdLabelData)
                .then((data: any): void => {
                    if (data.success) {
                        if (!this.isOpen)
                            this.isOpen = !!1;

                        checkInterval = setInterval((): void => {
                            timeCount += 1;
                            if (timeCount >= (3000 / 1000)) {
                                data.data.label_id = data.data.id;
                                this.isOpen = !!0;
                                this.labelService.labels.unshift(data.data);

                                this.labelService.labels.forEach((label: LabelDtoInterface, index: number) => {
                                    if (!label) {
                                        this.labelService.labels.splice(index, 1);
                                    }
                                });
                                this.labelService.changedLabelsLength.emit(this.labelService.labels.length);
                                this.labelsModel.insert(this.labelService.labels);
                                this.addLabel(data.data);
                                this.socketService.sentNewLabels(data.data);
                                this.cloud.effect = 'createLabel';

                                clearInterval(checkInterval);
                            }
                        }, 100);
                    }
                });
        }
    }
}
