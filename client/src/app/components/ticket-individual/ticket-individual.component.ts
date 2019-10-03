import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    HostListener,
    ChangeDetectorRef,
    AfterViewChecked,
} from '@angular/core';
import {TicketsService} from '../../services/components/tickets.service';
import {NotificationsService} from '../../services/components/notifications.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ValidationService} from '../../services/helpers/validation.service';
import {UsersModel} from '../../models/components/users.model';
import {TicketsModel} from '../../models/components/tickets.model';
import {GlobalServices as GS} from '../../services/helpers/global.service';
import {LabelsService} from '../../services/components/labels.service';
import {LabelsModel} from '../../models/components/labels.model';
import {ToastrService} from '../../modules/toastr';
import {CannedrepliesService} from '../../services/components/cannedreplies.service';
import {UsersService} from '../../services/components/users.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {Ticket} from '../../modules/dto/ticket/dto/ticket.dto';
import {InboxDataModel} from '../../models/components/inbox-data.model';
import {TicketsChildsComponent} from '../tickets/tickets-childs.component';
import {MailBoxService} from '../../services/components/mailbox.service';
import {LabelDtoInterface} from '../../modules/dto/label';
import {TicketTimeline} from '../../modules/dto/ticket/dto/ticket-timeline.dto';
import {SocketService} from '../../services/components/socket.service';
import {DraftService} from '../../services/components/draft.service';
import {UserDtoInterface} from '../../modules/dto/user';
import {TicketCommentModule} from '../../modules/dto/ticket';
import { ActionGifService } from '../../services/components/action-git.service';

declare let $: any;

@Component({
    selector: 'ticket-individual',
    templateUrl: '../../html/ticket-individual/ticket-individual.component.html',
})

export class TicketIndividualComponent extends TicketsChildsComponent implements OnInit, OnDestroy, AfterViewChecked {

    public snoozeTimeDate: any;
    public previousRoute: string;
    public currentBody: any = '';
    public showDisabledImages: boolean = !!0;
    public hideImgMsg: boolean = !!0;

    public forwardDataValidation: any = {
        to: '' as any,
        body: '' as any,
    };

    public mergeTicketView: any;

    public closeTabeData: any = [
        'reply',
        'add_note',
        'forward',
    ];

    public snoozeTime: any = {
        fourHour: '1',
        tomorrowMorning: '2',
        tomorrowMidDay: '3',
        twoDays: '4',
        fourDays: '5',
        oneWeek: '6',
    };

    public mailboxId: number = 0;
    public addScroll: boolean = !!0;
    public cloud: any = showed;
    public textEditor: any;
    public ticketId: number;

    public ticketindividual: any = {
        timeline: [],
    };
    public allLabels: Array<any> = [];
    public previousTitle: string;
    public routeSubscribe: any;
    public previousTickets: any = false;
    public everyone: string = 'Anyone';
    public agentId: number = 0;
    public everyoneId: number = 0;

    public activeTabs: any = {
        agentDropdown: !!0,
        ticketStatus: !!0,
        changelabel: !!0,
        selectByTime: !!0,
    };
    public tabsName: string = '';

    public selectMenu: any = {
        ticketStatus: !!0 as boolean,
        status: !!0 as boolean,
        label: !!0 as boolean,
        RHS: !!0 as boolean,
        createTicket: !!0 as boolean,
        createLabel: !!0 as boolean,
        mergeTicket: !!0 as boolean,
        assigneTo: !!0 as boolean,
        checkAllTickets: !!0 as boolean,
        boxSearch: !!0 as boolean,
        agentDropdown: !!0 as boolean,
        selectByTime: !!0 as boolean,
        showCannedRepliesList: !!0 as boolean,
        showCannedRepliesListNote: !!0 as boolean,
        showCannedRepliesListForward: !!0 as boolean,
        changelabelBottom: !!0 as boolean,
        changelabelBottomNote: !!0 as boolean,
        changelabelBottomForward: !!0 as boolean,
        cannedReply: !!0 as boolean,
        changelabel: !!0 as boolean,
        commentAssignTo: !!0 as boolean,
        commentSendingStatus: !!0 as boolean,
        addNoteAssignTo: !!0 as boolean,
        addNoteSendingStatus: !!0 as boolean,
        forwardSendingStatus: !!0 as boolean,
        forwardAssignTo: !!0 as boolean,
        changeMore: !!0 as boolean,
        showLoading: !!0 as boolean,
        showData: !!0 as boolean,
    };

