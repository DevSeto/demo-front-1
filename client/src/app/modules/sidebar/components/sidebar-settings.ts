import {Component, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {DROP_DOWN} from '../../../services/helpers/animations.service';
import {UsersModel} from '../../../models/components/users.model';
import {UsersService} from '../../../services/components/users.service';
import {SidebarModel} from '../../../models/components/sidebar.model';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';
import {CannedReplies} from '../../dto/canned-raply/dto/canned-replies.dto';
import {Mailboxes} from '../../dto/mailbox/dto/mailboxes.dto';
import {DraftService} from '../../../services/components/draft.service';

@Component({
    selector: 'sidebar-settings',
    templateUrl: '../html/sidebar-settings.html',
    animations: [
        DROP_DOWN,
    ],
})

export class SidebarSettings implements OnDestroy {

    public cloud: any = showed;
    public previouslyState: any;
    public routeSubscribe: any;

    public changeColor: any = {
        active: !!1,
        inactive: !!0,
        addUser: !!0,
    };

    public sidebarData: any = {};
    public selected_menu = '';

    public effect(name: string, event?: any) {
        this.setPreviouslyState();
        this.cloud.effect = name;

        if (event) {
            this.cloud.effect[name] ? this.sidebarData[name] = !!1 : this.sidebarData[name] = !!0;
            this.sidebarModel.update(this.sidebarData);
        }
    }

    constructor(private router: Router,
                private userModel: UsersModel,
                public userService: UsersService,
                private sidebarModel: SidebarModel,
                private route: ActivatedRoute,
                private mailboxService: MailBoxService,
                private draftService: DraftService,
                private cannedRepliesService: CannedrepliesService) {
        this.getAllMailboxes();
        this.getCannedReplies();
    }

    public ngOnInit() {
        if (!this.userModel.getLoggedUser()) {
            this.userService.getUserData()
                .then((data: any) => {
                    this.userService.setUser(data.data);
                    this.userModel.insert(data.data);
                });
        }

        this.sidebarData = (this.sidebarModel.select()) ? this.sidebarModel.select() : {};

        Object.keys(this.sidebarData).forEach((sidebar: any): void => {
            if (this.sidebarData[sidebar]) {
                this.effect(sidebar);
            }
        });

        this.setPreviouslyState();
        this.checkPreviouslyState();
        this.changeRouts();
    }

    public ngOnDestroy() {
        this.routeSubscribe.unsubscribe();
    }

    public changeRouts(): void {
        this.routeSubscribe = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                if (event.url === '/settings') {
                    this.selected_menu = '';
                }
                this.checkPreviouslyState(event.url);
            }
        });
    }

    public setPreviouslyState(): void {
        this.previouslyState = {
            'users-profile': {
                verify: !1,
                parent: 'personal',
            },
            'notifications': {
                verify: !1,
                parent: 'personal',
            },
            'preferences': {
                verify: !1,
                parent: 'personal',
            },
            'company-profile': {
                verify: !1,
                parent: 'company',
            },
            'users': {
                verify: !1,
                parent: 'company',
            },
            'mailbox': {
                verify: !1,
                parent: 'ticketing',
            },
            'addMailbox': {
                verify: !1,
                parent: 'ticketing',
            },
            'canned-replies': {
                verify: !1,
                parent: 'ticketing',
            },
        };
    }

    private checkPreviouslyState(url ?: string) {
        const currentRouteState: Array<string> = (url) ? url.split('/').splice(1) : location.pathname.split('/').splice(1);
        let currentClassState: any;

        if (currentRouteState.length > 1) {
            if (this.previouslyState[currentRouteState[1]] || this.previouslyState[currentRouteState[2]]) {

                if (this.previouslyState[currentRouteState[1]] && +currentRouteState[2] === this.userService.user.id) {
                    currentClassState = this.previouslyState[currentRouteState[1]].parent;
                    this.selected_menu = currentRouteState[1];
                    this.cloud.effect.active = !!0;
                    this.previouslyState.users.verify = !!0;
                } else if (this.previouslyState[currentRouteState[1]] && currentRouteState[1] === 'users-profile' && +currentRouteState[2] !== this.userService.user.id) {
                    currentClassState = 'company';
                    this.cloud.effect.active = !!1;
                    this.previouslyState.users.verify = !!1;
                } else {
                    currentClassState = this.previouslyState[currentRouteState[1]].parent;
                    this.selected_menu = currentRouteState[1];

                    if (currentRouteState[1] === 'users') {
                        this.previouslyState.users.verify = !!1;
                        this.cloud.effect.active = !!1;
                    } else {
                        this.previouslyState.users.verify = !!0;
                        this.cloud.effect.active = !!0;
                    }
                }

                if (!this.cloud.effect[currentClassState]) {
                    this.cloud.effect = currentClassState;
                    this.sidebarData[currentClassState] = !!1;
                    this.sidebarModel.update(this.sidebarData);
                }
            } else
                this.selected_menu = '';
        } else {
            this.previouslyState.users.verify = !!0;
            this.cloud.effect.active = !!0;
        }
    }

    public firstinit: boolean = !!0;

    public openUsers(event: string): void {
        if (!this.cloud.effect[event])
            this.cloud.effect = event;

        if (event === 'inactive') {
            this.changeColor.inactive = !!1;
            this.changeColor.active = !!0;
        } else {
            this.changeColor.inactive = !!0;
            this.changeColor.active = !!1;
        }

        this.userService.userParams.active = event;
        this.userService.usersSortingSatatus.emit({status: event});
        this.router.navigate(['/settings/users']);
        this.firstinit = !!1;
    }

    public navigateToProfilePage(userId: number): void {
        this.router.navigateByData({
            url: ['/settings/users-profile/' + userId],
            data: [1],
        });
        const routeParams: any = this.route.snapshot.params;

        if (+routeParams.id !== userId)
            this.router.navigate([`/settings/users-profile/${userId}`]);
    }

    public getCannedReplies(): void {
    //     this.cannedRepliesService.cannedReplies.reset();
    //     this.cannedRepliesService.getCannedRepliesByMailboxId()
    //         .then((data: ResponseData<CannedReplies>) => {
    //             if (data.success)
    //                 this.cannedRepliesService.cannedReplies.set(data.data);
    //         });
    }

    public getAllMailboxes(): void {
        this.mailboxService.getAllMailboxs()
            .then((data: ResponseData<Mailboxes>) => {
                if (data.success)
                    this.mailboxService.mailboxes.set(data.data);
                this.mailboxService.mailboxes.forEach((mailbox: any): void => {
                    this.draftService.getDrafts(mailbox.id);
                });
            });
    }
}
