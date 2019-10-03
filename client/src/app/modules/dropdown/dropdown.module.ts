import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownNotClosableZone} from './dropdown-not-closable-zone';
import {Dropdown} from './dropdown';
import {DropdownOpen} from './dropdown-open';
import {CannedRepliesDropdown} from './canned-replies/canned-replies.component';
import {CannedReplyModule} from '../canned-reply-module/canned-reply.module';
import { SvgsModule } from '../svg-html/svg-module';

@NgModule({
    imports: [
        CommonModule,
        CannedReplyModule,
        SvgsModule,
    ],
    declarations: [
        CannedRepliesDropdown,
        DropdownNotClosableZone,
        Dropdown,
        DropdownOpen,
    ],
    exports: [
        CannedRepliesDropdown,
        DropdownNotClosableZone,
        Dropdown,
        DropdownOpen,
    ],
})

export class DropdownModule {
}
