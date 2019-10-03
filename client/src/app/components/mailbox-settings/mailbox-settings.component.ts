import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {GlobalVariables} from '../../services/extra/global.variables';
import {UsersModel} from '../../models/components/users.model';
import {MailBoxService} from '../../services/components/mailbox.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GlobalServices as GS} from '../../services/helpers/global.service';
import {Title} from '@angular/platform-browser';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {UsersService} from '../../services/components/users.service';
import {TextEditor} from '../../modules/editor';
import {NotificationsService} from '../../services/components/notifications.service';
import {ToastrService} from '../../modules/toastr/toastr/toastr-service';
import {Mailbox} from '../../modules/dto/mailbox';

declare let $: any;

@Component({
    templateUrl: '../../html/mailbox-settings/mailbox-settings.component.html',
})

export class MailboxSettingsComponent implements OnInit, OnDestroy, AfterViewInit {
    public cloud: any = showed;
    public textEditor: TextEditor;
    public copyBtnText: any = {dnsForward: 'Copy', dnsName: 'Copy', dnsValue: 'Copy'};
    public usersFiltered: Array<any> = [];
    public showView: boolean = !!0;
    public previousRoute: string;
    public previousTitle: string;
    public routeSubscribe: any;
    public checkForwarding: any;
    public mailboxdata: any;
    public mailboxId: number;
    public succesForForward: boolean = !!0;
    public succesTrue: boolean = !!0;
    public allMailboxes: Array<any> = [];
    public allAgents: Array<any> = [];
    public allNotLoggedAgents: Array<any> = [];
    public changeOpacity: boolean = !!1;

    public imgUrl: string = GlobalVariables.BACKEND_DOMAIN;

    public changeCheck: any = {
        check: 0,
        uncheck: 1,
    };

    public userParams: any = {
        active: 'active',
    };

    public openCurrentSection: any = {
        section: 'ticketing',
        active: 'mailboxes',
    };

    public selectMenu: any = {
        mailboxesDrop: !!0 as boolean,
        hourSettings: !!0 as boolean,
        showLoading: !!0 as boolean,
        showData: !!1 as boolean,
    };

    public autoReplyValidation: any = {
        auto_reply: '',
        auto_reply_subject: '',
        auto_reply_body: '',
    };

    public activeTabe: any = {
        mailbox: !!1 as boolean,
        connection: !!0 as boolean,
        auto: !!0 as boolean,
        agents: !!0 as boolean,
    };

    public closeTabeData: Array<string> = [
        'mailbox',
        'connection',
        'auto',
        'agents',
    ];

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public changeComponent: boolean = !1;

    constructor(private usersModel: UsersModel,
                public mailboxService: MailBoxService,
                private mailboxModel: MailBoxModel,
                private route: ActivatedRoute,
                private router: Router,
                private notificationsService: NotificationsService,
                private userservice: UsersService,
                private toastr: ToastrService,
                private title: Title) {
        this.selectMenu.showLoading = !!1;

        this.textEditor = new TextEditor(usersModel.getToken(), null, '', null, !!1);
        this.beforeOnInit();
        this.subscript();
    }

