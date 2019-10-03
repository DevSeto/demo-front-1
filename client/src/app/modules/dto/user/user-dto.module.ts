import {NgModule} from '@angular/core';
import {User, AlternativeUser, AllUsers, ActiveUsers} from './';

@NgModule({
    providers: [
        User,
        AllUsers,
        ActiveUsers,
        AlternativeUser,
    ],
})

export class UserDtoModule { }
