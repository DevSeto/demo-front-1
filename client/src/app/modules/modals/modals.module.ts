import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CreateLabel} from './components/create-label.component';
import {CreateTicket} from './components/create-ticket.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {MergeTickets} from './components/merge-ticket.component';
import {ApplicationPipesModule} from '../../ApplicationPipesModule.module';
import {ChangeLabelModule} from '../change-label/change-label.module';
import {CreateCannedReplies} from './components/create-canned-replies';
import {AddAnotherUser} from './components/add-another-user';
import {AddUserComponent} from './components/add-user.component';
import {NotificationDropdownComponent} from './notification/notification-dropdown.component';
import {TicketDtoModule} from '../dto/ticket/ticket-dto.module';
import {DropdownModule} from '../dropdown/dropdown.module';
import {DirectivesModule} from '../../directives/directives.module';
import {FormErrors} from '../../components/control/form.errors';
import {ImagesPopup} from './components/images.component';
import {ResetPassword} from './components/reset-password';
import {NgPipesModule} from 'ngx-pipes';
import {IndividualModule} from '../individual-timeline/individual.module';
import {MultiSelectModule} from '../multi-select/multi-select.module';
import {ViewDeleteCannedRepliesComponent} from './components/view-delete-canned-replies.component';
import { SvgsModule } from '../svg-html/svg-module';

@NgModule({
    imports: [
        IndividualModule,
        MultiSelectModule,
        NgPipesModule,
        CommonModule,
        FormsModule,
        DirectivesModule,
        DropdownModule,
        ReactiveFormsModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        ApplicationPipesModule,
        TicketDtoModule,
        ChangeLabelModule,
        SvgsModule,
    ],
    declarations: [
        CreateLabel,
        CreateTicket,
        NotificationDropdownComponent,
        ViewDeleteCannedRepliesComponent,
        MergeTickets,
        FormErrors,
        CreateCannedReplies,
        AddAnotherUser,
        AddUserComponent,
        ImagesPopup,
        ResetPassword,
    ],
    providers: [],
    exports: [
        CreateLabel,
        CreateTicket,
        NotificationDropdownComponent,
        MergeTickets,
        FormErrors,
        AddAnotherUser,
        ViewDeleteCannedRepliesComponent,
        AddUserComponent,
        CreateCannedReplies,
        ImagesPopup,
        ResetPassword,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalsModule {}
