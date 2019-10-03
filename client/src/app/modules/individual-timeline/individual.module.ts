import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {TicketNote} from './components/note.component';
import {TicketComment} from './components/comment.component';
import {AddReplyComment} from './components/add-reply.component';
import {AddNote} from './components/add-note.component';
import {TicketMerge} from './components/merge.component';
import {ApplicationPipesModule} from '../../ApplicationPipesModule.module';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {DropdownModule} from '../dropdown/dropdown.module';
// import {NgStringPipesModule} from '../../pipes/string';
import {AddForward} from './components/add-forward.component';
import {MultiSelectModule} from '../multi-select/multi-select.module';
import {ChangeLabelModule} from '../change-label/change-label.module';
import {TicketHistory} from './components/ticket-history.component';
import {CustomerTickets} from './components/customer-tickets.component';
import {TicketForward} from './components/forward.component';
import {ModalsModule} from '../modals/modals.module';
import {TimelineFilesComponent} from './components/timeline-files.component';

@NgModule({
    imports: [
        CommonModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        MultiSelectModule,
        ChangeLabelModule,
        DropdownModule,
        // NgStringPipesModule,
        ApplicationPipesModule,
    ],
    declarations: [
        TicketNote,
        TimelineFilesComponent,
        AddNote,
        CustomerTickets,
        AddForward,
        TicketHistory,
        AddReplyComment,
        TicketComment,
        TicketMerge,
        TicketForward,
    ],
    providers: [],
    exports: [
        TicketNote,
        TimelineFilesComponent,
        AddNote,
        TicketHistory,
        CustomerTickets,
        AddForward,
        AddReplyComment,
        TicketComment,
        TicketMerge,
        TicketForward,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class IndividualModule {}
