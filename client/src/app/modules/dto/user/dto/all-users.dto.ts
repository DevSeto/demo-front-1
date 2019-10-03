import {Injectable} from '@angular/core';
import {UserExpandedDtoInterface} from '../interfaces/user-expanded-dto.interface';
import {User} from './user.dto';

type USER = Array<UserExpandedDtoInterface>;

@Injectable()
export class AllUsers extends Array<User> implements USER {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, AllUsers.prototype);
    }

    public set(users: USER): void {
        for (const user in users)
            this[user] = users[user];
    }
}