    constructor(public usersService: UsersService,
                public draftService: DraftService,
                public ticketService: TicketsService,
                private route: ActivatedRoute,
                public router: Router,
                private ticketsModel: TicketsModel,
                private inboxDataModel: InboxDataModel,
                public labelsService: LabelsService,
                private title: Title,
                public mailboxService: MailBoxService,
                private validationService: ValidationService,
                private mailBoxModel: MailBoxModel,
                private usersModel: UsersModel,
                public notificationsService: NotificationsService,
                private labelsModel: LabelsModel,
                private cannedrepliesService: CannedrepliesService,
                private toastr: ToastrService,
                private ticket: Ticket,
                public socketService: SocketService,
                private changeDetector: ChangeDetectorRef,
                public actionGifService: ActionGifService,
                ) {
        super(ticketService, usersService, mailboxService, labelsService, router, notificationsService, socketService, actionGifService);

        this.mailboxId = this.mailBoxModel.getMailboxCurrentId();
        this.subscriptions();
        this.beforeOnInit();
        this.changeRouts();
    }

    /**
     * subscribe to current mailbox and active tickets
     */
    public subscriptions(): void {
        this.ticketService.currentMailboxId.subscribe((id: number): void => {
            this.mailboxId = id;
        });

        this.ticketService.currentTicketsStatus.subscribe((status: string): void => {
            this.activeTickets = status;
        });
    }

