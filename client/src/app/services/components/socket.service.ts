import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LabelsModel} from '../../models/components/labels.model';
import {UsersModel} from '../../models/components/users.model';
import {CompanyInterface, Label, Ticket, TicketCommentModule, TicketNoteModule, UserModel} from '../../dto';
import {DtoMailboxModel} from '../../modules/dto/mailbox/models/mailbox.model';
import {MailBoxService} from './mailbox.service';
import {TicketDtoInterface} from '../../modules/dto/ticket/interfaces/ticket-dto.interface';
import {TicketsService} from './tickets.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {LabelDtoInterface} from '../../modules/dto/label/interfaces/label-dto.interface';
import {LabelsService} from './labels.service';
import {NotificationJson} from '../../jsons/notification.json';
import {ToastrService} from '../../modules/toastr/toastr/toastr-service';
import {UsersService} from './users.service';
import {Router} from '@angular/router';
import {CompanyStorageModel} from '../../models/components/company.model';
import {CannedRepliesModel, DtoCategoryModel} from '../../modules/dto/canned-raply';
import {CannedrepliesService} from './cannedreplies.service';
import {DatePipe} from '@angular/common';
import {NotificationsService} from './notifications.service';
import {TicketsModel} from '../../models/components/tickets.model';
import {CurrentNotificationsDtoInterface} from '../../modules/dto/ticket/interfaces/current-notifications-dto.interface';
import {CurrentNotificationsModule} from '../../modules/dto/ticket/models/general-notification.module';

@Injectable()
export class SocketService {

    public subdomain: string;
    public openPushNotification: number = 0;
    public socket: any;
    public complitationStep: number = 2;
    public viewUsers: any = {};
    public viewUsersLength: number;
    public trafficCopData: Array<any> = [];
    public currentTrCopId: number;

    public defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;
    public cloud: any = showed;

