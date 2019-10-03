import {Injectable} from '@angular/core';
import {StatusDtoInterface} from '../interfaces/status-dto.interface';
import {StatusModel} from '../models/status.model';

@Injectable()

export class Status extends StatusModel implements StatusDtoInterface {

}
