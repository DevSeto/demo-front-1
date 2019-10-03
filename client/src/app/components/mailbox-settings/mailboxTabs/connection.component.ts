import {Component, OnInit, Input, OnDestroy, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
import {GlobalVariables} from '../../../services/extra/global.variables';
import {UsersModel} from '../../../models/components/users.model';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalServices as GS} from '../../../services/helpers/global.service';
import {Title} from '@angular/platform-browser';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {UsersService} from '../../../services/components/users.service';
import {TextEditor} from '../../../modules/editor';
import {FormBuilder, Validators} from '@angular/forms';
import {_} from '../../../services/helpers/helper.service';
import {ToastrService} from '../../../modules/toastr/toastr/toastr-service';
import {MailboxDtoInterface} from '../../../modules/dto/mailbox';
import {VariablesJson} from '../../../jsons/variables.json';

declare let $: any;

@Component({
    selector: 'mailbox-connection-tab',
    templateUrl: '../../../html/mailbox-settings/mailboxTabs/connection.component.html',
})

export class ConnectionComponent implements OnInit, OnDestroy {
    public copyBtnText: any = {dnsForward: 'Copy', dnsName: 'Copy', dnsValue: 'Copy'};
    public cloud: any = showed;

    public emailVerify:string = '';
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    constructor(private usersModel: UsersModel,
                public variablesJson: VariablesJson,
                public mailboxService: MailBoxService,
                private mailboxModel: MailBoxModel,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
                private toastr: ToastrService,
                private userservice: UsersService,
                private title: Title,
                private cdRef: ChangeDetectorRef) {

    }

    public ngOnInit(): void {
    }

    private beforeOnInit(): void {
    }

    public redirectTickets(): void {
    }
    public ngOnDestroy(): void {
    }
    public onlyNumber(event: KeyboardEvent): void {
        if (!+event.key && event.key !== '0') {
            event.preventDefault();
        }
    }
    public copyTextToClipboard(name: string) {
        const copyTextarea = document.querySelector('.' + name);

        (copyTextarea as any).select();

        try {
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            // @ts-ignore
            dummy.setAttribute('value', copyTextarea.value);
            dummy.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(dummy);

            const msg = successful ? 'successful' : 'unsuccessful';
            this.copyBtnText[name] = 'Copied';

            setTimeout(() => {
                this.copyBtnText[name] = 'Copy';
                (copyTextarea as any).blur();
            }, 3000);

            if (name === 'dnsForward')
                this.toastr.success('Forwarding code has been successfully copied.', 'Success', this.defaultToastrParams);
            else if (name === 'dnsName')
                this.toastr.success('DKIM code has been successfully copied.', 'Success', this.defaultToastrParams);
            else if (name === 'dnsValue')
                this.toastr.success('SPF code has been successfully copied.', 'Success', this.defaultToastrParams);
        } catch (err) {
            console.log('asdasdwww',err)

        }
    }
    public checkDkim(): void {
        this.cloud.effect = 'checkDkim';
        this.mailboxService.checkDkim(this.mailboxService.mailbox.id)
            .then((data: any): void => {
                if (data.success) {
                    this.mailboxService.mailbox.dns_verified = 1;
                    this.toastr.success(data.message, 'Success', this.defaultToastrParams);
                }

                this.cloud.effect = 'checkDkim';
            });
    }

    public checkForward(): void {

        this.mailboxService.checkForwarding(this.mailboxService.mailbox.id)
            .then((data: any): void => {
                if (data.success) {
                    this.toastr.info('The request is in pending status it will take you a while.', 'Info', this.defaultToastrParams);

                    // this.getAgentsById()
                }
            });
    }
    public sendNewCode(): void {
        this.cloud.effect = 'checkDkim';
        this.mailboxService.drnfNewCode(this.mailboxService.mailbox.id)
          .then((data: any): void => {
              if (data.success) {
                  this.toastr.success(data.message, 'Success', this.defaultToastrParams);
              }
          });
    }
    public verifyModal() {
        console.log(this.mailboxService.mailbox.id)
        this.mailboxService.checkEmailConfirmation(this.emailVerify)
          .then((data: any): void => {
              if (data.success) {
                  this.toastr.success(data.message, 'Success', this.defaultToastrParams);
              }
              else {
                  this.toastr.error(data.message, 'Error!', this.defaultToastrParams);
              }
          });
    }

}
