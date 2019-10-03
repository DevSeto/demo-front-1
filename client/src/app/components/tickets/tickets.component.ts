import {Component, OnInit, AfterViewInit, OnDestroy, HostListener} from '@angular/core';
import {TicketsService} from '../../services/components/tickets.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';
import {GlobalServices} from '../../services/helpers/global.service';
import {UsersService} from '../../services/components/users.service';
import {LabelsService} from '../../services/components/labels.service';
import {ToastrService} from '../../modules/toastr';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {MailBoxService} from '../../services/components/mailbox.service';
import {TicketsChildsComponent} from './tickets-childs.component';
import {NotificationsService} from '../../services/components/notifications.service';
import {SocketService} from '../../services/components/socket.service';
import {DraftService} from '../../services/components/draft.service';
import {HoursDataJson} from '../../jsons/global-data';
import { ActionGifService } from '../../services/components/action-git.service';

@Component({
    selector: 'tickets',
    templateUrl: '../../html/tickets/tickets.component.html',
})

export class TicketsComponent extends TicketsChildsComponent implements OnInit, AfterViewInit, OnDestroy {

    public readonly _maxShowedLabels: number = 10;

    public listType: boolean = !!1;
    public filterBy: string = this.userModel.getSortBy();
    public cloud: any = showed;
    public offset: number = 0;
    public ticketsTotalCount: number;

    public  sortTicket: HoursDataJson =  new HoursDataJson();

    public filterAttributes: Array<any> = [
        'new_updated',
        'old_updated',
        'new_created',
        'old_created',
    ];

    public userId: any = null;
    public addScroll: boolean = !!0;
    public showHideMessage: boolean = !!0;
    public defoultTrue: boolean = !!0;
    public forBlure: boolean = !!0;

    constructor(public title: Title,
                public route: ActivatedRoute,
                public  router: Router,
                public  userService: UsersService,
                public  labelsService: LabelsService,
                public mailBoxModel: MailBoxModel,
                public  mailboxService: MailBoxService,
                public userModel: UsersModel,
                public toastr: ToastrService,
                public  ticketService: TicketsService,
                public  draftService: DraftService,
                public  socketService: SocketService,
                public  notificationsService: NotificationsService,
                public actionGifService: ActionGifService) {
        super(ticketService, userService, mailboxService, labelsService, router, notificationsService, socketService, actionGifService);
        this.listType = this.userModel.getTicketView();
        this.activeTickets = this.ticketService.filterticketsStatus;
        this.defoultTrue = this.router.getNavigatedData();

        if (this.userModel.getCookiAfterReg()) {
            this.forBlure = !!1;
        }

        this.userId = userModel.getLoggedUserId();
        this.mailboxId = mailBoxModel.getMailboxCurrentId();
        if (!this.mailboxId) {
            this.mailboxService.getAllMailboxs().then((data: any) => {
                if (data.success) {
                    this.mailboxId = data.data[0].id;
                    this.mailBoxModel.insertMailboxId(data.data[0].id);
                    this.mailboxService.mailboxes.set(data.data);
                }
            });
        }
        this.subscriptions();
        this.ticketService.onDestroyTicket = !!0;
    }

    private ngUnsubscribe: any = {
        currentMailboxIdSub: null,
        currentTicketsStatusSub: null,
        addTicket: null,
        goBack: null,
        searchTicketsByLabelSub: null,
    };

    public subscriptions(): void {
        if (!this.ngUnsubscribe.currentMailboxIdSub) {
            this.ngUnsubscribe.currentMailboxIdSub = this.ticketService.currentMailboxId.subscribe((id: number): void => {
                this.getAllUsers();
                this.mailboxId = id;
            });
        }

        if (!this.ngUnsubscribe.currentTicketsStatusSub) {
            this.ngUnsubscribe.currentTicketsStatusSub = this.ticketService.currentTicketsStatus.subscribe((status: string): void => {

                this.sortTicketsByStatus(status);
                this.changedMailboxId(this.mailboxId);
            });
        }

        if (!this.ngUnsubscribe.goBack) {
            this.ngUnsubscribe.goBack = this.ticketService.goBack.subscribe((status: boolean): void => {
                this.selectMenu.showLoading = !!1;
                this.sortTicketsByStatus(this.ticketService.filterticketsStatus);
                this.changedMailboxId(this.mailboxId);
            });
        }
        if (!this.ngUnsubscribe.addTicket) {
            this.ngUnsubscribe.addTicket = this.ticketService.addTicket.subscribe((status: boolean): void => {
                if (status){
                    this.ticketsTotalCount++;
                }
            });
        }

        if (!this.ngUnsubscribe.searchTicketsByLabelSub) {
            this.ngUnsubscribe.searchTicketsByLabelSub = this.ticketService.searchTicketsByLabel.subscribe((label: any): void =>
                this.searchTicket(label));
        }
    }

