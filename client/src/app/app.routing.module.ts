import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './services/auth-guard/auth-guard.service';
import {SecondaryAuthGuard} from './services/auth-guard/secondary.auth-guard.service';
import {UsersProfileComponent} from './components/users-profile/users-profile.component';
import {LoginComponent} from './components/login/login.component';
import {LoginAgent} from './components/login-agent/login-agent';
import {RegisterComponent} from './components/register/register.component';
import {LogoutComponent} from './components/logout/logout.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {TicketsComponent} from './components/tickets/tickets.component';
import {TicketIndividualComponent} from './components/ticket-individual/ticket-individual.component';
import {SettingsComponent} from './components/settings/settings.component';

import {UsersComponent} from './components/users/users.component';
import {DeleteUser} from './components/delete-user/delete-user';
import {MailboxComponent} from './components/mailbox/mailbox.component';
import {AddMailbox} from './components/mailbox-form/add-mailbox.component';
import {CannedReplies} from './components/canned-replies/canned-replies.component';
import {ErrorsPopup} from './components/errors-popup/errors-popup.component';
import {StepsComponent} from './components/steps/steps.component';
import {Loading} from './components/loading/loading';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PreferencesComponent} from './components/preferences/preferences.component';
import {CompanyProfileComponent} from './components/company-profile/company-profile.component';
import {MailboxSettingsComponent} from './components/mailbox-settings/mailbox-settings.component';
import {CompanyUsersActive} from './components/company-users-active/company-users-active.component';
import {CompanyGroups} from './components/company-groups/company-groups.component';
import {CompanyBilling} from './components/company-billing/company-billing.component';
import {CompanyAPI} from './components/company-API/company-API.component';
import {EmailForgetPassword} from './components/email-forget-password/email-forget-password.component';
import {ForgetPassword} from './components/forget-password/forget-password.component';
import {UrlGuard} from './services/auth-guard/url-guard.service';
import {HomeComponent} from './components/home/home.component';
import {NotNavigateAuthGuardService} from './services/auth-guard/not-navigate-auth-guard.service';
import {GetStartedComponent} from './components/get-started/get-started.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CannedRepliesList} from './components/canned-replies-list/canned-replies-list';
import { FindCompanyComponent } from './components/find-company/find-company.component';

const APP_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotNavigateAuthGuardService],
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotNavigateAuthGuardService],
    },
    {
        path: 'register/:id',
        component: RegisterComponent,
        canActivate: [NotNavigateAuthGuardService],
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [NotNavigateAuthGuardService],
    },
    {
        path: 'get-started',
        component: GetStartedComponent,
        canActivate: [NotNavigateAuthGuardService],
    },
    {
        path: 'find-company',
        component: FindCompanyComponent,
        canActivate: [NotNavigateAuthGuardService],

    },
    {
        path: 'agent-login/:invitationhash',
        component: LoginAgent,
    },
    {
        path: '404',
        component: NotFoundComponent,
    },
    {
        path: 'forget-password',
        component: ForgetPassword,
        canActivate: [SecondaryAuthGuard],
    },
    {
        path: 'delete-user',
        component: DeleteUser,
        canActivate: [AuthGuard],
    },
    {
        path: 'errors-popup',
        component: ErrorsPopup,
        canActivate: [AuthGuard],
    },
    {
        path: 'steps',
        component: StepsComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'error-page',
        component: ErrorPageComponent,
    },
    {
        path: 'tickets',
        component: TicketsComponent,
        canActivate: [AuthGuard],
        data: {
            sidebar: 'sidebar',
            createLabel: 'create-label',
        },
    },
    {
        path: 'tickets',
        component: TicketsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'ticket/:id',
        component: TicketIndividualComponent,
        canActivate: [AuthGuard],
        data: {
            sidebar: 'sidebar',
            createLabel: 'create-label',
        },
    },
    {
        path: 'email-forget-password',
        component: EmailForgetPassword,
        canActivate: [SecondaryAuthGuard],
    },
    {
        path: 'settings',
        children: [
            {
                path: '',
                component: SettingsComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [UrlGuard],
            },
            {
                path: 'canned-replies',
                component: CannedReplies,
            },
            {
                path: 'canned-replies-list',
                component: CannedRepliesList,
            },
            {
                path: 'company-profile',
                component: CompanyProfileComponent,
                canActivate: [UrlGuard],
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
            },
            {
                path: 'preferences',
                component: PreferencesComponent,
            },
            {
                path: 'users-profile/:id',
                component: UsersProfileComponent,
            },
            {
                path: 'addMailbox',
                component: AddMailbox,
                canActivate: [UrlGuard],
            },
            {
                path: 'mailbox',
                component: MailboxComponent,
                canActivate: [UrlGuard],
            },
        ],
        canActivate: [AuthGuard],
        data: {
            sidebar: 'sidebar-settings',
        },
    },
    {
        path: 'company-users-active',
        component: CompanyUsersActive,
        canActivate: [AuthGuard, UrlGuard],
    },
    {
        path: 'company-groups',
        component: CompanyGroups,
        canActivate: [AuthGuard, UrlGuard],
    },
    {
        path: 'company-billing',
        component: CompanyBilling,
        canActivate: [AuthGuard, UrlGuard],
    },
    {
        path: 'company-API',
        component: CompanyAPI,
        canActivate: [AuthGuard, UrlGuard],
    },
    {
        path: 'mailbox-settings/:id',
        component: MailboxSettingsComponent,
        data: {
            sidebar: 'sidebar-settings',
        },
        canActivate: [AuthGuard, UrlGuard],
    },
    {
        path: 'mailbox-settings/:id/:type',
        component: MailboxSettingsComponent,
        canActivate: [AuthGuard, UrlGuard],
        data: {
            sidebar: 'sidebar-settings',
        },
    },
    {
        path: 'loading',
        component: Loading,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        component: TicketsComponent,
        canActivate: [AuthGuard],
        data: {
            sidebar: 'sidebar',
            createLabel: 'create-label',
        },
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule],
})

export class AppRoutingModule {
}
