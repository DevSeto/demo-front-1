import {Injectable} from '@angular/core';
import {LabelDtoInterface} from '../interfaces/label-dto.interface';
import {LabelModel} from '../models/label.model';

type LABEL = Array<LabelDtoInterface>;

@Injectable()
export class Label extends Array<LabelModel> implements LABEL {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, Label.prototype);
    }

    public set(labels: LABEL): void {
        for (const label in labels)
            this[label] = labels[label];
    }
}