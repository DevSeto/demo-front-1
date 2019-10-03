import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ChangeLabel} from './change-label.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        ChangeLabel,
    ],
    providers: [],
    exports: [
        ChangeLabel,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ChangeLabelModule {}