    /**
     * open another ticket's individual page
     */
    public changeRouts(): void {
        this.routeSubscribe = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                if (this.ticketId !== (this.route.params as any).value.id) {
                    this.draftService.destroyIndividualPage();
                    this.ticketId = (this.route.params as any).value.id;
                    this.ngOnInit();
                }
            }
        });

        const vis = (() => {
            let stateKey: any, eventKey: any;
            const keys: any = {
                hidden: 'visibilitychange',
                webkitHidden: 'webkitvisibilitychange',
                mozHidden: 'mozvisibilitychange',
                msHidden: 'msvisibilitychange',
            };
            for (stateKey in keys) {
                if (stateKey in document) {
                    eventKey = keys[stateKey];
                    break;
                }
            }
            return (c: any) => {
                if (c) document.addEventListener(eventKey, c);
                return !document[stateKey];
            };
        })();

        vis(() => {
            if (vis(null)) {
                if (this.ticketService.ticket.id) {
                    this.socketService.getTicketTemporaryTimeline(this.ticketId, this.usersService.user);
                } else {
                    return false;
                }
            }
        });
    }

    public ngOnInit(): void {
        this.selectMenu.showLoading = !!1;
        this.selectMenu.showData = !!0;
        this.getTicketData();
        this.getAllUsers();
        console.log(this.draftService.mailboxDraftData[1]);
    }

    public ngOnDestroy(): void {
        if (!this.ticketService.individualSubmitted && this.activeTickets !== 'attention') {
            this.draftService.destroyIndividualPage();
            this.ticketService.setIndividual(new Ticket());
        } else {
            this.ticketService.ticket.clear = !!1;
        }

        this.selectedTickets.main = {};
        this.selectedTicketsId = [];
        this.labelsService.inactiveLabel = {
            ids: {},
            selectedTicketsCount: 0,
        };
        this.routeSubscribe.unsubscribe();
        this.ticketService.ticketTimeline = [] as TicketTimeline;
        this.ticketService.ticketTemporaryTimeline = [] as TicketTimeline;
    }

    public getTicketData(): void {
        const offset: number = this.ticketService.ticketTimeline.length ? this.ticketService.ticketTimeline.length + 1 : 0;

        this.ticketService.getTicket(this.ticketId, offset).then((data: any) => {
            if (data.success) {
                data.ticketData.isTrCop = !!0;
                this.ticketService.setIndividual(data.ticketData);
                this.draftService.getIndividualTicketDrafts(this.ticketId, data.ticketData.mailbox_id);
                this.socketService.getTicketTemporaryTimeline(this.ticketId, this.usersService.user);
                this.socketService.getIndivTrCopData(data.ticketData.mailbox_id);
                this.getTicketCustomerTickets(this.ticketService.ticket);
                this.getTicketHistory();
                // if (this.ticketService.ticket.status !== this.mailBoxModel.getCurrentStatus()) {
                //     this.ticketService.currentTicketsStatus.emit(this.ticketService.ticket.status);
                // }
                this.mailboxService.mailboxes.forEach((mailbox: any, res: number) => {
                    if (mailbox.id === data.ticketData.mailbox_id && !mailbox.showed)
                        this.mailboxService.mailboxes[res].showed = !!1;
                });
                this.cannedrepliesService.mailboxId = data.ticketData.mailbox_id;
                this.ticketService.currentMailboxId.emit(data.ticketData.mailbox_id);
                this.labelsService.inactiveLabel = {
                    ids: {},
                    selectedTicketsCount: 1,
                };

                if (this.ticketService.ticket.labels) {
                    this.ticketService.ticket.labels.forEach((label: LabelDtoInterface, index: null): void => {
                        this.labelsService.mergeLabel(label.label_id, 1);
                    });
                }

                this.selectedTicketsId = [this.ticketService.ticket.ticket_id_hash];
                this.selectedTickets.main = [this.ticketService.ticket];
                if (data.ticketData.mailbox_id !== this.mailboxId) {
                    this.mailboxId = data.ticketData.mailbox_id;
                    this.mailBoxModel.insertMailboxId(data.ticketData.mailbox_id);
                }

                if (!this.ticketService.ticket.opened_count) {
                    this.notificationsService.setViewed(this.ticketService.ticket.ticket_id_hash);
                }
                this.socketService.removeNotificationCount();
                this.ticketService.ticketTimeline = data.data;
                this.selectMenu.showLoading = !!0;
                this.selectMenu.showData = !!1;
            } else {
                this.redirectTickets();
            }
        });
    }

    public ngAfterViewChecked(): void {
        this.changeDetector.detectChanges();
    }

    private beforeOnInit(): void {
        if (!this.init())
            this.router.navigate([this.previousRoute]);
    }

    public redirectTickets(): void {
        this.ticketService.ticket = null;
        this.ticketService.tickets.reset();
        this.ticketService.toTicketPage.emit(!!1);
    }

    private init(): boolean {
        const routeParams: any = this.route.snapshot.params;
        this.previousRoute = GS.lastRoute.last;

        if (!this.previousRoute)
            this.previousRoute = '/tickets';

        if (routeParams.id) {
            this.ticketId = routeParams.id;
            this.previousTitle = `Back <- ${this.title.getTitle()}`;
            this.title.setTitle(`Birddesk: Ticket #${routeParams.id}`);

            return !!1;
        }
        return !!0;
    }

    public openCloseMenu(menuNames: Array<string>, clickOutside?: boolean, callFunction?: string): void {
        menuNames.forEach((name: string): void => {
            if (callFunction) {
                this[callFunction](name, clickOutside);
            } else if (clickOutside) {
                if (this.selectMenu[name]) {
                    this.selectMenu[name] = !!0;
                }
            } else {
                this.selectMenu[name] = !this.selectMenu[name];
            }
        });
    }

    /**
     * switch between editors
     * @param tabname
     */
    public openTab(tabname: any , status: boolean): void {
        this.cloud.effect.reply = '';
        this.cloud.effect.add_note = '';
        this.cloud.effect.forward = '';
        if (!status){
            this.cloud.effect[tabname] = tabname;
            this.tabsName  = tabname;
        }
        this.scrollTo();
        // if (this.cloud.effect[tabname]){
        //     this.ticketService.activeTabe[tabname] = '';
        // }else{
        //     this.ticketService.activeTabe = {
        //         reply: '' as any,
        //         add_note: '' as any,
        //         forward: '' as any,
        //     };
        //     this.ticketService.activeTabe[tabname] = 'active';
        //
        // }
        // console.log(this.ticketService.activeTabe)
    }

    public showError() {
        this.toastr.error('Incorrect email address.', 'Error', this.defaultToastrParams);
    }

    /**
     * change ticket status in top panel
     * @param {string} status
     */
    public changeStatus(status: string): void {
        if (this.ticketService.ticket.status !== status) {
            this.changeTicketsStatus(status, this.ticketService.ticket);
            this.ticketService.ticket.status = status;
            this.ticketService.ticket.snooze = null;
        }
        if(status === 'closed') {
            this.actionGifService.actionEvent.emit();
        }
    }

    public addSnoozeForIndividual(time: string): void {
        this.addSnooze(time, this.ticketService.ticket);
        this.ticketService.ticket.snooze = null;
        this.ticketService.ticket.status = 'closed';
    }

    public changeAssigneForIndividual(agentId: number, user?: UserDtoInterface): void {
        this.changeAssigne(agentId, [this.ticketService.ticket.ticket_id_hash], user).then((data: any): void => {
            if (agentId === 0) {
                this.ticketService.ticket.assigned_user = null;
                this.ticketService.changeassignment.emit(null);
            } else {
                this.ticketService.ticket.assigned_user = user;
                this.ticketService.changeassignment.emit(user);
                this.getTicketHistory();
            }
            this.ticketService.ticket.assign_agent_id = agentId;
        });
    }

    public removeSnooze() {
        this.ticketService.removeSnooze([this.ticketService.ticket.ticket_id_hash])
            .then((data: any): void => {
                if (data.success) {
                    this.ticketService.ticket.snooze = null;
                    this.ticketService.ticket.status = 'open';
                    this.changeInbox(1, !!1, (this.ticketService.filterticketsStatus !== 'draft'), this.ticketService.ticket.status);
                    this.socketService.changeCompanyTicketStatus(this.mailboxService.mailboxes, [this.ticketService.ticket], 'open', this.ticketService.filterticketsStatus);
                    this.ticketService.currentTicketsStatus.emit(this.ticketService.ticket.status);
                }
            });
    }

    public deleteTicket(): void {
        if (this.activeTickets === 'attention') {
            this.socketService.deleteTrafficCopByTicketId([this.ticketService.ticket.id], this.mailboxId, !!0);
            this.router.navigate(['tickets'])
                .then((data: boolean): void => {
                    this.changeInbox(1, !!0, !!1);
                    this.ticketService.toTicketPage.emit(!!1);
                });
        } else {
            this.ticketService.deleteTicket([this.ticketService.ticket.ticket_id_hash])
                .then((data: any): void => {
                    if (data.success) {
                        this.ticketService.tickets.forEach((ticket: any, index: number) => {
                            if (ticket.id === this.ticketId)
                                this.ticketService.tickets.splice(index, 1);
                        });

                        this.router.navigate(['tickets'])
                            .then((results: boolean): void => {
                                this.changeInbox(1, !!0, !!1);
                                this.ticketService.toTicketPage.emit(!!1);
                            });
                    }
                });
        }
    }

    public showImages(): void {
        this.showDisabledImages = !!1;
        this.hideImgMsg = !!0;
    }

    public showHideMsg(event: boolean): void {
        this.hideImgMsg = event;
    }
    public scrollRequest: boolean = !!0;
    scrollingTickets(): void {
        function getDocumentHeight() {
            return Math.max(
                document.getElementById('text-editor-black').scrollHeight, document.getElementById('text-editor-black').offsetHeight,
                document.getElementById('text-editor-black').clientHeight, document.getElementById('text-editor-black').scrollHeight, document.getElementById('text-editor-black').offsetHeight,
            );
        }

        function getScrollTop() {
            return document.getElementById('text-editor-black').scrollTop;

        }

        if (this.selectMenu.showData === !!1) {
            if (getScrollTop() >= getDocumentHeight() - window.innerHeight && !this.scrollRequest) {
                const offset: number = this.ticketService.ticketTimeline.length ? this.ticketService.ticketTimeline.length + 1 : 0;
                this.scrollRequest = !!1;
                this.ticketService.getTicket(this.ticketId, offset)
                    .then((data: any) => {
                        this.scrollRequest = !!0;
                        this.ticketService.ticketTimeline = [...(this.ticketService.ticketTimeline), ...(data.data)] as TicketTimeline;
                    });
            }
        }
    }
    public editTrCop(): void {
        this.ticketService.ticket.cop_id =  this.ticketService.ticket.ticketTrCop.cop_id;
        this.ticketService.ticket.ticketDraft =  this.ticketService.ticket.ticketTrCop;
        this.ticketService.ticket.isTrCop = !!0;
        this.socketService.isDraft.emit(!!1);
        this.cloud.effect = 'reply';
        this.socketService.deleteTrafficCopByTicketId([this.ticketService.ticket.id], this.mailboxId, !!1);
    }
    public discardTrCop(): void {
        if (this.ticketService.ticket.isTrCop) {
            this.ticketService.ticket.isTrCop = !!0;
            this.socketService.deleteTrafficCopByTicketId([this.ticketService.ticket.id], this.mailboxId, !!1);
            if (this.mailBoxModel.getCurrentStatus() === 'attention') {
                this.ticketService.currentTicketsStatus.emit(this.ticketService.ticket.status);
            }
        }
    }

    public sendTrCop(): void {
        const commentData: TicketCommentModule = this.ticketService.ticket.ticketTrCop.commentData ;
        // commentData.body = this.ticketService.ticket.ticketTrCop.reply;
        // commentData.assign_agent_id = this.ticketService.ticket.ticketTrCop.a;
        this.ticketService.addComment(commentData)
            .then((data: any): void => {
                if (data.success) {
                    data.data.type = 'comment';
                    data.data.is_forwarded = '0';
                    this.ticketService.ticket.isTrCop = !!0;
                    this.socketService.deleteTrafficCopByTicketId([this.ticketService.ticket.id], this.mailboxId, !!1);
                    this.ticketService.ticket.ticketTrCop = null;
                    this.ticketService.ticketTimeline.unshift(data.data);
        //             this.ticketService.ticket.assigned_user = this.assignmentUser;
                    this.ticketService.ticket.assign_agent_id = commentData.assign_agent_id;
                    if (this.activeTickets !== 'attention'){
                        this.changeInbox(1, !!1, !!1, commentData.status);
                    }
                    this.ticketService.ticket.status = commentData.status;
                    this.socketService.changeTicket(this.ticketService.ticket.id, this.usersService.user.id, this.ticketService.ticket, this.mailBoxModel.getCurrentStatus());
                    this.activeTickets = commentData.status;
                    if (!this.ticketService.ticket.clear) {
                        this.ticketService.currentTicketsStatus.emit(commentData.status);
                    }
                    this.ticketService.ticket.isTrCop = !!0;
                    this.socketService.deleteTrafficCopByTicketId([this.ticketService.ticket.id], this.mailboxId, !!1);
        //             else {
        //                 this.ticketService.setIndividual(new Ticket());
        //             }
        //
        //             if (this.ticketService.ticket.id) {
        //                 // this.checkPreferences();
        //             }
                }
            });
    }
    public scrollTo()
    {

        const element = document.getElementById('text-editor-black');
        if (element.scrollTop){
             const changeScroll = (pos: number): any => {
                 if ( pos - 1 > 0 ){
                    element.scrollTo(0, pos);
                    setTimeout((): void => {
                        changeScroll(pos - 10);
                    }, 5);
                }else{
                    return false;
                }
             };
             changeScroll(element.scrollTop);
             // for ( let i: number = element.scrollTop; i > 0 ; i--){
             //    element.scrollTo(i, 0);
             // }
        }
    }

}