    public isDraft: EventEmitter<boolean> = new EventEmitter<boolean>();
    public changeSelectedTickets: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient,
                private mailBoxModel: MailBoxModel,
                private labelsModel: LabelsModel,
                public ticketService: TicketsService,
                public labelService: LabelsService,
                public cannedRepliesService: CannedrepliesService,
                public notificationJson: NotificationJson,
                public ticketsModel: TicketsModel,
                public usersService: UsersService,
                private companyStorageModel: CompanyStorageModel,
                public notificationsService: NotificationsService,
                public mailboxService: MailBoxService,
                public datePipe: DatePipe,
                private usersModel: UsersModel,
                public ticket: Ticket,
                public router: Router,
                public labels: Label,
                private toastr: ToastrService) {
    }

    public showMsg() {
        this.toastr.info('Ticket has been updated.', 'Info', this.defaultToastrParams);
    }

    public socketEvents() {

        this.socket.on('updateStatus', (data: any) => {
            if (data) {
                const BreakException: any = {};
                this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
                    try {
                        data.mailboxes.forEach((newMailbox: DtoMailboxModel, ind: number): void => {
                            if (mailbox.id === newMailbox.id) {
                                newMailbox.draft_tickets_count = this.mailboxService.mailboxes[index].draft_tickets_count;
                                newMailbox.showed = this.mailboxService.mailboxes[index].showed;
                                this.mailboxService.mailboxes[index] = newMailbox;
                                throw BreakException;
                            }
                        });
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                });

                if (this.ticketService.tickets.length && this.ticketService.filterticketsStatus === data.oldStatus) {
                    let allTicketLength: number = this.ticketService.tickets.length;
                    while (allTicketLength--) {
                        data.selectedTickets.forEach((selectedTicket: TicketDtoInterface, ind: number): void => {
                            if (this.ticketService.tickets[allTicketLength] && this.ticketService.tickets[allTicketLength].id === selectedTicket.id) {
                                this.ticketService.tickets.splice(allTicketLength, 1);
                            }
                        });
                    }
                }

                data.selectedTickets.forEach((selectedTicket: TicketDtoInterface, ind: number): void => {
                    this.setNotIsviewed(selectedTicket.id);

                    if (this.mailBoxModel.getMailboxCurrentId() === selectedTicket.mailbox_id) {
                        if (this.ticketService.filterticketsStatus === data.currentStatus) {
                            selectedTicket.checked = !!0;
                            this.ticketService.tickets.unshift(selectedTicket);
                        }

                        if (this.ticketService.ticket && selectedTicket.id === this.ticketService.ticket.id) {
                            if (this.ticketService.ticket.snooze && data.currentStatus !== 'closed') {
                                this.ticketService.ticket.snooze = null;
                            }

                            if (this.ticketService.ticket.status !== data.currentStatus) {
                                if (this.ticketService.filterticketsStatus !== 'draft') {
                                    this.ticketService.currentTicketsStatus.emit(data.currentStatus);
                                    this.ticketService.filterticketsStatus = data.currentStatus;
                                }

                                selectedTicket.ticketDraft = this.ticketService.ticket.ticketDraft;
                                selectedTicket.status = data.currentStatus;
                                selectedTicket.snooze = this.ticketService.ticket.snooze;
                                this.ticketService.setIndividual(selectedTicket);
                            }
                        }
                    }
                });

                this.changeSelectedTickets.emit(!!1);
                this.showMsg();
            }
        });

      /**
       * todo
       */
      this.socket.on('stepFirstEmail', (data: any) => {
            console.log('this.usersService.user.step',data)
            const userData = (Object as any).assign({},  this.usersService.user);
            if(data.data.mailbox_id == this.mailboxService.defaultMailbox.id){
                this.mailboxService.defaultMailbox.forwarding_verified = 3;
                if(!document.querySelector('.progressbar-notification-wrapper.notification-container').classList.contains('open')){
                    (document.querySelector('.progressbar-notification-wrapper.notification-container .open-notification-container') as any).click()
                }
            }
            // userData.step =  {step: 2, mailbox_id: ''};
            // if(!document.querySelector('.progressbar-notification-wrapper.notification-container').classList.contains('open')){
            //   (document.querySelector('.progressbar-notification-wrapper.notification-container .open-notification-container') as any).click()
            // }
            // this.complitationStep = 3;
            // this.usersModel.updateUserData(this.usersService.user.id, userData);
        });

        this.socket.on('changeTicket', (data: any) => {
            if (this.ticketService.ticket && data.ticket.id === this.ticketService.ticket.id) {
                if (data.ticket.status !== this.ticketService.ticket.status && this.ticketService.filterticketsStatus !== 'draft') {
                    this.ticketService.currentTicketsStatus.emit(data.ticket.status);
                    this.showMsg();
                    this.ticketService.filterticketsStatus = data.ticket.status;
                }
                data.ticket.ticketDraft = this.ticketService.ticket.ticketDraft;
                this.ticketService.setIndividual(data.ticket);
            }

            const BreakException: any = {};

            this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
                try {
                    data.mailboxes.forEach((newMailbox: DtoMailboxModel, ind: number): void => {
                        if (mailbox.id === newMailbox.id) {
                            newMailbox.draft_tickets_count = this.mailboxService.mailboxes[index].draft_tickets_count;
                            newMailbox.showed = this.mailboxService.mailboxes[index].showed;
                            this.mailboxService.mailboxes[index] = newMailbox;
                            throw BreakException;
                        }
                    });

                } catch (e) {
                    if (e !== BreakException) throw e;
                }
            });

            if (this.mailBoxModel.getMailboxCurrentId() === data.ticket.mailbox_id && this.ticketService.filterticketsStatus !== 'draft') {
                if (this.ticketService.tickets.length) {
                    let allTicketLength: number = this.ticketService.tickets.length;

                    while (allTicketLength--) {
                        if (this.ticketService.tickets[allTicketLength] && this.ticketService.tickets[allTicketLength].id === data.ticket.id && data.ticket.status !== this.ticketService.tickets[allTicketLength].status) {
                            this.ticketService.tickets.splice(allTicketLength, 1);
                            allTicketLength = 0;
                        }
                    }
                }

                if (this.ticketService.filterticketsStatus !== data.oldStatus && this.ticketService.filterticketsStatus === data.ticket.status) {
                    this.ticketService.tickets.unshift(data.ticket);
                }
            }

            this.changeSelectedTickets.emit(!!1);
            this.setNotIsviewed(data.ticket.id);
        });

        this.socket.on('addLabels', (data: any) => {
            this.labelService.labels.unshift(data.label);

            this.labelService.labels.forEach((label: LabelDtoInterface, index: number) => {
                if (!label) {
                    this.labelService.labels.splice(index, 1);
                }
            });

            this.labelService.changedLabelsLength.emit(this.labelService.labels.length);
            this.labelsModel.insert(this.labelService.labels);
        });

        this.socket.on('applyLabelsToTicket', (data: any) => {
            if (this.ticketService.tickets)
                this.ticketService.tickets.forEach((ticket: any, index: number) => {
                    if (data.ticketIds.indexOf(ticket.id) > -1 && !this.hesLabels(this.ticketService.tickets[index], data.label)) {
                        this.ticketService.tickets[index].labels.push(data.label);

                        if (ticket.checked) {
                            this.labelService.mergeLabel(data.label.id, 1);
                        }
                    }
                });

            if (!this.labelService.inactiveLabel.ids[data.label.id] && this.ticketService.ticket && this.ticketService.ticket.id && data.ticketIds.indexOf(this.ticketService.ticket.id) !== -1) {
                this.labelService.mergeLabel(data.label.id, 1);
                this.ticketService.ticket.labels.push(data.label);
            }

            this.showMsg();
        });

        this.socket.on('removeLabelInTicket', (data: any) => {
            this.labelService.mergeLabel(data.labelId, -1);

            if (this.ticketService.ticket && this.ticketService.ticket.id === data.ticketId) {
                this.ticketService.ticket.labels.splice(data.index, 1);
            }

            if (this.ticketService.tickets) {
                this.ticketService.tickets.forEach((ticket: any, index: number) => {
                    if (ticket.id === data.ticketId) {
                        this.ticketService.tickets[index].labels.splice(data.index, 1);
                    }
                });
            }

            this.showMsg();
        });

        this.socket.on('setSnooze', (data: any) => {
            if (data) {
                data.selectedTickets.forEach((selectedTicket: TicketDtoInterface, ind: number): void => {
                    if (this.ticketService.ticket && selectedTicket.id === this.ticketService.ticket.id) {
                        this.ticketService.ticket.snooze = data.snoozeData;
                        this.showMsg();
                    }

                    this.setNotIsviewed(selectedTicket.id);
                });
            }
        });

        this.socket.on('trCopDraftData', (data: any) => {
            const BreakException: any = {};

            this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
                try {
                    if (mailbox.id === data.mailbox_id) {
                        if (data.drafts) {
                            this.mailboxService.mailboxes[index].attention_tickets_count = data.drafts.length;
                        } else {
                            this.mailboxService.mailboxes[index].attention_tickets_count = 0;
                        }

                        this.trafficCopData[mailbox.id] = this.mailboxService.mailboxes[index].attention_tickets_count;
                        throw BreakException;
                    }

                } catch (e) {
                    if (e !== BreakException) throw e;
                }
            });

            if (data && this.mailBoxModel.getMailboxCurrentId() === data.mailbox_id && this.ticketService.filterticketsStatus === 'attention' && data.drafts && data.drafts.length) {
                this.ticketService.tickets.reset();
                data.drafts.forEach((draft: any, index: number): void => {
                    const draftData = JSON.parse(draft);
                    data.drafts[index] = draftData;
                });
                this.ticketService.tickets.set(data.drafts);
            }
        });

        this.socket.on('indivTrCopData', (data: any) => {
            console.log('this.mailBoxModel.getCurrentStatus()',data.data)
            if (this.mailBoxModel.getCurrentStatus() !== 'attention' && data.data && data.data.individualTrCopDraft.isDraft) {
                this.ticketService.currentTicketsStatus.emit('attention');
            }
            this.setTrCopDraftData(data);
        });

        this.socket.on('trCopCount', (data: any) => {
            this.changeInbox(data.count, data.status, data.mailbox_id);
        });

        this.socket.on('deleteTrafficCopTicket', (data: any) => {
            let count: number;

            this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel): void => {
                if (mailbox.id === data.data.mailbox_id)
                    count = this.trafficCopData[mailbox.id] - data.data.count;
            });

            if (this.ticketService.filterticketsStatus === 'attention' && data.data.cop_id && this.mailBoxModel.getMailboxCurrentId() === data.data.mailbox_id) {
                for (const ticket in this.ticketService.tickets) {
                    if (this.ticketService.tickets.hasOwnProperty(ticket)) {
                        const index = parseInt(ticket, 0);
                        if (this.ticketService.tickets[ticket].id === data.data.id) {
                            this.ticketService.tickets.splice(index, 1);
                        }
                    }
                }
            }

            if (count <= 0)
                count = 0;

            this.changeInbox(count, 'attention', data.data.mailbox_id);
        });

        this.socket.on('newNote', (data: any) => {
            if (!data.data.body){
                data.data.body = data.data.note;
            }

            if (this.ticketService.ticket && data.data.ticket_id === this.ticketService.ticket.id) {
                data.data.from_email = data.data.customer_email;
                data.data.from_name = data.data.customer_name;
                data.data.type = 'note';
                data.data.note = data.data.body;
                data.data.updated_at = data.data.created_at;
                this.ticketService.ticketTimeline.unshift(data.data);
            }

            if (this.ticketService.tickets) {
                this.ticketService.tickets.forEach((selectedTicket: TicketDtoInterface, ind: number): void => {
                    if (selectedTicket.id === data.data.ticket_id) {
                        this.ticketService.tickets[ind].comments_count = this.ticketService.tickets[ind].comments_count + 1;
                    }
                });
            }
            data.data.body = data.data.note;
            this.setNotificationInList(data.data);
            this.setNotIsviewed(data.data.ticket_id);
        });

        this.socket.on('newReplies', (data: any) => {
            if (this.ticketService.ticket && data.data.ticket_id === this.ticketService.ticket.id) {
                data.data.from_email = data.data.customer_email;
                data.data.from_name = data.data.customer_name;

                data.data.type = 'comment';
                this.ticketService.ticketTimeline.unshift(data.data);
            }
            this.setNotificationInList(data.data);

            if (this.ticketService.tickets) {
                this.ticketService.tickets.forEach((selectedTicket: TicketDtoInterface, ind: number): void => {
                    if (selectedTicket.id === data.data.ticket_id) {
                        this.ticketService.tickets[ind].comments_count = this.ticketService.tickets[ind].comments_count + 1;
                        this.ticketService.tickets[ind].viewed = 1;
                    }
                });
            }
            this.setNotIsviewed(data.data.ticket_id);
        });

        this.socket.on('newTicket', (data: any) => {
            data.data.opened_count = 0;
            // data.data.id = data.data.ticket_id;

            if (!data.data.status) {
                data.data.status = 'open';
            }

            let exist: boolean = !!0;
            if (this.ticketService.tickets) {
                this.ticketService.tickets.forEach((selectedTicket: TicketDtoInterface, ind: number): void => {
                    if (selectedTicket.id === data.data.id) {
                        exist = !!1;
                    }
                });
            }

            if (!exist && this.mailBoxModel.getMailboxCurrentId() === data.data.mailbox_id && data.data.status === this.ticketService.filterticketsStatus) {
                this.ticketService.tickets.unshift(data.data);

            }
            if (this.mailBoxModel.getMailboxCurrentId() === data.data.mailbox_id && this.ticketService.mergeMasterTicket && this.ticketService.mergeMasterTicket.customer_email === data.data.customer_email) {
                this.ticketService.customerTickets.unshift(data.data);
            }

            this.changeInbox(1, data.data.status, data.data.mailbox_id);
            this.setNotificationInList(data.data);
        });

        this.socket.on('updateCompanyData', (data: any) => {
            this.usersService.setCompany(data.company);
            this.companyStorageModel.insert(data.company);
        });

        this.socket.on('updateTicketAssignUser', (data: any) => {
            // console.log(data,this.ticketService.ticket)
            if (this.ticketService.ticket && data.ticketIdHass.indexOf(this.ticketService.ticket.ticket_id_hash) !== -1) {
                let agent: any = null;
                if (data.userId !== 0) {
                    agent = data.userData;
                }

                this.ticketService.ticket.assigned_user = agent;
                this.ticketService.changeassignment.emit(agent);
                this.ticketService.ticket.assign_agent_id = data.userId;
                this.showMsg();
            }
        });

        this.socket.on('updateUsers', (data: any) => {
            if (this.usersService.activeUsers) {
                this.usersService.activeUsers.forEach((user: UserModel, ind: number): void => {
                    if (user.id === data.userData.id) {
                        this.usersService.activeUsers[ind] = data.userData;
                    }
                });
            }

            if (this.ticketService.ticket && this.ticketService.ticketTimeline) {
                this.ticketService.ticketTimeline.forEach((timline: TicketNoteModule|TicketCommentModule, ind: number): void => {
                    if (timline.author_id === data.userData.id) {
                        this.ticketService.ticketTimeline[ind].author = data.userData;
                    }
                });
            }

            if (this.ticketService.ticketsNotification.notifications) {
                this.ticketService.ticketsNotification.notifications.forEach((notifications: any, ind: number): void => {
                    if (notifications.notifications.author_id && notifications.notifications.author_id === data.userData.id) {
                        this.ticketService.ticketsNotification.notifications[ind].notifications.author = data.userData;
                    }
                });

            }
            this.usersService.usersAfterInvite.emit(!!1);
            this.usersService.changeUserData.emit(data.userData);
        });

        this.socket.on('ticketAssign', (data: any) => {
                this.setNotificationInList(data.data);

        });

        this.socket.on('changeCannedReplies', (data: any) => {
            if (this.mailBoxModel.getMailboxCurrentId() === data.mailboxId) {
                this.cannedRepliesService.cannedReplies.set(data.cannedReplies);
                this.cannedRepliesService.categorys.set(data.cannedRepliesCategory);
            }
        });

        this.socket.on('changeMailboxData', (data: any) => {
            this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
                if (mailbox.id === data.mailboxData.id) {
                    data.mailboxData.draft_tickets_count = this.mailboxService.mailboxes[index].draft_tickets_count;
                    data.mailboxData.showed = this.mailboxService.mailboxes[index].showed;
                    this.mailboxService.mailboxes[index] = data.mailboxData;
                }
            });
        });

        this.socket.on('addHistory', (data: any) => {
            if (data.created_at) {
                data.created_at = this.datePipe.transform(new Date(data.created_at), 'dd-MM-yyyy');
                this.ticketService.individualHistory.unshift(data);
            }
        });

        this.socket.on('mergeTickets', (data: any) => {
            if (data) {
                if (this.ticketService.ticket && data.ticket.id === this.ticketService.ticket.id) {
                    this.ticketService.ticket.merged = 1;
                    this.ticketService.ticketTimeline.unshift(data.timeline);
                    this.showMsg();
                }

                if (this.ticketService.ticket && data.ticket.id !== this.ticketService.ticket.id && data.ticket.customer_email === this.ticketService.ticket.customer_email) {
                    this.router.navigate(['ticket/' + data.ticket.id]);
                }

                this.ticketService.customerTickets.reset();
                this.ticketService.customerTickets.set(data.customerTickets);

                if (this.ticketService.tickets && data.status === this.ticketService.filterticketsStatus && this.mailBoxModel.getMailboxCurrentId() === data.currentMailboxId) {
                    let allTicketLength: number = this.ticketService.tickets.length;
                    while (allTicketLength--) {
                        if (data.margeCheckAllTickets[this.ticketService.tickets[allTicketLength].id]) {

                            this.ticketService.tickets.splice(allTicketLength, 1);
                        }
                    }
                }

                this.removeNotificationCount();
                const BreakException: any = {};

                this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
                    try {
                        data.mailboxes.forEach((newMailbox: DtoMailboxModel, ind: number): void => {
                            if (mailbox.id === newMailbox.id) {
                                newMailbox.draft_tickets_count = this.mailboxService.mailboxes[index].draft_tickets_count;
                                newMailbox.showed = this.mailboxService.mailboxes[index].showed;
                                this.mailboxService.mailboxes[index] = newMailbox;
                                throw BreakException;
                            }
                        });

                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                });
                this.changeSelectedTickets.emit(!!1);
            }
        });

        this.socket.on('setDomTicketTemporaryTimeline', (data: any) => {
            if (data.data.length) {
                const timeline: any = data.data.map((comment: any) => (JSON.parse(comment)).data);
                this.ticketService.ticketTemporaryTimeline.set(timeline);
            }
        });

        this.socket.on('checkPushNotification', (data: any) => {
           console.log('checkPushNotification',data);
           this.openPushNotification = 1;
        });
        this.socket.on('errorComments', (data: any) => {
            // console.log('error', data);
        });

        this.socket.on('unshiftComments', (data: any) => {
            if (data.data) {
                this.ticketService.ticketTemporaryTimeline.unshift(data.data);
            }
        });

        this.socket.on('seenEvent', (data: any) => {
            if (data && this.ticketService.ticket && this.ticketService.ticket.id === data.ticket_id) {
                this.ticketService.ticketTimeline.forEach((item: any, index: number) => {
                    if (item.id === data.comment_id) {
                        this.ticketService.ticketTimeline[index].email_status = data.type;
                    }
                });
            }
        });

        this.socket.on('viewUsers', (data: any) => {
            if (data.result && data.result[this.usersModel.getLoggedUserId()]) {
                delete data.result[this.usersModel.getLoggedUserId()];
            }

            if (data.ticketId && data.result && (Object as any).keys(data.result).length) {
                this.viewUsers[data.ticketId] = data.result;
            } else if (data.ticketId && this.viewUsers && this.viewUsers[data.ticketId]) {
                delete this.viewUsers[data.ticketId];
            }

            this.viewUsersLength = this.viewUsers[data.ticketId] ? (Object as any).values(this.viewUsers[data.ticketId]).length : 0;
        });
    }

    public setNotIsviewed(ticketId: number) {
        if (this.ticketService.tickets.length) {
            this.ticketService.tickets.forEach((ticket: TicketDtoInterface, index: number): void => {
                if (ticket.id === ticketId) {
                    this.ticketService.tickets[index].opened_count = 0;
                }
            });
        }
    }

    public removeNotificationCount() {
        this.notificationsService.getAllNotification(0)
            .then((data: any): void => {
                if (data.success) {
                    if (this.ticketService.ticketsNotification.notifications) {
                        data.data.notifications = this.ticketService.ticketsNotification.notifications = data.data.notifications;
                    }
                    this.ticketService.ticketsNotification.set(data.data);
                }
            });
    }

    public changeMailboxData(mailboxData: DtoMailboxModel) {
        this.socket.emit('updateChangeMailboxData', {
            mailboxData,
            room: this.subdomain,
        });
    }

    public changeCannedReplies(cannedReplies: Array<CannedRepliesModel>, cannedRepliesCategory: Array<DtoCategoryModel>, mailboxId: any) {
        this.socket.emit('updateCannedReplies', {
            cannedReplies,
            cannedRepliesCategory,
            mailboxId,
            room: this.subdomain,
        });
    }

    private setNotificationInList(data: any): void {
        // if (data.userData) {
            // notificationData.notification_id = data.userData.user_notification_id;

            if (!this.ticketService.ticketsNotification.total) {
                this.ticketService.ticketsNotification.set(
                    {
                        notifications: [data], total: 1, total_new: 1,
                    });
            } else {
                this.ticketService.ticketsNotification.total_new++;
                this.ticketService.ticketsNotification.notifications.unshift(data);
            }
        // }
    }

    private hesLabels(ticket: TicketDtoInterface, label: LabelDtoInterface): boolean {
        const check: any = !!0;

        if (ticket.labels.length) {
            for (const lab in ticket.labels) {
                if (label.label_id === ticket.labels[lab].label_id) {
                    return true;
                }
            }
        }
        return check;
    }

    public changeCompanyTicketStatus(mailboxes: any, selectedTickets: any, currentStatus: string, oldStatus: string) {
        this.socket.emit('changeStatus', {
            selectedTickets,
            room: this.subdomain,
            mailboxes,
            currentStatus,
            oldStatus,
        });
    }

    public changeAssigne(userData: any, userId: any, ticketIdHass: any) {
        this.socket.emit('changeAssigne', {
            userData,
            room: this.subdomain,
            userId,
            ticketIdHass,
        });
    }

    public mergeTickets(mailboxes: any, ticket: any, customerTickets: any, timeline: any, tickets: any, status: string, margeCheckAllTickets: any) {
        const data: any = {
            ticket,
            room: this.subdomain,
            mailboxes,
            currentMailboxId: this.mailBoxModel.getMailboxCurrentId(),
            timeline,
            tickets,
            status,
            customerTickets,
            margeCheckAllTickets,
        };
        this.removeNotificationCount();
        this.socket.emit('clientMergeTickets', data);
    }

    public updateUsers(userData: any) {
        this.socket.emit('changeUsersData', {
            userData,
            room: this.subdomain,
        });
    }

    public addSnooze(selectedTickets: any, snoozeData: any) {
        this.socket.emit('addSnooze', {
            selectedTickets,
            room: this.subdomain,
            snoozeData,
        });
    }

    public removeLabel(data: any) {
        this.socket.emit('removeLabel', {
            data,
            room: this.subdomain,
        });
    }

    public changeTicket(ticketId: number, user_id: number, ticket: TicketDtoInterface, oldStatus: string): void {
        this.socket.emit('clientChangeTicket',
            {
                room: this.subdomain,
                ticketId,
                user_id,
                ticket,
                oldStatus,
                mailboxes: this.mailboxService.mailboxes,
            });
    }

    public sentNewLabels(label: LabelDtoInterface): void {
        this.socket.emit('sentNewLabels',
            {
                room: this.subdomain,
                label,
            });
    }

    public changeCompany(company: CompanyInterface): void {
        this.socket.emit('changeCompany',
            {
                room: this.subdomain,
                company,
            });
    }

    public mergeLabel(ticketIds: Array<number>, label: LabelDtoInterface): void {
        this.socket.emit('sentMergeLabels',
            {
                room: this.subdomain,
                ticketIds,
                label,
            });
    }

    public changeInbox(count: number, status: any, mailboxId: number): void {
        if (status === 'attention')
            this.trafficCopData[mailboxId] = count;

        this.mailboxService.mailboxes.forEach((mailbox: DtoMailboxModel, index: number): void => {
            if (mailbox.id === mailboxId && this.mailboxService.mailboxes[index][status + '_tickets_count'] + count >= 0) {
                this.mailboxService.mailboxes[index][status + '_tickets_count'] = this.mailboxService.mailboxes[index][status + '_tickets_count'] + count;
            }
        });
    }

    public logoutUser(): void {
        this.socket.emit('logoutUser',
            {
                room: this.subdomain,
                userId: this.usersModel.getLoggedUserId(),
                authToken: this.usersModel.getToken(),
            });
    }
    public checkUser(): void {
        this.socket.emit('checkUser',
            {
                room: this.subdomain,
                userId: this.usersModel.getLoggedUserId(),
                authToken: this.usersModel.getToken(),
            });
    }

    public setCommentData(commentData: any, ticket: TicketDtoInterface): void {
        this.socket.emit('setCommentData',
            {
                room: this.subdomain,
                ticket_id: ticket.id,
                ticket,
                mailboxId: ticket.mailbox_id,
                data: commentData,
                criptData: this.ticketsModel.dataCompile(commentData),
                userId: this.usersModel.getLoggedUserId(),
                authToken: this.usersModel.getToken(),
            });
    }

    public setTrCopData(commentData: any, ticket: TicketDtoInterface): void {
        console.log('commentData',ticket)
        this.socket.emit('setTrCopData',
            {
                room: this.subdomain,
                ticket_id: ticket.id,
                ticket,
                mailboxId: ticket.mailbox_id,
                data: commentData,
                userId: this.usersModel.getLoggedUserId(),
                authToken: this.usersModel.getToken(),
            });
    }

    public getTrCopData(mailBoxId: number): void {
        this.socket.emit('getTrCopData',
            {
                room: this.subdomain,
                userId: this.usersModel.getLoggedUserId(),
                mailBoxId,
            });
    }

    public getIndivTrCopData(mailBoxId: number): void {
        if (this.socket) {
            this.socket.emit('getIndividualTrCopData',
                [
                    this.subdomain,
                    this.usersModel.getLoggedUserId(),
                    mailBoxId,
                    this.ticketService.ticket.id,
                ]);
        }
    }

    public deleteTrafficCopByTicketId(ticketIds: Array<number>, mailBoxId: number, howDelete: boolean): void {
        if (this.socket) {
            this.socket.emit('deleteTrafficCopByTicketId',
                {
                    room: this.subdomain,
                    user_id: this.usersModel.getLoggedUserId(),
                    mailbox_id: mailBoxId,
                    ticketIds,
                    howDelete,
                });
        }
    }

    public setTrCopDraftData(data: any): void {
        if (data.data) {
            this.ticketService.ticket.cop_id = data.data.individualTrCopDraft.cop_id;
            this.ticketService.ticket.ticketTrCop = data.data.individualTrCopDraft.ticketDraft;
            // this.ticketService.ticket.ticketTrCop.comment_id = data.data.individualTrCopDraft.comment_id;
            this.ticketService.ticket.isTrCop = !!1;
            //
            // if (data.data.individualTrCopDraft.isDraft && data.data.individualTrCopDraft.ticketDraft) {
            //     this.isDraft.emit(!!1);
            // }
        }else{
            this.ticketService.ticket.isTrCop = !!0;
        }
    }

    public getTicketTemporaryTimeline(ticketId: number, user: any): void {
        this.socket.emit('getTicketTemporaryTimeline',
            {
                room: this.subdomain,
                ticket_id: ticketId,
                user,
                userId: this.usersModel.getLoggedUserId(),
            });
    }

    public isUndo: boolean = !!0;

    public editTemporaryTimeline(commentId: number, key: string, index: number): void {
        if (this.ticketService.ticketTemporaryTimeline[index]) {

            this.cloud.effect.reply = '';
            this.cloud.effect.add_note = '';
            this.cloud.effect.forward = '';

            switch (this.ticketService.ticketTemporaryTimeline[index].type) {
                case 'comment':
                    if (this.ticketService.ticketTemporaryTimeline[index].is_forwarded) {
                        this.ticketService.ticket.ticketDraft.forward_files = this.ticketService.ticketTemporaryTimeline[index].attachments;
                        this.ticketService.ticket.ticketDraft.forwarding_emails = this.ticketService.ticketTemporaryTimeline[index].forwarding_emails;
                        this.ticketService.ticket.ticketDraft.forward = this.ticketService.ticketTemporaryTimeline[index].body;
                        this.cloud.effect.forward = 'active';
                    } else {
                        this.ticketService.ticket.ticketDraft.comment_files = this.ticketService.ticketTemporaryTimeline[index].attachments;
                        this.ticketService.ticket.ticketDraft.reply = this.ticketService.ticketTemporaryTimeline[index].body;
                        this.cloud.effect.reply = 'active';

                    }
                    this.isDraft.emit(!!1);

                    break;
                case 'note':
                    this.ticketService.ticket.ticketDraft.note_files = this.ticketService.ticketTemporaryTimeline[index].attachments;
                    this.ticketService.ticket.ticketDraft.note = this.ticketService.ticketTemporaryTimeline[index].note;
                    this.cloud.effect.add_note = 'active';
                    this.isDraft.emit(!!1);
                    break;
            }

            this.ticketService.ticketTemporaryTimeline.splice(index, 1);
            this.socket.emit('removeTicketTemporaryTimeline',
                {
                    room: this.subdomain,
                    commentId,
                    key,
                });
            this.isUndo = !!1;
        }
    }

    public removeTemporaryTimeline(commentId: number, key: string, index: number): void {
        this.ticketService.ticketTemporaryTimeline.splice(index, 1);
        this.socket.emit('removeTicketTemporaryTimeline',
            {
                room: this.subdomain,
                commentId,
                key,
            });
    }
}