    public ngOnDestroy() {
        (Object as any).values(this.ngUnsubscribe).forEach((val: any, index: number): void => {
            if (val) {
                val.unsubscribe();
                this.ngUnsubscribe[index] = null;
            }
        });

        document.body.style.overflowY = 'auto';
        this.ticketService.onDestroyTicket = !!1;
    }

    public ngOnInit(): void {
        this.title.setTitle('Birddesk: Tickets');
        GlobalServices.lastRoute = {
            last: '/tickets',
        };
        this.getAllUsers();
        // this.getAllHistory();
    }

    public ngAfterViewInit(): void {
        // document.body.style.overflowY = 'hidden';
        // (document as any).querySelector('div.list-scroll').style.maxHeight = (window.innerHeight - 110) + 'px';
    }
    // public selectTicket(checked: boolean, ticket: any, index: any): void {
    //     console.log("asdasdads2222")
    //     super.selectTicket(checked, ticket, index);
    //     // this.selectedTickets =\
    //     console.log(this.selectedTickets.main.length)
    // }
    //     //
    // @HostListener('window:resize', ['$event'])
    // public onResize(event: any) {
    //     let totalTicketCount: number = 0;
    //     this.mailboxService.mailboxes.forEach((val: any, index: number): void => {
    //         if (val.id === this.mailboxId) {
    //             totalTicketCount = val[this.activeTickets + '_tickets_count'];
    //         }
    //     });
    //
    //     (document as any).querySelector('div.list-scroll').style.maxHeight = (window.innerHeight - 110) + 'px';
    //
    //     if (this.ticketService.tickets.length < totalTicketCount && (this.ticketService.tickets.length * 65) < (window.innerHeight - 110)) {
    //         this.offset = this.ticketService.tickets.length ? this.ticketService.tickets.length : 0;
    //
    //         this.ticketService.getTickets(this.mailboxId, this.activeTickets, '', this.filterBy, this.offset)
    //             .then((secondData: any): void => {
    //                 if (secondData.success) {
    //                     this.ticketService.tickets.set([...(this.ticketService.tickets), ...(secondData.data)]);
    //                 }
    //             });
    //     }
    // }

    public sortTicketsByStatus(options: any, keepChecked?: boolean): void {
        this.activeTickets = options;
    }

