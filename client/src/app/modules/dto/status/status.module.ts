import {NgModule} from '@angular/core';
import {Status, StatusActive} from './';

@NgModule({
    providers: [
        Status,
        StatusActive,
    ],
})

export class StatusDtoModule { }
