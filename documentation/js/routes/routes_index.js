var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"APP_ROUTES","filename":"client/src/app/app.routing.module.ts","module":"AppRoutingModule","children":[{"path":"login","component":"LoginComponent","canActivate":["SecondaryAuthGuard"]},{"path":"agent-login","component":"LoginAgent"},{"path":"forget-password","component":"ForgetPassword","canActivate":["SecondaryAuthGuard"]},{"path":"busy","component":"BusyComponent"},{"path":"delete-user","component":"DeleteUser","canActivate":["AuthGuard"]},{"path":"reset-password","component":"ResetPassword","canActivate":["AuthGuard"]},{"path":"hour-settings","component":"HourSettings","canActivate":["AuthGuard"]},{"path":"errors-popup","component":"ErrorsPopup","canActivate":["AuthGuard"]},{"path":"steps","component":"StepsComponent","canActivate":["AuthGuard"]},{"path":"register","component":"RegisterComponent","canActivate":["SecondaryAuthGuard"]},{"path":"logout","component":"LogoutComponent","canActivate":["AuthGuard"]},{"path":"error-page","component":"ErrorPageComponent"},{"path":"tickets","component":"TicketsComponent","canActivate":["AuthGuard"],"data":{"sidebar":"sidebar","createLabel":"create-label"}},{"path":"tickets/:status","component":"TicketsComponent","canActivate":["AuthGuard"]},{"path":"ticket/:id","component":"TicketIndividualComponent","canActivate":["AuthGuard"],"data":{"sidebar":"sidebar","createLabel":"create-label"}},{"path":"email-forget-password","component":"EmailForgetPassword","canActivate":["SecondaryAuthGuard"]},{"path":"settings","children":[{"path":"","component":"SettingsComponent"},{"path":"users","component":"UsersComponent"},{"path":"canned-replies","component":"CannedReplies"},{"path":"company-profile","component":"CompanyProfileComponent"},{"path":"notifications","component":"NotificationsComponent"},{"path":"preferences","component":"PreferencesComponent"},{"path":"users-profile/:id","component":"UsersProfileComponent"},{"path":"addMailbox","component":"AddMailbox"},{"path":"mailbox","component":"MailboxComponent"}],"canActivate":["AuthGuard"],"data":{"sidebar":"sidebar-settings"}},{"path":"company-users-active","component":"CompanyUsersActive","canActivate":["AuthGuard"]},{"path":"company-groups","component":"CompanyGroups","canActivate":["AuthGuard"]},{"path":"company-billing","component":"CompanyBilling","canActivate":["AuthGuard"]},{"path":"company-API","component":"CompanyAPI","canActivate":["AuthGuard"]},{"path":"mailbox-settings/:id","component":"MailboxSettingsComponent","data":{"sidebar":"sidebar-settings"},"canActivate":["AuthGuard"]},{"path":"mailbox-settings/:id/:type","component":"MailboxSettingsComponent","canActivate":["AuthGuard"],"data":{"sidebar":"sidebar-settings"}},{"path":"loading","component":"Loading","canActivate":["AuthGuard"]},{"path":"","component":"TicketsComponent","canActivate":["AuthGuard"],"data":{"sidebar":"sidebar","createLabel":"create-label"}},{"path":"**","redirectTo":""}],"kind":"module"},{"name":"sidebarRoutes","filename":"client/src/app/modules/sidebar/sidebar-routing.module.ts","module":"SidebarRoutingModule","children":[],"kind":"module"}]}