import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CannedReplyModuleComponent} from './canned-reply-module.component';
import {SvgsModule} from '../svg-html/svg-module';
@NgModule({
    imports: [
        FormsModule,
        SvgsModule,
        CommonModule,
    ],
    declarations: [
        CannedReplyModuleComponent,
    ],
    providers: [],
    exports: [
        CannedReplyModuleComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CannedReplyModule {}