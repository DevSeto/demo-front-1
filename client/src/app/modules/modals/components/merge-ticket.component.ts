import {Component, Output, EventEmitter, OnInit, Input, HostListener, OnDestroy} from '@angular/core';
import {TicketsService} from '../../../services/components/tickets.service';
import {ToastrService} from '../../../modules/toastr';
import {DtoMailboxModel, TicketDtoInterface, TicketTimeline} from '../../../dto';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {SocketService} from '../../../services/components/socket.service';
import {DraftService} from '../../../services/components/draft.service';
import {UsersService} from '../../../services/components/users.service';

@Component({
    selector: 'merge-ticket',
    templateUrl: '../html/merge-ticket.component.html',
})

export class MergeTickets implements OnInit , OnDestroy {

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;


    public objecktKey: any = Object.keys;
    public moreTickets: any = [];
    public cloud: any = showed;
    public margeCheckAllTickets: Array<any> = [];
    public allCustomerTickets: Array<any> = [];
    public scrollRequest: boolean = !!0;
    public checkConfirm: boolean = !!0;
    public showLoading: boolean = !!1;

    public selectMenu: any = {
        checkAllTickets: !!0 as boolean,
    };

    public selectedMergeTickets: any = {
        main: {} as any,
    };
    public buttonStyle: any = {
        commentBtnColor: !!0 as boolean,
        bulkBtnColor: !!0 as boolean,
    };

    public masterIcon: boolean = !!0;
    public masterIconMore: boolean = !!0;
    public maxHeight: boolean = !!0;

    @Input('allTickets')
    public allTickets: Array<any>;

    @Input('masterTicket')
    public masterTicket: any;

    @Output('mergeTicketEmit')
    public mergeTicket: EventEmitter<void | boolean> = new EventEmitter<void | boolean>();

    constructor(public socketService: SocketService,
                public ticketService: TicketsService,
                private draftService: DraftService,
                public mailboxService: MailBoxService,
                public usersService: UsersService,
                private toastr: ToastrService) {
            this.ticketService.getTicket(ticketService.readyForMerge.id , 0 , '&replies=true').then(( result: any ): void => {
                this.ticketService.readyForMerge = result.ticketData;
                this.ticketService.mergeTicketTimeline = result.data;
                this.selectedMergeTickets.main[result.ticketData.id] = result.ticketData;
                this.margeCheckAllTickets[result.ticketData.id] = !!1;
                this.showLoading = !!0;
            });
    }

    public  scrollingTickets(): void {
        function getDocumentHeight() {
            const body = document.body;
            const html = document.documentElement;

            return Math.max(
                document.getElementById('mergmergePopupContent').scrollHeight, document.getElementById('mergmergePopupContent').offsetHeight,
                document.getElementById('mergmergePopupContent').clientHeight, document.getElementById('mergmergePopupContent').scrollHeight, document.getElementById('mergmergePopupContent').offsetHeight,
            );
        }

        function getScrollTop() {
            return document.getElementById('mergmergePopupContent').scrollTop;
        }
        console.log(getScrollTop() , getDocumentHeight() , window.innerHeight)
        if (getScrollTop() >= getDocumentHeight() - window.innerHeight && !this.scrollRequest) {
            this.scrollRequest = !!1;
            const offset: number = this.ticketService.mergeTicketTimeline.length ? this.ticketService.mergeTicketTimeline.length + 1 : 0;

            this.ticketService.getTicket(this.ticketService.readyForMerge.id, offset, '&replies=true')
                .then((data: any) => {
                    this.scrollRequest = !!0;
                    this.ticketService.mergeTicketTimeline = [...(this.ticketService.mergeTicketTimeline), ...(data.data)] as TicketTimeline;
                });
        }
    }
    public ngOnInit(): void {
    }
    public ngOnDestroy(): void {
        this.ticketService.mergeTicketTimeline = null;
        this.ticketService.readyForMerge = null;
        this.selectedMergeTickets.main = {};
        this.margeCheckAllTickets = [];
    }

    public showSuccess() {
        this.toastr.success('Tickets has been successfully merged.', 'Success', this.defaultToastrParams);
    }

    public openMasterTicketBody(): void {
        this.masterIcon = !this.masterIcon;
    }

    public openMasterMore(): void {
        this.masterIconMore = !this.masterIconMore;
        this.maxHeight = !this.maxHeight;
    }

    public openMore(index?: any): void {
        if (this.moreTickets[index]) {
            this.moreTickets[index] = !!0;
        }
        else {
            this.moreTickets[index] = !!1;
        }
    }