    public showSuccess() {
        this.toastr.success('Label has been successfully added.', 'Success', this.defaultToastrParams);
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

    public redirectToTicketPage(event: any, id: number, ticket?: any): void {
        this.socketService.currentTrCopId = ticket.cop_id;

        (() => {
            if (!Element.prototype.closest) {
                Element.prototype.closest = function(elem: any) {
                    let node = this;

                    while (node) {
                        if (node.matches(elem))
                            return node;
                        else
                            node = node.parentElement;
                    }
                    return null;
                };
            }
        })();

        const clickablePlace: boolean = !!(event.target.closest('.tickets-grid__item-checkbox'));
        const recentClick: boolean = !!(event.target.closest('.tickets-row__item-checkbox'));
        const fileContent: boolean = !!(event.target.closest('i.fileContent'));

        if (!recentClick && !fileContent && !clickablePlace) {
            // if (ticket && ticket.opened_count === 0 && this.activeTickets !== 'draft')
            // this.notificationsService.setViewed(id);

            if (this.activeTickets === 'draft') {
                if (!ticket.id) {
                    this.ticketService.createTicektDraft = ticket;
                    this.cloud.effect = 'createTicket';
                    setTimeout(() => {
                        this.draftService.newDraftId.emit(ticket.draft_id);
                    }, 200);
                } else {
                    this.router.navigate(['/ticket', ticket.id]);
                }
            } else {
                this.router.navigate(['/ticket', id]);
            }
        }
    }

    /**
     * change ticket data by mailbox id
     * @param {number} id
     */

    public  changedMailboxId(id: number, click ?: boolean) {
        if (this.activeTickets === 'draft')
            this.draftService.getDrafts(id);
        else
            this.socketService.getTrCopData(id);

        this.selectMenu.showLoading = !!1;
        this.selectMenu.showData = !!0;
        this.ticketService.tickets.reset();
        this.showHideMessage = !!0;

        if (id !== this.mailboxId) {

            this.mailBoxModel.insertMailboxId(id);
            this.mailboxId = id;
        }

        if (this.activeTickets !== 'draft' && this.activeTickets !== 'attention') {

            this.ticketService.getTickets(id, this.activeTickets, '', this.filterBy, this.offset)
                .then((data: any): void => {
                    this.ticketService.tickets.reset();
                    if (this.mailboxService.mailboxIndex && this.mailboxService.mailboxes[this.mailboxService.mailboxIndex]) {
                        this.mailboxService.mailboxes[this.mailboxService.mailboxIndex][this.activeTickets + '_tickets_count'] = data.total;
                    }

                    this.ticketsTotalCount = data.total;
                    this.ticketService.tickets.set(data.data);
                    this.offset = 0;

                    let notViewedTickets: number = 0;
                    this.ticketService.tickets.forEach((ticket: any) => {
                        if (!(+ticket.opened_count))
                            notViewedTickets++;
                    });
                    if (notViewedTickets)
                        this.title.setTitle(`(${notViewedTickets}) Birddesk: Tickets`);
                    else
                        this.title.setTitle('Birddesk: Tickets');

                    this.selectMenu.showLoading = !!0;
                    this.selectMenu.showData = !!1;
                    this.getSelectedTickets();
                });
        } else {
            setTimeout((): void => {
                this.selectMenu.showLoading = !!0;
                this.selectMenu.showData = !!1;
            }, 600);
        }
    }
    //
    public deleteTickets(): void {
        let allTicketLength: number = this.ticketService.tickets.length;
        this.selectedTicketsId = [];
        const selectedIds: Array<number> = [];

        if (this.activeTickets === 'draft') {
            this.selectedTickets.main.forEach((ticket: any): void => {
                if (ticket) {
                    this.selectedTicketsId.push(ticket.ticket_id_hash);
                    selectedIds.push(ticket.draft_id);
                }
            });
            this.draftService.deleteDraftTicket(selectedIds, this.mailboxId);

            while (allTicketLength--) {
                if (this.ticketService.tickets[allTicketLength] && this.ticketService.tickets[allTicketLength].draft_id && (selectedIds as any).includes(this.ticketService.tickets[allTicketLength].draft_id)) {
                    this.ticketService.tickets.splice(allTicketLength, 1);
                }
            }
            this.changeInbox(this.selectedTicketsId.length, !!0, !!1);

            this.selectMenu.changeMore = !!0;
            this.selectedTickets.main = [];
            this.selectedTicketsId = [];
        } else if (this.activeTickets === 'attention') {
            this.selectedTickets.main.forEach((ticket: any): void => {
                if (ticket){
                    this.selectedTicketsId.push(ticket.ticket_id_hash);
                    selectedIds.push(ticket.cop_id);
                }
            });
            this.socketService.deleteTrafficCopByTicketId(selectedIds, this.mailboxId, !!0);

            while (allTicketLength--) {
                if (this.ticketService.tickets[allTicketLength] && this.ticketService.tickets[allTicketLength].cop_id && (selectedIds as any).includes(this.ticketService.tickets[allTicketLength].cop_id)) {
                    this.ticketService.tickets.splice(allTicketLength, 1);
                }
            }
            this.changeInbox(this.selectedTicketsId.length, !!0, !!1);

            this.selectMenu.changeMore = !!0;
            this.selectedTickets.main = [];
            this.selectedTicketsId = [];
        } else {
            this.selectedTickets.main.forEach((ticket: any): void => {
                if (ticket) {
                    this.selectedTicketsId.push(ticket.ticket_id_hash);
                    selectedIds.push(ticket.id);

                }
            });
            this.ticketService.deleteTicket(this.selectedTicketsId)
                .then((data: any): void => {
                    if (data.success) {
                        while (allTicketLength--) {
                            if (this.ticketService.tickets[allTicketLength] && this.ticketService.tickets[allTicketLength].id && (selectedIds as any).includes(this.ticketService.tickets[allTicketLength].id)) {
                                this.ticketService.tickets.splice(allTicketLength, 1);
                            }
                        }
                        this.changeInbox(this.selectedTicketsId.length, !!0, !!1);
                        //
                        // if (this.selectedTicketsId.length < this.ticketsTotalCount && (this.ticketService.tickets.length * 65) < (window.innerHeight - 110)) {
                        //     this.offset = this.ticketService.tickets.length ? this.ticketService.tickets.length : 0;
                        //
                        //     this.ticketService.getTickets(this.mailboxId, this.activeTickets, '', this.filterBy, this.offset)
                        //         .then((ticketsData: any): void => {
                        //             if (ticketsData.success){
                        //                 this.ticketService.tickets.set(ticketsData.data);
                        //             }
                        //         });
                        // }

                        this.selectMenu.changeMore = !!0;
                        this.selectedTickets.main = [];
                        this.selectedTicketsId = [];
                    }
                });
        }
        this.cloud.effect = 'confirmTicketsDelete';
    }

    /**
     * search ticket by label id
     * @param event
     */

    public searchTicket(event: any): void {
        this.ticketService.tickets.reset();

        this.ticketService.getTickets(this.mailboxId, '', event.id, '', 0)
            .then((data: any): void => {
                this.ticketService.tickets.set(data.data);
                this.ticketService.tickets.reverse();
                this.selectMenu.showLoading = !!0;
                this.selectMenu.showData = !!1;
                this.getSelectedTickets();
            });
    }

    public getAllHistory(): void {
        if (this.mailboxId && this.inprogress) {
            this.inprogress = !!0;
            const offSet: number = (this.ticketService.ticketsHistory.histories) ? this.ticketService.ticketsHistory.histories.length : 0;
            const count: number = 30;
            this.ticketService.getAllTicketHistory(this.mailboxId, offSet, count)
                .then((data: any): void => {
                    if (data.success && data.data.histories) {
                        data.data.histories = [...this.ticketService.ticketsHistory.histories, ...data.data.histories];
                        this.ticketService.ticketsHistory.set(data.data);
                        this.inprogress = !!1;
                    }
                });
        }
    }

    public getHistoryAfterScroll(event: any): void {
        if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight && this.inprogress) {
            this.getAllHistory();
            event.target.scrollTop = event.target.scrollTop - 100;
        }
    }

