import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {UserExpandedDtoInterface} from '../interfaces/user-expanded-dto.interface';

type USER = Array<UserExpandedDtoInterface>;

@Injectable()
export class ActiveUsers extends Array<UserModel> implements USER {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, ActiveUsers.prototype);
    }

    public set(allUsers: USER): void {
        for (const user in allUsers)
            this[user] = allUsers[user];
    }
}