import {Injectable} from '@angular/core';
import {StatusActiveDtoInterface} from '../interfaces/status-active-dto.interface';
import {StatusActiveModel} from '../models/status-active.model';

@Injectable()
export class StatusActive extends StatusActiveModel implements StatusActiveDtoInterface {

}
