import {NgModule} from '@angular/core';
import {Label, TicketLabel} from './';

@NgModule({
    providers: [
        Label,
        TicketLabel,
    ],
})

export class LabelModule { }
