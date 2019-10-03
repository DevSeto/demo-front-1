import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {UserExpandedDtoInterface} from '../interfaces/user-expanded-dto.interface';
type USERS = UserExpandedDtoInterface;

@Injectable()
export class User extends UserModel implements USERS {}