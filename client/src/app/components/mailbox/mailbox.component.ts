import {Component, OnInit} from '@angular/core';
import {MailBoxService} from '../../services/components/mailbox.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {Router} from '@angular/router';
import {TicketsService} from '../../services/components/tickets.service';
import {TicketsModel} from '../../models/components/tickets.model';
import {DraftService} from '../../services/components/draft.service';

declare let $: any;

@Component({
    selector: 'mailbox',
    templateUrl: '../../html/mailbox/mailbox.component.html',
})

export class MailboxComponent implements OnInit {

    public mailboxdata: any;
    public verifyModalOpening: boolean = !!0;

    public dataToModal: any = {
        dnsName: '',
        dnsValue: '',
        forwardAddress: '',
        mailboxId: '',
    };
    public selectMenu: any = {
        mailboxes: !!0 as boolean,
    };

    constructor(private ticketService: TicketsService,
                private mailboxService: MailBoxService,
                private ticketsModel: TicketsModel,
                public draftService: DraftService,
                private mailboxModel: MailBoxModel,
                private router: Router) {
        this.mailboxdata = mailboxService.mailboxes;
    }

    public ngOnInit() {
        console.log( this.mailboxdata);

    }

    /**
     * change mailbox data by mailbox id
     * @param {number} id
     */

    public sendMailboxId(id: number) {
        this.mailboxModel.insertMailboxId(id);
        this.router.navigate(['tickets']);
    }

    public verifyCurrentMailbox(mailBox: any): void {
        this.dataToModal.dnsName = mailBox.dns_name;
        this.dataToModal.dnsValue = mailBox.dns_value;
        this.dataToModal.forwardAddress = mailBox.forward_address;
        this.dataToModal.mailboxId = mailBox.id;
        this.verifyModalOpening = !!1;
    }

    public closeVerifyModal() {
        this.dataToModal.dnsName = '';
        this.dataToModal.dnsValue = '';
        this.dataToModal.forwardAddress = '';
        this.dataToModal.mailboxId = '';
        this.verifyModalOpening = !!0;
    }

    public verifyModal() {
        this.mailboxService.verifyMailbox(this.dataToModal.mailboxId)
            .then((data: any): void => {
                if (data.success) {
                    this.verifyModalOpening = !!0;
                } else {
                    this.verifyModalOpening = !!0;
                }
            });
    }

    public redirectTickets(id: number): void {
        this.router.navigate(['/mailbox-settings', id]);
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
}
