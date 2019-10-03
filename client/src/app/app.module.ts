import {NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {StopScrollingDirective} from './directives/stop-scrolling.directive';

declare let $: any;
import 'angular2-navigate-with-data';
import { NgxY2PlayerModule } from 'ngx-y2-player';
import {AppRoutingModule} from './app.routing.module';
import {MultiSelectModule} from './modules/multi-select/multi-select.module';
import {DropdownModule} from './modules/dropdown/dropdown.module';
import {PaginationModule} from './modules/pagination/pagination.module';
import {RECAPTCHA_SERVICE_PROVIDER} from './services/extra/captcha.service';
import {MainFooterComponent} from './components/main/main.footer';
import {MainHeaderLoggedComponent} from './components/main/main.header.logged';
import {LoginComponent} from './components/login/login.component';
import {LoginAgent} from './components/login-agent/login-agent';
import {RegisterComponent} from './components/register/register.component';
import {UsersProfileComponent} from './components/users-profile/users-profile.component';
import {SettingsComponent} from './components/settings/settings.component';
import {LogoutComponent} from './components/logout/logout.component';
import {UsersService} from './services/components/users.service';
import {ValidationService} from './services/helpers/validation.service';
import {AuthGuard} from './services/auth-guard/auth-guard.service';
import {SecondaryAuthGuard} from './services/auth-guard/secondary.auth-guard.service';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {ReCaptchaComponent} from './components/captcha/captcha.component';
import {TicketsComponent} from './components/tickets/tickets.component';
import {TicketIndividualComponent} from './components/ticket-individual/ticket-individual.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PreferencesComponent} from './components/preferences/preferences.component';
import {CompanyProfileComponent} from './components/company-profile/company-profile.component';
import {AutoReplyTabComponent} from './components/mailbox-settings/mailboxTabs/auto_reply_tab.component';
import {MailboxSettingsComponent} from './components/mailbox-settings/mailbox-settings.component';
import {CompanyUsersActive} from './components/company-users-active/company-users-active.component';
import {CompanyGroups} from './components/company-groups/company-groups.component';
import {CompanyBilling} from './components/company-billing/company-billing.component';
import {CompanyAPI} from './components/company-API/company-API.component';
import {MailboxComponent} from './components/mailbox/mailbox.component';
import {AddMailbox} from './components/mailbox-form/add-mailbox.component';
import {DeleteUser} from './components/delete-user/delete-user';
import {ChangeLabelModule} from './modules/change-label/change-label.module';
import {ErrorsPopup} from './components/errors-popup/errors-popup.component';
import {VerifyPopup} from './components/verify-popup/verify-popup.component';

import {EmailForgetPassword} from './components/email-forget-password/email-forget-password.component';
import {ForgetPassword} from './components/forget-password/forget-password.component';
import {CannedReplies} from './components/canned-replies/canned-replies.component';
import {UsersModel} from './models/components/users.model';
import {Sentry} from './services/extra/sentry.service';

import {CannedrepliesService} from './services/components/cannedreplies.service';
import {CookieService} from './services/cookie/cookies.service';
import {NotificationsService} from './services/components/notifications.service';
import {TicketsService} from './services/components/tickets.service';
import {MailBoxService} from './services/components/mailbox.service';
import {ErrorService} from './services/components/error.service';
import {MailBoxModel} from './models/components/mailbox.model';
import {TicketsModel} from './models/components/tickets.model';
import {UsersComponent} from './components/users/users.component';
import {NumberedCycle} from './pipes/number/numbered-cycle';
import {RandomColorsPipe} from './pipes/randomColors/randomColors';
import {LabelsService} from './services/components/labels.service';
import {LabelsModel} from './models/components/labels.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StepsComponent} from './components/steps/steps.component';
import {Loading} from './components/loading/loading';

import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {ToastrModule} from './modules/toastr';
import {DtoModule} from './modules/dto/dto.module';
import {SidebarModule} from './modules/sidebar/sidebar.module';
import {ModalsModule} from './modules/modals/modals.module';
import {IndividualModule} from './modules/individual-timeline/individual.module';
import {SidebarModel} from './models/components/sidebar.model';
import {InboxDataModel} from './models/components/inbox-data.model';
import {ApplicationPipesModule} from './ApplicationPipesModule.module';
import {TicketsChildsComponent} from './components/tickets/tickets-childs.component';
import {TicketsGlobalRequestsComponent} from './components/ticket-golbal-request/ticket-global-requests.component';
import {ParentLabelsComponent} from './modules/paren-labels/parent-labels.component';
import {CoreComment} from './modules/individual-timeline/core/core.component';
import {CompanyStorageModel} from './models/components/company.model';

import {SearchTicketsModule} from './modules/search/search.module';
import {SocketComponent} from './components/socket/socket.component';
import {SocketService} from './services/components/socket.service';
import {DraftService} from './services/components/draft.service';
import {NotificationJson} from './jsons/notification.json';
import {EnabledHoursModule} from './modules/enabled-hours/enabled-hours.module';
import {UrlGuard} from './services/auth-guard/url-guard.service';
import {IntegrationService} from './services/integration/integration.service';
import {UsersPreferencesModel} from './models/components/usersPreferences.model';
import {OpenImageDirective} from './directives/open-image.directive';
import {NgPipesModule} from 'ngx-pipes';
import {VariablesJson} from './jsons/variables.json';
import {EditMailbox} from './components/mailbox-form/edit-mailbox.component';
import {SvgsModule} from './modules/svg-html/svg-module';
import {OldMainHeaderLoggedComponent} from './components/main/old.main.header.logged';
import {TicketslistComponent} from './components/tickets/tickets-list.component';
import {TicketsGridComponent} from './components/tickets/tickets-grid.component';
import {ConnectionComponent} from './components/mailbox-settings/mailboxTabs/connection.component';
import {HomeComponent} from './components/home/home.component';
import {SigneUpCompanyForwardComponent} from './components/register/steps/signe-up-company-forward.component';
import {SigneUpEmailComponent} from './components/register/steps/signe-up-email.component';
import {SigneUpCompanyOptionsComponent} from './components/register/steps/signe-up-company-options.component';
import {SigneUpAnotherEmailComponent} from './components/register/steps/signe-up-another-email.component';
import {SigneUpSubdomainComponent} from './components/register/steps/signe-up-subdomain.component';
import {RegisterBaseComponent} from './components/register/steps/register-base.component';
import {NotNavigateAuthGuardService} from './services/auth-guard/not-navigate-auth-guard.service';
import {SubdomainLoginComponent} from './components/login/subdomain-login.component';
import {GetStartedComponent} from './components/get-started/get-started.component';
import {TrackComponent} from './modules/app-track/track.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UsersJson} from './jsons/users.json';
import {CannedReplyModule} from './modules/canned-reply-module/canned-reply.module';
import {ActionGifComonent} from './components/action-gif/action-gif.component';
import {ActionGifService} from './services/components/action-git.service';
import { AlertComponent } from './components/alert/alert.component';
import { PopoverModule } from './modules/popover/popover.module';
import { CannedRepliesList } from './components/canned-replies-list/canned-replies-list';
import { FindCompanyComponent } from './components/find-company/find-company.component';
import { DemoMailboxStepsComponent } from './components/demo-mailbox-steps/demo-mailbox-steps.component';

@NgModule({
    imports: [
        NgxY2PlayerModule,
        SvgsModule,
        NgPipesModule,
        PopoverModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        PaginationModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        DtoModule,
        SidebarModule,
        SvgsModule,
        MultiSelectModule,
        DropdownModule,
        ChangeLabelModule,
        ModalsModule,
        IndividualModule,
        ApplicationPipesModule,
        SearchTicketsModule,
        CannedReplyModule,
        EnabledHoursModule,
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        DemoMailboxStepsComponent,
        FindCompanyComponent,
        TrackComponent,
        SigneUpCompanyForwardComponent,
        SigneUpEmailComponent,
        SigneUpCompanyOptionsComponent,
        SigneUpAnotherEmailComponent,
        SigneUpSubdomainComponent,
        GetStartedComponent,
        HomeComponent,
        EditMailbox,
        ConnectionComponent,
        TicketsGridComponent,
        TicketslistComponent,
        MainFooterComponent,
        RegisterBaseComponent,
        MainHeaderLoggedComponent,
        OldMainHeaderLoggedComponent,
        LoginComponent,
        LoginAgent,
        RegisterComponent,
        AutoReplyTabComponent,
        LogoutComponent,
        ErrorPageComponent,
        ReCaptchaComponent,
        TicketsComponent,
        TicketIndividualComponent,
        UsersProfileComponent,
        SettingsComponent,
        SubdomainLoginComponent,
        UsersComponent,
        NotificationsComponent,
        PreferencesComponent,
        CompanyProfileComponent,
        MailboxSettingsComponent,
        CompanyUsersActive,
        CompanyGroups,
        CompanyBilling,
        CompanyAPI,
        MailboxComponent,
        AddMailbox,
        CannedReplies,
        ErrorsPopup,
        VerifyPopup,
        Loading,
        StepsComponent,
        DeleteUser,
        EmailForgetPassword,
        ForgetPassword,
        NumberedCycle,
        ClickOutsideDirective,
        StopScrollingDirective,
        OpenImageDirective,
        RandomColorsPipe,
        TicketsChildsComponent,
        TicketsGlobalRequestsComponent,
        ParentLabelsComponent,
        SocketComponent,
        CoreComment,
        ActionGifComonent,
        AlertComponent,
        CannedRepliesList,
    ],
    providers: [
        NotificationJson,
        VariablesJson,
        AuthGuard,
        UrlGuard,
        UsersJson,
        SocketService,
        DraftService,
        NotNavigateAuthGuardService,
        CannedrepliesService,
        SecondaryAuthGuard,
        Title,
        DatePipe,
        UsersService,
        ErrorService,
        ValidationService,
        CompanyStorageModel,
        UsersModel,
        UsersPreferencesModel,
        SidebarModel,
        CookieService,
        NotificationsService,
        TicketsService,
        TicketsModel,
        LabelsService,
        LabelsModel,
        InboxDataModel,
        MailBoxService,
        MailBoxModel,
        IntegrationService,
        ActionGifService,
        RECAPTCHA_SERVICE_PROVIDER,
        {
            provide: ErrorHandler,
            useClass: Sentry,
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],

})
export class AppModule {
}
