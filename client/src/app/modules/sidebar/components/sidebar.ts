import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LabelsService} from '../../../services/components/labels.service';
import {LabelsModel} from '../../../models/components/labels.model';
import {TicketsService} from '../../../services/components/tickets.service';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {DROP_DOWN} from '../../../services/helpers/animations.service';
import {UsersService} from '../../../services/components/users.service';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {Label} from '../../../dto';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';
import {CannedReplies} from '../../dto/canned-raply/dto/canned-replies.dto';
import {CompanyStorageModel} from '../../../models/components/company.model';
import {DraftService} from '../../../services/components/draft.service';
import {SocketService} from '../../../services/components/socket.service';

@Component({
    selector: 'sidebar',
    templateUrl: '../html/sidebar.html',
    animations: [
        DROP_DOWN,
    ],
})
export class Sidebar implements OnInit {

    public cloud: any = showed;

    public subMenus: Array<string> = [
        'open',
        'pending',
        'closed',
        'spam',
        'draft',
        'attention',
    ];

    public mailboxId: number;
    public activeSubMenu: string = 'open';
    public activeLabelsMenu: boolean = !!0;
    public mailboxes: Array<any> = [];

    constructor(private labelsService: LabelsService,
                private ticketsService: TicketsService,
                private mailBoxModel: MailBoxModel,
                private labelsModel: LabelsModel,
                public mailboxService: MailBoxService,
                public companyStorageModel: CompanyStorageModel,
                public usersService: UsersService,
                public draftService: DraftService,
                private router: Router,
                private cannedRepliesService: CannedrepliesService,
                public socketService: SocketService) {
        this.mailboxId = mailBoxModel.getMailboxCurrentId();
        this.activeSubMenu = this.mailBoxModel.getCurrentStatus();

        this.subscriptions();
        this.getCannedReplies();
        this.getCompanyName();
    }

    private ngUnsubscribe: any = {
        currentMailboxIdSub: null,
        toTicketPage: null,
        currentTicketsStatusSub: null,
    };

    public subscriptions(): void {
        this.ngUnsubscribe.currentMailboxIdSub = this.ticketsService.currentMailboxId.subscribe((id: number): void => {
            if (this.mailboxId !== id || !this.mailboxService.mailbox) {
                this.mailboxId = id;
                this.mailBoxModel.insertMailboxId(id);
                this.mailboxService.mailboxes.forEach((mailbox: any, index: number): void => {
                    this.draftService.getDrafts(mailbox.id);
                    this.socketService.getTrCopData(mailbox.id);
                    if (mailbox.id === id) {
                        this.mailboxService.mailbox.set(mailbox);
                        this.mailboxService.mailboxIndex = index;
                    }
                });
            }
        });

        this.ngUnsubscribe.currentTicketsStatusSub = this.ticketsService.currentTicketsStatus.subscribe((status: string): any => {
            this.activeSubMenu = status;
            this.ticketsService.filterticketsStatus = status;
            this.mailBoxModel.setCurrentStatus(status);
        });

        this.ngUnsubscribe.toTicketPage = this.ticketsService.toTicketPage.subscribe((status: boolean): any => {
            this.router.navigate(['/tickets']).then((data: any): void => {

                if (!this.mailBoxModel.getMailboxCurrentId()) {
                    this.mailboxId = this.mailboxService.mailboxes[0].id;
                }
                this.activeSubMenu = this.mailBoxModel.getCurrentStatus();
                if (!this.activeSubMenu){
                    this.activeSubMenu = 'open';
                }
                this.ticketsService.currentMailboxId.emit(this.mailboxId);
                this.ticketsService.currentTicketsStatus.emit(this.activeSubMenu);

                if (!this.mailboxService.mailboxes[0].showed)
                    this.openCloseMailboxes(this.mailboxId, 0);
            });
        });
    }

    public ngOnDestroy() {
        (Object as any).values(this.ngUnsubscribe).forEach((val: any, index: number): void => {
            if (val) {
                val.unsubscribe();
                this.ngUnsubscribe[index] = null;
            }
        });
    }

    public ngOnInit(): void {
        const OPENED_LABELS_MENU: boolean = this.labelsModel.selectDrop();

        if (OPENED_LABELS_MENU)
            this.activeLabelsMenu = OPENED_LABELS_MENU;

        this.getAllMailboxes();
        this.getLabels();
    }

    public searchTickets(event: any): void {
        this.router.navigate(['/tickets'])
            .then((data: any): void => {
                this.ticketsService.searchTicketsByLabel.emit(event);
            });
    }

