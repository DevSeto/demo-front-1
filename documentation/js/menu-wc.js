'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">Birddesk documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' : 'data-target="#xs-components-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' : 'id="xs-components-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' }>
                                        <li class="link">
                                            <a href="components/AddMailbox.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddMailbox</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AutoReplyTabComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutoReplyTabComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/BusyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BusyComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CannedReplies.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CannedReplies</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompanyAPI.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyAPI</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompanyBilling.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyBilling</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompanyGroups.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyGroups</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompanyProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyProfileComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompanyUsersActive.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyUsersActive</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CoreComment.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CoreComment</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DeleteUser.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteUser</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EmailForgetPassword.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailForgetPassword</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ErrorPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorPageComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ErrorsPopup.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorsPopup</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ForgetPassword.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgetPassword</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HourSettings.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HourSettings</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/IndexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IndexComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/Loading.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">Loading</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginAgent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginAgent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LogoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogoutComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MailboxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MailboxComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MailboxSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MailboxSettingsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MainFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainFooterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MainHeaderLoggedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainHeaderLoggedComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NotificationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ParentLabelsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParentLabelsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PreferencesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PreferencesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ReCaptchaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReCaptchaComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResetPassword.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPassword</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SocketComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SocketComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/StepsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">StepsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketIndividualComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketIndividualComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketsChildsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketsChildsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketsGlobalRequestsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketsGlobalRequestsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UsersProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersProfileComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/VerifyPopup.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">VerifyPopup</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' : 'data-target="#xs-directives-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' : 'id="xs-directives-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' }>
                                        <li class="link">
                                            <a href="directives/ClickOutsideDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClickOutsideDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/StopScrollingDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">StopScrollingDirective</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' : 'data-target="#xs-injectables-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' : 'id="xs-injectables-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' }>
                                        <li class="link">
                                            <a href="injectables/CannedrepliesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CannedrepliesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CompanyStorageModel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CompanyStorageModel</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CookieService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CookieService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DraftService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>DraftService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ErrorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ErrorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InboxDataModel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>InboxDataModel</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LabelsModel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LabelsModel</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LabelsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LabelsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailBoxModel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MailBoxModel</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailBoxService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MailBoxService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>NotificationsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SidebarModel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SidebarModel</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SocketService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SocketService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TicketsModel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TicketsModel</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TicketsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TicketsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersModel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UsersModel</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UsersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ValidationService</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' : 'data-target="#xs-pipes-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' : 'id="xs-pipes-links-module-AppModule-5a7b5ad39158fbc68b5624fb299650cb"' }>
                                        <li class="link">
                                            <a href="pipes/NumberedCycle.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NumberedCycle</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/RandomColorsPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RandomColorsPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ApplicationPipesModule.html" data-type="entity-link">ApplicationPipesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-ApplicationPipesModule-6e97052ad5dffac5c9cc8ce35bcc715d"' : 'data-target="#xs-pipes-links-module-ApplicationPipesModule-6e97052ad5dffac5c9cc8ce35bcc715d"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-ApplicationPipesModule-6e97052ad5dffac5c9cc8ce35bcc715d"' : 'id="xs-pipes-links-module-ApplicationPipesModule-6e97052ad5dffac5c9cc8ce35bcc715d"' }>
                                        <li class="link">
                                            <a href="pipes/CircleLetters.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CircleLetters</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/CutString.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CutString</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SanitizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SanitizePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/TimePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimePipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CannedReplyDtoModule.html" data-type="entity-link">CannedReplyDtoModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-CannedReplyDtoModule-78d4a3bfbc8f983db0eddeb1cc54f4f8"' : 'data-target="#xs-injectables-links-module-CannedReplyDtoModule-78d4a3bfbc8f983db0eddeb1cc54f4f8"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-CannedReplyDtoModule-78d4a3bfbc8f983db0eddeb1cc54f4f8"' : 'id="xs-injectables-links-module-CannedReplyDtoModule-78d4a3bfbc8f983db0eddeb1cc54f4f8"' }>
                                        <li class="link">
                                            <a href="injectables/CannedReplies.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CannedReplies</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Categorys.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Categorys</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ChangeLabelModule.html" data-type="entity-link">ChangeLabelModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ChangeLabelModule-2074709c55304fba53db091a1d56b69a"' : 'data-target="#xs-components-links-module-ChangeLabelModule-2074709c55304fba53db091a1d56b69a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ChangeLabelModule-2074709c55304fba53db091a1d56b69a"' : 'id="xs-components-links-module-ChangeLabelModule-2074709c55304fba53db091a1d56b69a"' }>
                                        <li class="link">
                                            <a href="components/ChangeLabel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangeLabel</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CompanyModule.html" data-type="entity-link">CompanyModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-CompanyModule-59d40f17e92a611112b78b950f62b9ae"' : 'data-target="#xs-injectables-links-module-CompanyModule-59d40f17e92a611112b78b950f62b9ae"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-CompanyModule-59d40f17e92a611112b78b950f62b9ae"' : 'id="xs-injectables-links-module-CompanyModule-59d40f17e92a611112b78b950f62b9ae"' }>
                                        <li class="link">
                                            <a href="injectables/Company.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Company</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DirectivesModule.html" data-type="entity-link">DirectivesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-DirectivesModule-042d0952df3bf575be107fa8c7cab14f"' : 'data-target="#xs-directives-links-module-DirectivesModule-042d0952df3bf575be107fa8c7cab14f"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-DirectivesModule-042d0952df3bf575be107fa8c7cab14f"' : 'id="xs-directives-links-module-DirectivesModule-042d0952df3bf575be107fa8c7cab14f"' }>
                                        <li class="link">
                                            <a href="directives/CloseModalsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CloseModalsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ShowElipsisDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShowElipsisDirective</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DropdownModule.html" data-type="entity-link">DropdownModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-DropdownModule-8fc077c302a431b6a66b9ef76fc00cc9"' : 'data-target="#xs-components-links-module-DropdownModule-8fc077c302a431b6a66b9ef76fc00cc9"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-DropdownModule-8fc077c302a431b6a66b9ef76fc00cc9"' : 'id="xs-components-links-module-DropdownModule-8fc077c302a431b6a66b9ef76fc00cc9"' }>
                                        <li class="link">
                                            <a href="components/CannedRepliesDropdown.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CannedRepliesDropdown</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-DropdownModule-8fc077c302a431b6a66b9ef76fc00cc9"' : 'data-target="#xs-directives-links-module-DropdownModule-8fc077c302a431b6a66b9ef76fc00cc9"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-DropdownModule-8fc077c302a431b6a66b9ef76fc00cc9"' : 'id="xs-directives-links-module-DropdownModule-8fc077c302a431b6a66b9ef76fc00cc9"' }>
                                        <li class="link">
                                            <a href="directives/Dropdown.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">Dropdown</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/DropdownNotClosableZone.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropdownNotClosableZone</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/DropdownOpen.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropdownOpen</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DtoModule.html" data-type="entity-link">DtoModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/IndividualModule.html" data-type="entity-link">IndividualModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-IndividualModule-d712aac25366825939c08aaba65a7b09"' : 'data-target="#xs-components-links-module-IndividualModule-d712aac25366825939c08aaba65a7b09"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-IndividualModule-d712aac25366825939c08aaba65a7b09"' : 'id="xs-components-links-module-IndividualModule-d712aac25366825939c08aaba65a7b09"' }>
                                        <li class="link">
                                            <a href="components/AddForward.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddForward</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AddNote.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddNote</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AddReplyComment.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddReplyComment</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CustomerTickets.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomerTickets</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketComment.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketComment</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketForward.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketForward</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketHistory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketHistory</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketMerge.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketMerge</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TicketNote.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketNote</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/IndividualRoutingModule.html" data-type="entity-link">IndividualRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/LabelModule.html" data-type="entity-link">LabelModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-LabelModule-93067ed2fcb9474d8c61861b91a1bc36"' : 'data-target="#xs-injectables-links-module-LabelModule-93067ed2fcb9474d8c61861b91a1bc36"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-LabelModule-93067ed2fcb9474d8c61861b91a1bc36"' : 'id="xs-injectables-links-module-LabelModule-93067ed2fcb9474d8c61861b91a1bc36"' }>
                                        <li class="link">
                                            <a href="injectables/Label.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Label</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MailboxDtoModule.html" data-type="entity-link">MailboxDtoModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-MailboxDtoModule-26eb06a027b4c6c14ddecd2ce605f67f"' : 'data-target="#xs-injectables-links-module-MailboxDtoModule-26eb06a027b4c6c14ddecd2ce605f67f"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-MailboxDtoModule-26eb06a027b4c6c14ddecd2ce605f67f"' : 'id="xs-injectables-links-module-MailboxDtoModule-26eb06a027b4c6c14ddecd2ce605f67f"' }>
                                        <li class="link">
                                            <a href="injectables/Mailbox.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Mailbox</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Mailboxes.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Mailboxes</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ModalsModule.html" data-type="entity-link">ModalsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ModalsModule-bd00fdf4d1337b5d8c28f0c03884203b"' : 'data-target="#xs-components-links-module-ModalsModule-bd00fdf4d1337b5d8c28f0c03884203b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ModalsModule-bd00fdf4d1337b5d8c28f0c03884203b"' : 'id="xs-components-links-module-ModalsModule-bd00fdf4d1337b5d8c28f0c03884203b"' }>
                                        <li class="link">
                                            <a href="components/AddAnotherUser.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddAnotherUser</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AddUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddUserComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CreateCannedReplies.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateCannedReplies</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CreateLabel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateLabel</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CreateTicket.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateTicket</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FormErrors.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormErrors</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MergeTickets.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MergeTickets</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NotificationDropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationDropdownComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ModalsRoutingModule.html" data-type="entity-link">ModalsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/MultiSelectModule.html" data-type="entity-link">MultiSelectModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MultiSelectModule-0cac88ed28f69a7f34621a523db14404"' : 'data-target="#xs-components-links-module-MultiSelectModule-0cac88ed28f69a7f34621a523db14404"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MultiSelectModule-0cac88ed28f69a7f34621a523db14404"' : 'id="xs-components-links-module-MultiSelectModule-0cac88ed28f69a7f34621a523db14404"' }>
                                        <li class="link">
                                            <a href="components/MultiSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MultiSelectComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NKDatetimeModule.html" data-type="entity-link">NKDatetimeModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-NKDatetimeModule-3a3ad2678000560e712be0b901182856"' : 'data-target="#xs-components-links-module-NKDatetimeModule-3a3ad2678000560e712be0b901182856"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NKDatetimeModule-3a3ad2678000560e712be0b901182856"' : 'id="xs-components-links-module-NKDatetimeModule-3a3ad2678000560e712be0b901182856"' }>
                                        <li class="link">
                                            <a href="components/NKDatetime.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NKDatetime</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NgArrayPipesModule.html" data-type="entity-link">NgArrayPipesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-NgArrayPipesModule-af38f8f4f04f8bfc55f512a994c82d02"' : 'data-target="#xs-pipes-links-module-NgArrayPipesModule-af38f8f4f04f8bfc55f512a994c82d02"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-NgArrayPipesModule-af38f8f4f04f8bfc55f512a994c82d02"' : 'id="xs-pipes-links-module-NgArrayPipesModule-af38f8f4f04f8bfc55f512a994c82d02"' }>
                                        <li class="link">
                                            <a href="pipes/DiffPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiffPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/EveryPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EveryPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/FilterByImpurePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterByImpurePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/FilterByPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterByPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/FlattenPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FlattenPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/GroupByImpurePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupByImpurePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/GroupByPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupByPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/InitialPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">InitialPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IntersectionPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IntersectionPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/OrderByImpurePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderByImpurePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/OrderByPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderByPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/PluckPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PluckPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/ReversePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReversePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SamplePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SamplePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/ShufflePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShufflePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SomePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SomePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/TailPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TailPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/TrurthifyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrurthifyPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/UnionPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnionPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/UniquePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UniquePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/WithoutPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WithoutPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NgBooleanPipesModule.html" data-type="entity-link">NgBooleanPipesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-NgBooleanPipesModule-9fefb40fabd345852923b468f6c58d47"' : 'data-target="#xs-pipes-links-module-NgBooleanPipesModule-9fefb40fabd345852923b468f6c58d47"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-NgBooleanPipesModule-9fefb40fabd345852923b468f6c58d47"' : 'id="xs-pipes-links-module-NgBooleanPipesModule-9fefb40fabd345852923b468f6c58d47"' }>
                                        <li class="link">
                                            <a href="pipes/IsArrayPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsArrayPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsDefinedPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsDefinedPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsEqualToPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsEqualToPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsFunctionPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsFunctionPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsGreaterEqualThanPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsGreaterEqualThanPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsGreaterThanPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsGreaterThanPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsIdenticalToPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsIdenticalToPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsLessEqualThanPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsLessEqualThanPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsLessThanPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsLessThanPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsNotEqualToPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsNotEqualToPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsNotIdenticalToPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsNotIdenticalToPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsNullPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsNullPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsNumberPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsNumberPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsObjectPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsObjectPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsStringPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsStringPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/IsUndefinedPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsUndefinedPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NgMathPipesModule.html" data-type="entity-link">NgMathPipesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-NgMathPipesModule-6b52a7a95cbdc17f9c66fc985d59a130"' : 'data-target="#xs-pipes-links-module-NgMathPipesModule-6b52a7a95cbdc17f9c66fc985d59a130"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-NgMathPipesModule-6b52a7a95cbdc17f9c66fc985d59a130"' : 'id="xs-pipes-links-module-NgMathPipesModule-6b52a7a95cbdc17f9c66fc985d59a130"' }>
                                        <li class="link">
                                            <a href="pipes/BytesPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BytesPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/CeilPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CeilPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/DegreesPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DegreesPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/FloorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FloorPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/MaxPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MaxPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/MinPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MinPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/PercentagePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PercentagePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/PowerPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PowerPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/RadiansPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RadiansPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/RoundPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RoundPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SqrtPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SqrtPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SumPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SumPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NgObjectPipesModule.html" data-type="entity-link">NgObjectPipesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-NgObjectPipesModule-85a62b7e559810b0baa438578befb94e"' : 'data-target="#xs-pipes-links-module-NgObjectPipesModule-85a62b7e559810b0baa438578befb94e"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-NgObjectPipesModule-85a62b7e559810b0baa438578befb94e"' : 'id="xs-pipes-links-module-NgObjectPipesModule-85a62b7e559810b0baa438578befb94e"' }>
                                        <li class="link">
                                            <a href="pipes/DiffObjPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiffObjPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/InvertByPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvertByPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/InvertPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvertPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/KeysPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">KeysPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/OmitPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OmitPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/PairsPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PairsPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/PickPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PickPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/ValuesPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ValuesPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NgStringPipesModule.html" data-type="entity-link">NgStringPipesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-NgStringPipesModule-5d1d2f0e4d743fa64e5b8edc81971f7a"' : 'data-target="#xs-pipes-links-module-NgStringPipesModule-5d1d2f0e4d743fa64e5b8edc81971f7a"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-NgStringPipesModule-5d1d2f0e4d743fa64e5b8edc81971f7a"' : 'id="xs-pipes-links-module-NgStringPipesModule-5d1d2f0e4d743fa64e5b8edc81971f7a"' }>
                                        <li class="link">
                                            <a href="pipes/CamelizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CamelizePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/CapitalizeFirstPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CapitalizeFirstPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/LatinisePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LatinisePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/LeftPadPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeftPadPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/LinesPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LinesPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/MatchPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatchPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/RepeatPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RepeatPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/RightPadPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RightPadPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/ScanPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScanPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/ShortenPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShortenPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SlugifyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SlugifyPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/StripTagsPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">StripTagsPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/TestPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/TrimPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrimPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/UcFirstPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UcFirstPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/UnderscorePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnderscorePipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NotificationModule.html" data-type="entity-link">NotificationModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-NotificationModule-f96f452cb93a135916d9576119a10e84"' : 'data-target="#xs-injectables-links-module-NotificationModule-f96f452cb93a135916d9576119a10e84"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-NotificationModule-f96f452cb93a135916d9576119a10e84"' : 'id="xs-injectables-links-module-NotificationModule-f96f452cb93a135916d9576119a10e84"' }>
                                        <li class="link">
                                            <a href="injectables/Notification.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Notification</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PaginationModule.html" data-type="entity-link">PaginationModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PaginationModule-66bb6c31215a66fc20eb4a913db4ba2b"' : 'data-target="#xs-components-links-module-PaginationModule-66bb6c31215a66fc20eb4a913db4ba2b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PaginationModule-66bb6c31215a66fc20eb4a913db4ba2b"' : 'id="xs-components-links-module-PaginationModule-66bb6c31215a66fc20eb4a913db4ba2b"' }>
                                        <li class="link">
                                            <a href="components/PaginationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaginationComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SearchTicketsModule.html" data-type="entity-link">SearchTicketsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SearchTicketsModule-e9269aa51655171fbb0f36119d21285a"' : 'data-target="#xs-components-links-module-SearchTicketsModule-e9269aa51655171fbb0f36119d21285a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SearchTicketsModule-e9269aa51655171fbb0f36119d21285a"' : 'id="xs-components-links-module-SearchTicketsModule-e9269aa51655171fbb0f36119d21285a"' }>
                                        <li class="link">
                                            <a href="components/SearchTickets.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchTickets</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SidebarModule.html" data-type="entity-link">SidebarModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SidebarModule-d89a97b79750e49ff8e9735c006863a8"' : 'data-target="#xs-components-links-module-SidebarModule-d89a97b79750e49ff8e9735c006863a8"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SidebarModule-d89a97b79750e49ff8e9735c006863a8"' : 'id="xs-components-links-module-SidebarModule-d89a97b79750e49ff8e9735c006863a8"' }>
                                        <li class="link">
                                            <a href="components/Sidebar.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">Sidebar</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SidebarSettings.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarSettings</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SidebarRoutingModule.html" data-type="entity-link">SidebarRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/StatusDtoModule.html" data-type="entity-link">StatusDtoModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-StatusDtoModule-83eb1d7ba613d4daaecfade0ea7f443d"' : 'data-target="#xs-injectables-links-module-StatusDtoModule-83eb1d7ba613d4daaecfade0ea7f443d"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-StatusDtoModule-83eb1d7ba613d4daaecfade0ea7f443d"' : 'id="xs-injectables-links-module-StatusDtoModule-83eb1d7ba613d4daaecfade0ea7f443d"' }>
                                        <li class="link">
                                            <a href="injectables/Status.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Status</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StatusActive.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>StatusActive</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TicketDtoModule.html" data-type="entity-link">TicketDtoModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-TicketDtoModule-4c9942ac99331646491b060f8ef6c796"' : 'data-target="#xs-injectables-links-module-TicketDtoModule-4c9942ac99331646491b060f8ef6c796"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-TicketDtoModule-4c9942ac99331646491b060f8ef6c796"' : 'id="xs-injectables-links-module-TicketDtoModule-4c9942ac99331646491b060f8ef6c796"' }>
                                        <li class="link">
                                            <a href="injectables/AssignedUser.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AssignedUser</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomerTickets.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CustomerTickets</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IndividualHistory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>IndividualHistory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Ticket.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Ticket</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TicketTimeline.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TicketTimeline</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Tickets.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>Tickets</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TicketsHistory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TicketsHistory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TicketsNotification.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TicketsNotification</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ToastContainerModule.html" data-type="entity-link">ToastContainerModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-ToastContainerModule-38ff2d092d56c6dbeb7c0f9cbfdbc38d"' : 'data-target="#xs-directives-links-module-ToastContainerModule-38ff2d092d56c6dbeb7c0f9cbfdbc38d"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-ToastContainerModule-38ff2d092d56c6dbeb7c0f9cbfdbc38d"' : 'id="xs-directives-links-module-ToastContainerModule-38ff2d092d56c6dbeb7c0f9cbfdbc38d"' }>
                                        <li class="link">
                                            <a href="directives/ToastContainerDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToastContainerDirective</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ToastrModule.html" data-type="entity-link">ToastrModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ToastrModule-a4b7835b24a30fd53cb97ad60a0ad601"' : 'data-target="#xs-components-links-module-ToastrModule-a4b7835b24a30fd53cb97ad60a0ad601"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ToastrModule-a4b7835b24a30fd53cb97ad60a0ad601"' : 'id="xs-components-links-module-ToastrModule-a4b7835b24a30fd53cb97ad60a0ad601"' }>
                                        <li class="link">
                                            <a href="components/Toast.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">Toast</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UserDtoModule.html" data-type="entity-link">UserDtoModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-UserDtoModule-af06c1df9dd93964b28a2968802269ee"' : 'data-target="#xs-injectables-links-module-UserDtoModule-af06c1df9dd93964b28a2968802269ee"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-UserDtoModule-af06c1df9dd93964b28a2968802269ee"' : 'id="xs-injectables-links-module-UserDtoModule-af06c1df9dd93964b28a2968802269ee"' }>
                                        <li class="link">
                                            <a href="injectables/ActiveUsers.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ActiveUsers</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AllUsers.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AllUsers</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AlternativeUser.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AlternativeUser</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/User.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>User</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#components-links"' : 'data-target="#xs-components-links"' }>
                        <span class="icon ion-md-cog"></span>
                        <span>Components</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/Modals.html" data-type="entity-link">Modals</a>
                            </li>
                            <li class="link">
                                <a href="components/SomeComponent.html" data-type="entity-link">SomeComponent</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/BasePortalHost.html" data-type="entity-link">BasePortalHost</a>
                    </li>
                    <li class="link">
                        <a href="classes/CannedRepliesInterface.html" data-type="entity-link">CannedRepliesInterface</a>
                    </li>
                    <li class="link">
                        <a href="classes/CannedRepliesModel.html" data-type="entity-link">CannedRepliesModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/CompanyModel.html" data-type="entity-link">CompanyModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/ComponentPortal.html" data-type="entity-link">ComponentPortal</a>
                    </li>
                    <li class="link">
                        <a href="classes/CookieOptions.html" data-type="entity-link">CookieOptions</a>
                    </li>
                    <li class="link">
                        <a href="classes/CrossdomainLocalstorage.html" data-type="entity-link">CrossdomainLocalstorage</a>
                    </li>
                    <li class="link">
                        <a href="classes/DomPortalHost.html" data-type="entity-link">DomPortalHost</a>
                    </li>
                    <li class="link">
                        <a href="classes/DtoCategoryModel.html" data-type="entity-link">DtoCategoryModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/DtoMailboxModel.html" data-type="entity-link">DtoMailboxModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/Encryption.html" data-type="entity-link">Encryption</a>
                    </li>
                    <li class="link">
                        <a href="classes/GlobalVariables.html" data-type="entity-link">GlobalVariables</a>
                    </li>
                    <li class="link">
                        <a href="classes/Gulpfile.html" data-type="entity-link">Gulpfile</a>
                    </li>
                    <li class="link">
                        <a href="classes/InitJsScriptsService.html" data-type="entity-link">InitJsScriptsService</a>
                    </li>
                    <li class="link">
                        <a href="classes/LabelModel.html" data-type="entity-link">LabelModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/MergedTicketModule.html" data-type="entity-link">MergedTicketModule</a>
                    </li>
                    <li class="link">
                        <a href="classes/NewTicketDraftModule.html" data-type="entity-link">NewTicketDraftModule</a>
                    </li>
                    <li class="link">
                        <a href="classes/NotificationJson.html" data-type="entity-link">NotificationJson</a>
                    </li>
                    <li class="link">
                        <a href="classes/NotificationModel.html" data-type="entity-link">NotificationModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/OverlayContainer.html" data-type="entity-link">OverlayContainer</a>
                    </li>
                    <li class="link">
                        <a href="classes/OverlayRef.html" data-type="entity-link">OverlayRef</a>
                    </li>
                    <li class="link">
                        <a href="classes/Sentry.html" data-type="entity-link">Sentry</a>
                    </li>
                    <li class="link">
                        <a href="classes/State.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="classes/StatusActiveModel.html" data-type="entity-link">StatusActiveModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/StatusModel.html" data-type="entity-link">StatusModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/TextEditor.html" data-type="entity-link">TextEditor</a>
                    </li>
                    <li class="link">
                        <a href="classes/TicketCommentModule.html" data-type="entity-link">TicketCommentModule</a>
                    </li>
                    <li class="link">
                        <a href="classes/TicketDraftModule.html" data-type="entity-link">TicketDraftModule</a>
                    </li>
                    <li class="link">
                        <a href="classes/TicketHistory.html" data-type="entity-link">TicketHistory</a>
                    </li>
                    <li class="link">
                        <a href="classes/TicketLabel.html" data-type="entity-link">TicketLabel</a>
                    </li>
                    <li class="link">
                        <a href="classes/TicketModule.html" data-type="entity-link">TicketModule</a>
                    </li>
                    <li class="link">
                        <a href="classes/TicketNoteModule.html" data-type="entity-link">TicketNoteModule</a>
                    </li>
                    <li class="link">
                        <a href="classes/TicketsNotificationModule.html" data-type="entity-link">TicketsNotificationModule</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToastConfig.html" data-type="entity-link">ToastConfig</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToastData.html" data-type="entity-link">ToastData</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToastInjector.html" data-type="entity-link">ToastInjector</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToastRef.html" data-type="entity-link">ToastRef</a>
                    </li>
                    <li class="link">
                        <a href="classes/UserModel.html" data-type="entity-link">UserModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/UserStepModel.html" data-type="entity-link">UserStepModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/UsersJson.html" data-type="entity-link">UsersJson</a>
                    </li>
                    <li class="link">
                        <a href="classes/_.html" data-type="entity-link">_</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/ActiveUsers.html" data-type="entity-link">ActiveUsers</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AllUsers.html" data-type="entity-link">AllUsers</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AlternativeUser.html" data-type="entity-link">AlternativeUser</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AssignedUser.html" data-type="entity-link">AssignedUser</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Company.html" data-type="entity-link">Company</a>
                            </li>
                            <li class="link">
                                <a href="injectables/GlobalServices.html" data-type="entity-link">GlobalServices</a>
                            </li>
                            <li class="link">
                                <a href="injectables/IndividualHistory.html" data-type="entity-link">IndividualHistory</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Label.html" data-type="entity-link">Label</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Mailbox.html" data-type="entity-link">Mailbox</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Mailboxes.html" data-type="entity-link">Mailboxes</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MergedTicket.html" data-type="entity-link">MergedTicket</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Notification.html" data-type="entity-link">Notification</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Overlay.html" data-type="entity-link">Overlay</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PaginationConfig.html" data-type="entity-link">PaginationConfig</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ReCaptchaService.html" data-type="entity-link">ReCaptchaService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Status.html" data-type="entity-link">Status</a>
                            </li>
                            <li class="link">
                                <a href="injectables/StatusActive.html" data-type="entity-link">StatusActive</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Ticket.html" data-type="entity-link">Ticket</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TicketTimeline.html" data-type="entity-link">TicketTimeline</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Tickets.html" data-type="entity-link">Tickets</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TicketsHistory.html" data-type="entity-link">TicketsHistory</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TicketsNotification.html" data-type="entity-link">TicketsNotification</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ToastrConfig.html" data-type="entity-link">ToastrConfig</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ToastrIconClasses.html" data-type="entity-link">ToastrIconClasses</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ToastrService.html" data-type="entity-link">ToastrService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/User.html" data-type="entity-link">User</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
                <li class="link">
                    <a href="guards/SecondaryAuthGuard.html" data-type="entity-link">SecondaryAuthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/ActiveToast.html" data-type="entity-link">ActiveToast</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Arguments.html" data-type="entity-link">Arguments</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CategoryDtoInterface.html" data-type="entity-link">CategoryDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CompanyInterface.html" data-type="entity-link">CompanyInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ComponentType.html" data-type="entity-link">ComponentType</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CookieInterface.html" data-type="entity-link">CookieInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CookieOptionsArgs.html" data-type="entity-link">CookieOptionsArgs</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ITimepickerEvent.html" data-type="entity-link">ITimepickerEvent</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/LabelDtoInterface.html" data-type="entity-link">LabelDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/LabelsInterface.html" data-type="entity-link">LabelsInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MailBoxInterface.html" data-type="entity-link">MailBoxInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MailboxDtoInterface.html" data-type="entity-link">MailboxDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MainInterface.html" data-type="entity-link">MainInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MergedTicketDtoInterface.html" data-type="entity-link">MergedTicketDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MergedTicketFirstDtoInterface.html" data-type="entity-link">MergedTicketFirstDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/NotificationDtoInterface.html" data-type="entity-link">NotificationDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PageChangedEvent.html" data-type="entity-link">PageChangedEvent</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/StateParams.html" data-type="entity-link">StateParams</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/StatusActiveDtoInterface.html" data-type="entity-link">StatusActiveDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/StatusDtoInterface.html" data-type="entity-link">StatusDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TicketCommentDtoInterface.html" data-type="entity-link">TicketCommentDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TicketDraftDtoInterface.html" data-type="entity-link">TicketDraftDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TicketDtoInterface.html" data-type="entity-link">TicketDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TicketHistoryDtoInterface.html" data-type="entity-link">TicketHistoryDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TicketLabelDtoInterface.html" data-type="entity-link">TicketLabelDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TicketNoteDtoInterface.html" data-type="entity-link">TicketNoteDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TicketsInterface.html" data-type="entity-link">TicketsInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UserDtoInterface.html" data-type="entity-link">UserDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UserExpandedDtoInterface.html" data-type="entity-link">UserExpandedDtoInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UserStepModelinterface.html" data-type="entity-link">UserStepModelinterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UserStepModelinterface-1.html" data-type="entity-link">UserStepModelinterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UsersInterface.html" data-type="entity-link">UsersInterface</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#pipes-links"' : 'data-target="#xs-pipes-links"' }>
                        <span class="icon ion-md-add"></span>
                        <span>Pipes</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                            <li class="link">
                                <a href="pipes/CreateDomElement.html" data-type="entity-link">CreateDomElement</a>
                            </li>
                            <li class="link">
                                <a href="pipes/LeftTrimPipe.html" data-type="entity-link">LeftTrimPipe</a>
                            </li>
                            <li class="link">
                                <a href="pipes/RightTrimPipe.html" data-type="entity-link">RightTrimPipe</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise-inverted.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