    public ngOnInit(): void {
        this.getAgentsById();
        this.getMailbox();
        this.textEditor.initEditorConfigs();
        this.changeComponent = !0;
        this.getAllMailboxes();
    }
    public subscript(): void {
        this.checkForwarding = this.notificationsService.checkForwarding.subscribe((id: number): void => {
            if (id === this.mailboxId) {
                this.mailboxService.mailbox.forwarding_verified = '1';
            }
        });
        this.routeSubscribe = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                if (this.mailboxId !== (this.route.params as any).value.id) {
                    if (this.activeTabe.agents) {
                        this.selectMenu.showLoading = !!1;
                        this.selectMenu.showData = !!0;
                    }

                    this.mailboxId = (this.route.params as any).value.id;
                    this.beforeOnInit();
                    this.ngOnInit();
                    this.succesTrue = !!0;
                }
            }
        });
    }
    public ngOnDestroy(): void {
        this.routeSubscribe.unsubscribe();
        this.checkForwarding.unsubscribe();

    }

    public ngAfterViewInit() {}

    public openTab(tabname: any) {
        const self = this;

        this.closeTabeData.forEach((name: string): void => {
            self.activeTabe[name] = '';
        });
        this.activeTabe[tabname] = !!1;
        this.copyBtnText = {dnsForward: 'Copy', dnsName: 'Copy', dnsValue: 'Copy'};
    }

    private beforeOnInit(): void {
        if (!this.init())
            this.router.navigate([this.previousRoute]);
    }

    public redirectTickets(): void {
        this.router.navigate(['/settings/mailbox']);
    }

    private init(): boolean {
        const routeParams: any = this.route.snapshot.params;
        this.previousRoute = GS.lastRoute.last;

        if (!this.previousRoute)
            this.previousRoute = '/tickets';

        if (routeParams.id) {
            this.mailboxId = routeParams.id;
            this.previousTitle = `Back <- ${this.title.getTitle()}`;
            this.title.setTitle(`Birddesk: Mailbox settings`);

            if (routeParams.type) {
                this.openTab('connection');
            }

            return !!1;
        }
        return !!0;
    }

    public getMailbox(): void {
        this.mailboxService.getMailboxById(this.mailboxId)
            .then((data: any): void => {
                if (data.success) {
                    this.mailboxdata = data.data;
                    this.mailboxService.mailbox.set(data.data);

                    this.succesForForward = !!1;
                    this.succesTrue = !!1;
                    this.showView = !!1;
                    this.selectMenu.showLoading = !!0;

                }
            });
    }

    public getAgentsById(): void {
        this.allNotLoggedAgents = [];
        this.mailboxService.mailboxIdAllAgents(this.mailboxId)
            .then((data: any): void => {
                if (data.success) {
                    this.allAgents = data.data;
                    this.allAgents.forEach((agents: any): void => {
                        if (agents.id !== this.usersModel.getLoggedUserId()) {
                            this.allNotLoggedAgents.push(agents);
                        }
                    });

                    if (this.activeTabe.agents) {
                        this.selectMenu.showLoading = !!0;
                        this.selectMenu.showData = !!1;
                    }
                }
            });
    }

    public getAllMailboxes(): void {
        this.mailboxService.getAllMailboxs()
            .then((data: any): void => {
                if (data.success) {
                    this.mailboxService.mailboxes.set(data.data);
                }
            });
    }

    public openCloseMenu(menuNames: Array<string>, clickOutside?: boolean, callFunction?: string): void {
        menuNames.forEach((name: string): void => {
            if (callFunction) {
                this[callFunction](name, clickOutside);
            } else if (clickOutside) {
                if (this.selectMenu[name])
                    this.selectMenu[name] = !!0;
            } else {
                this.selectMenu[name] = !this.selectMenu[name];
            }
        });
    }

    /**
     * change user access to mailbox
     * @param indivUser
     */
    public changeAssigned(indivUser: any): void {
        const value: number = indivUser.mailboxes ? this.changeCheck.check : this.changeCheck.uncheck;

        this.mailboxService.userMailboxPermissions(indivUser.id, this.mailboxId, value)
            .then((data: any): void => {
                if (data.success) {
                    if (!value) {
                        this.allNotLoggedAgents.forEach((agents: any, idx: number): void => {
                            if (agents.id === indivUser.id) {
                                this.allNotLoggedAgents[idx].mailboxes = null;
                            }
                        });

                        this.toastr.success(`${indivUser.first_name} ${indivUser.last_name} has no longer had access to this mailbox.`, 'Success', this.defaultToastrParams);
                    } else {
                        this.getAgentsById();
                        this.toastr.success(`${indivUser.first_name} ${indivUser.last_name} has already had access to this mailbox.`, 'Success', this.defaultToastrParams);
                    }
                }
            });
    }

    public redirectUserProfilePage(user: any): void {
        if (user.status !== 1) {
            this.router.navigate(['/settings/users-profile', user.id]);
        }
    }
    /**
     * switch between mailboxes
     * @param mailbox_id
     */
    public changeMailbox(mailbox_id: any): void {
        if (this.activeTabe.agents) {
            this.selectMenu.showLoading = !!1;
            this.selectMenu.showData = !!0;
        }

        this.router.navigate(['/mailbox-settings/', mailbox_id]);
        this.mailboxId = mailbox_id;
        this.ngOnInit();
        this.succesTrue = !!0;
    }
}