    public getLabels(): void {
        const EXIST_LABELS: Label = this.labelsModel.select();

        if (!EXIST_LABELS) {
            this.labelsService.getLabels()
                .then((data: ResponseData<Label>): void => {
                    if (data.success) {
                        this.labelsModel.insert(data.data);
                        this.labelsService.labels.set(data.data);
                    }
                });

        }else{
            this.labelsService.labels.set(EXIST_LABELS);
        }

    }

    public getAllMailboxes(): void {
        this.mailboxService.getAllMailboxs()
            .then((data: any): void => {
                if (data.success) {
                    this.mailboxService.mailboxes.set(data.data);

                    if (!this.mailboxId) {
                        this.mailboxId = data.data[0].id;
                        this.draftService.getDrafts(this.mailboxId);
                        this.socketService.getTrCopData(this.mailboxId);
                        this.ticketsService.currentMailboxId.emit(this.mailboxId);
                        // this.ticketsService.currentTicketsStatus.emit(this.activeSubMenu);
                        this.openCloseMailboxes(this.mailboxId, 0);
                    } else {
                        this.mailboxService.mailboxes.forEach((mailbox: any, index: number): void => {
                            this.draftService.getDrafts(mailbox.id);
                            this.socketService.getTrCopData(mailbox.id);

                            if (mailbox.id === this.mailboxId) {
                                this.openCloseMailboxes(mailbox.id, index);
                                this.ticketsService.currentTicketsStatus.emit(this.activeSubMenu);
                                this.mailboxService.mailbox.set(mailbox);
                            }
                        });
                    }

                    this.mailboxService.mailboxes.forEach((mailbox: any, index: number): void => {
                        if (mailbox.id === this.mailboxId) {
                            this.mailboxService.mailbox.set(mailbox);
                        }
                    });
                }
            });
    }

    public openCloseMailboxes(id: any, index?: any, click ?: boolean): void {
        // if (this.router.routerState.snapshot.url !== '/tickets' && !this.mailboxService.mailboxes[index].showed && this.mailboxId === id && this.activeSubMenu !== 'open') {
        //     this.router.navigate(['/tickets'])
        //         .then((data: any): void => {
        //             this.mailboxService.mailboxes[index].showed = !!1;
        //             this.activeSubMenu = this.mailBoxModel.getCurrentStatus();
        //             if (!this.activeSubMenu){
        //                 this.activeSubMenu = 'open';
        //             }
        //             this.ticketsService.currentTicketsStatus.emit(this.activeSubMenu);
        //         });
        // } else
        if (!this.mailboxService.mailboxes[index].showed && this.mailboxId === id && this.activeSubMenu !== 'open') {
            this.mailboxService.mailboxes[index].showed = !!1;
            this.activeSubMenu = this.mailBoxModel.getCurrentStatus();
            if (!this.activeSubMenu){
                this.activeSubMenu = 'open';
            }
            this.ticketsService.currentTicketsStatus.emit(this.activeSubMenu);
        } else {
            this.mailboxService.mailboxes[index].showed = !this.mailboxService.mailboxes[index].showed;
        }
    }

    public sortOpen(name: string, mailboxId: number, isActive: boolean, index: number): void {
        this.mailboxService.mailboxIndex = index;
        this.mailBoxModel.setCurrentStatus(name);

        if (this.router.routerState.snapshot.url !== '/tickets') {
            this.router.navigate(['/tickets']).then((data: any): void => {
                this.ticketsService.currentMailboxId.emit(mailboxId);
                this.ticketsService.currentTicketsStatus.emit(name);
            });
        } else {
            this.cannedRepliesService.mailboxId = mailboxId;
            this.ticketsService.currentMailboxId.emit(mailboxId);
            this.ticketsService.currentTicketsStatus.emit(name);
            this.getCannedReplies();
        }
    }

    public openCloseLabelsMenu(): void {
        this.activeLabelsMenu = !this.activeLabelsMenu;
        this.labelsModel.updateDrop(this.activeLabelsMenu);
    }

    public getCannedReplies(): void {
        // this.cannedRepliesService.cannedReplies.reset();
        // this.cannedRepliesService.getCannedRepliesByMailboxId().then((data: ResponseData<CannedReplies>) => {
        //     if (data.success) {
        //         Object.keys(data.data).forEach((index: string): void => {
        //             this.cannedRepliesService.cannedReplies.set(data.data);
        //         });
        //     }
        // });
    }

    public getCompanyName(): void {
        if (this.companyStorageModel.select()) {
            this.usersService.setCompany(this.companyStorageModel.select());
        } else {
            this.usersService.companySettings()
                .then((data: any): void => {
                    if (data.success && data.data) {
                        this.companyStorageModel.insert(data.data);
                        this.usersService.setCompany(data.data);
                    }
                });
        }
    }
}