    public confirmMerge(): void {
        const requestData: any = {
            ticket_id: [],
            tickets_id_hashs: [],
        };

        if (Object.keys(this.selectedMergeTickets.main).length) {
            (Object as any).values(this.selectedMergeTickets.main).forEach((ticket: TicketDtoInterface): void => {
                requestData.ticket_id.push(ticket.id);
                requestData.tickets_id_hashs.push(ticket.ticket_id_hash);
            });
        }

        this.ticketService.mergeTickets(this.ticketService.mergeMasterTicket.ticket_id_hash, requestData)
            .then((data: any): void => {
                if (data.success) {
                    const timeline: Array<any> = []
                    if (data.data.data.merged_tickets.length){
                       for (const index in data.data.data.merged_tickets){
                           const mergedData: any = {
                               created_at: data.data.data.updated_at,
                               merged_tickets_data: data.data.data.merged_tickets[index],
                               type: 'merge',
                           };
                           timeline.push(mergedData);
                       }
                    }
                    // const timeline: any = {
                    //     created_at: data.data.data.updated_at,
                    //     merged_tickets_data: data.data.data.merged_tickets,
                    //     type: 'merge',
                    // };
                    //
                    timeline.reverse();
                    this.ticketService.ticketTimeline = [...(this.ticketService.ticketTimeline), ...(timeline)] as TicketTimeline;
                    this.ticketService.ticket.merged = 1;
                    this.showSuccess();
                    this.draftService.deleteDraftByTicketId(requestData.ticket_id, this.ticketService.mergeMasterTicket.mailbox_id);
                    this.deleteAllSelectedTickets((): void => {
                        this.socketService.mergeTickets(
                            this.mailboxService.mailboxes,
                            this.ticketService.mergeMasterTicket,
                            this.ticketService.customerTickets,
                            timeline,
                            this.ticketService.tickets,
                            this.ticketService.filterticketsStatus,
                            this.margeCheckAllTickets,
                        );
                    });
                    this.cloud.effect = 'mergeTicket';
                    this.cloud.effect = 'showSuccsesMerge';
                }
            });
    }

    public changeInbox(mailboxId: number, status: string): void {
        this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
            if (mailbox.id === mailboxId) {
                this.mailboxService.mailboxes[index][status + '_tickets_count'] = this.mailboxService.mailboxes[index][status + '_tickets_count'] - 1;
            }
        });
    }

    public deleteAllSelectedTickets(callback: any): void {
        if (this.selectedMergeTickets.main) {
            let mergeMasterTicketlength: number = this.ticketService.customerTickets.length;
            while (mergeMasterTicketlength--) {
                if (this.margeCheckAllTickets[this.ticketService.customerTickets[mergeMasterTicketlength].id]) {
                    this.ticketService.customerTickets.splice(mergeMasterTicketlength, 1);
                }
            }

            let allTicketLength: number = this.ticketService.tickets.length;
            while (allTicketLength--) {
                if (this.margeCheckAllTickets[this.ticketService.tickets[allTicketLength].id]) {
                    this.ticketService.tickets.splice(allTicketLength, 1);
                }
            }

            let notificationLength: number = this.ticketService.ticketsNotification.notifications.length;
            while (notificationLength--) {
                if (this.margeCheckAllTickets[this.ticketService.ticketsNotification.notifications[notificationLength].ticket_id]) {
                    this.ticketService.ticketsNotification.notifications.splice(notificationLength, 1);
                    this.ticketService.ticketsNotification.total = this.ticketService.ticketsNotification.total - 1;
                    this.ticketService.ticketsNotification.total_new = this.ticketService.ticketsNotification.total_new - 1;
                }
            }

            (Object as any).values(this.selectedMergeTickets.main).forEach((ticket: any): void => {
                this.changeInbox(ticket.mailbox_id, ticket.status);
            });
        }
        callback();
    }

    public changeButtonStyle(): void {
        this.cloud.effect = 'addMergeComment';
        this.buttonStyle.commentBtnColor = !this.buttonStyle.commentBtnColor;
    }

    public selectMergedTicket(checked: boolean, ticket: any): void {
        if (checked) {
            this.selectedMergeTickets.main[ticket.id] = ticket;
            this.margeCheckAllTickets[ticket.id] = !!1;
        } else {
            this.margeCheckAllTickets[ticket.id] = !!0;
            delete this.selectedMergeTickets.main[ticket.id];
        }
    }

    public checkAllSelectTickets(): void {
        if (this.ticketService.customerTickets.length !== Object.keys(this.selectedMergeTickets.main).length) {
            this.ticketService.customerTickets.forEach((ticket: any): void => {
                this.selectedMergeTickets.main[ticket.id] = ticket;
                this.margeCheckAllTickets[ticket.id] = !!1;
            });
        } else {
            this.ticketService.customerTickets.forEach((ticket: any): void => {
                delete this.selectedMergeTickets.main[ticket.id];
                this.margeCheckAllTickets[ticket.id] = !!0;
            });
        }
    }

    public assigneName(id: number): string {
        if (id === this.usersService.user.id){
            return 'You';
        }else if (!id){
            return this.ticketService.readyForMerge.customer_name;
        }else if (this.usersService.activeUsers.length){
            for (const user of this.usersService.activeUsers){
                if (user.id === id){
                    return user.first_name + ' ' + user.last_name[0] + '.';
                }
            }
        }

        return 'Anyone';
    }


}
