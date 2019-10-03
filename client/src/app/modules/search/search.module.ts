import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SearchTickets} from './search.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        SearchTickets,
    ],
    providers: [
    ],
    exports: [
        SearchTickets,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class SearchTicketsModule { }
