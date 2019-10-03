import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {UserDtoInterface} from '../interfaces/user-dto.interface';

@Injectable()
export class AlternativeUser extends UserModel implements UserDtoInterface {

}