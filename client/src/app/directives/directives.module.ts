import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ShowElipsisDirective} from './show-elipsis.directive';
import {CloseModalsDirective} from './clickOutsideModals.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        CloseModalsDirective,
        ShowElipsisDirective,
    ],
    exports : [
        CloseModalsDirective,
        ShowElipsisDirective,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class DirectivesModule { }