    public ticketFiltering(fieldName: string): void {
        this.filterBy = fieldName;
        this.userModel.setSortBy(fieldName);
        this.ticketService.tickets.reset();
        this.selectMenu.showLoading = !!1;

        this.ticketService.getTickets(this.mailboxId, this.activeTickets, '', this.filterBy, 0)
            .then((data: any): void => {
                this.ticketService.tickets.set(data.data);
                this.ticketsTotalCount = data.total;
                this.selectMenu.showLoading = !!0;
                this.selectMenu.showData = !!1;
                this.getSelectedTickets();

                // if (data.total > this.ticketService.tickets.length && (this.ticketService.tickets.length * 65) < (window.innerHeight - 110)) {
                //     this.offset = this.ticketService.tickets.length ? this.ticketService.tickets.length : 0;
                //
                //     this.ticketService.getTickets(this.mailboxId, '', '', this.filterBy, this.offset)
                //         .then((secondData: any): void => {
                //             if (secondData.success) {
                //                 this.ticketService.tickets.set([...(this.ticketService.tickets), ...(secondData.data)]);
                //                 this.ticketsTotalCount = secondData.total;
                //             }
                //         });
                // }
            });
    }

    /**
     * get more tickets after next down
     * @param event
     */
    public nextTickets(): void {

        // let totalTicketCount: number = this.ticketsTotalCount;
        // this.mailboxService.mailboxes.forEach((val: any, index: number): void => {
        //     if (val.id === this.mailboxId) {
        //         totalTicketCount = val[this.activeTickets + '_tickets_count'];
        //     }
        // });

        // if (event.target.scrollTop > 20)
        //     document.getElementById('moveTopBtn').style.display = 'block';
        // else
        //     document.getElementById('moveTopBtn').style.display = 'none';
        let offset: number = this.offset + 15;
        if (this.offset + 15 > this.ticketsTotalCount){
            offset = this.ticketsTotalCount  ;
        }
        if (this.ticketService.tickets.length && this.ticketsTotalCount > offset) {
                this.ticketService.getTickets(this.mailboxId, this.activeTickets, '', this.filterBy, offset)
                    .then((data: any): void => {
                        if (data.success) {
                            if (this.selectMenu.selectAllTickets && this.selectedTickets.main.length && this.selectedTickets.main.length === this.ticketService.tickets.length){
                                this.selectAllTickets(!!0);
                            }
                            this.ticketService.tickets.reset();
                            this.ticketService.tickets.set(data.data);
                            this.offset  = offset;
                            this.ticketsTotalCount = data.total;

                        }
                    });
        }
    }

    public prevTickets(): void {
        // this.offset = this.ticketService.tickets.length ? this.ticketService.tickets.length : 0;
        if (this.ticketService.tickets.length && this.offset - 15 >= 0 && this.offset) {

            this.ticketService.getTickets(this.mailboxId, this.activeTickets, '', this.filterBy, this.offset - 15)
                .then((data: any): void => {
                    if (data.success) {
                        if (this.selectMenu.selectAllTickets && this.selectedTickets.main.length && this.selectedTickets.main.length === this.ticketService.tickets.length){
                            this.selectAllTickets(!!0);
                        }
                        if (this.offset >= 15){
                            this.offset = this.offset - 15;
                        }

                        if (this.offset < 15){
                            this.offset = 0;
                        }
                        this.ticketService.tickets.reset();
                        this.ticketService.tickets.set(data.data);
                        this.ticketsTotalCount = data.total;
                    }
                });
        }
    }

    public moveTop(): void {
        document.querySelector('table.table tbody tr').scrollIntoView();
    }
    public changeListType(type: boolean): void{
        this.listType = type;
        this.userModel.setTicketView(type);
    }
}
