import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EnabledHours} from './enabled-hours.component';
import {FormsModule} from '@angular/forms';
import {NKDatetimeModule} from '../ng2-datetime/src/ng2-datetime/ng2-datetime.module';
import {DropdownModule} from '../dropdown/dropdown.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NKDatetimeModule,
        DropdownModule,
    ],
    declarations: [
        EnabledHours,
    ],
    providers: [
    ],
    exports: [
        EnabledHours,
    ],
})

export class EnabledHoursModule {}
