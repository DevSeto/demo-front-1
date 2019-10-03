import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariables} from '../extra/global.variables';
import {LabelsModel} from '../../models/components/labels.model';
import {GlobalServices} from '../helpers/global.service';
import {UsersModel} from '../../models/components/users.model';
import {Label} from '../../dto';
import {LabelModel} from '../../modules/dto/label/models/label.model';

@Injectable()
export class LabelsService {

    private labelsUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/ticketing/labels';
    private applyLabelsUrl: string = GlobalVariables.BACKEND_API_URL + '/tickets/';

    constructor(private http: HttpClient,
                private labelsModel: LabelsModel,
                private userModel: UsersModel,
                public labels: Label) {
    }

    public readyForAssign: Array<LabelModel> = [];
    public changedLabelsLength: EventEmitter<number> = new EventEmitter<number>();

    public inactiveLabel: any = {
        ids: {} as any,
        selectedTicketsCount: 0 as number,
    };

    /**
     * count labels in selected tickets
     * @param {number} labelId
     * @param {number} counter
     */
    public mergeLabel(labelId: number, counter: number = 1): void {
        if (!this.inactiveLabel.ids[labelId]) {
            this.inactiveLabel.ids[labelId] = 0;
        }

        if (this.inactiveLabel.ids[labelId] + 1 * counter >= 0) {
            this.inactiveLabel.ids[labelId] = this.inactiveLabel.ids[labelId] + 1 * counter;
        }
    }

    public getLabels(): Promise<any> {
        return this.http.get(this.labelsUrl, GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.labelsModel.extractData)
            .catch(this.labelsModel.handleError);
    }

    public getLabel(id: number): Promise<any> {
        const url: string = this.labelsUrl + '/' + id;

        return this.http.get(url, GlobalServices.AuthHeader())
            .toPromise()
            .then(this.labelsModel.extractData)
            .catch(this.labelsModel.handleError);
    }

    public createLabel(newLabel: any): Promise<any> {
        return this.http.post(
            this.labelsUrl,
            this.labelsModel.dataCompile(newLabel),
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.labelsModel.extractData)
            .catch(this.labelsModel.handleError);
    }

    public updateLabel(id: number): Promise<any> {
        const url: string = this.labelsUrl + '/' + id;

        return this.http.put(url, '', GlobalServices.AuthHeader())
            .toPromise()
            .then(this.labelsModel.extractData)
            .catch(this.labelsModel.handleError);
    }

    public deleteLabel(id: number): Promise<any> {
        const url: string = this.labelsUrl + '/' + id;

        return this.http.delete(url, GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.labelsModel.extractData)
            .catch(this.labelsModel.handleError);
    }

    public deleteLabelForTicket(labelId: number, ticketId: number): Promise<any> {
        const url: string = this.applyLabelsUrl + 'labels/' + labelId + '/' + ticketId;

        return this.http.delete(url, GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.labelsModel.extractData)
            .catch(this.labelsModel.handleError);
    }

    public deleteAllLabels(): Promise<any> {
        return this.http.delete(this.labelsUrl, GlobalServices.AuthHeader())
            .toPromise()
            .then(this.labelsModel.extractData)
            .catch(this.labelsModel.handleError);
    }

    public applyLabels(labelId: any, ticketIds: Array<number>): Promise<any> {
        const url: string = this.applyLabelsUrl + 'labels/' + labelId;

        return this.http.post(url, this.labelsModel.dataCompile({ticket_ids: ticketIds}), GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.labelsModel.extractData)
            .catch(this.labelsModel.handleError);
    }
}