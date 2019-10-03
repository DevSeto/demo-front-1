import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariables} from '../extra/global.variables';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {GlobalServices} from '../helpers/global.service';
import {UsersModel} from '../../models/components/users.model';
import {Mailbox, Mailboxes} from '../../dto';

@Injectable()
export class MailBoxService {

    private mailboxUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/ticketing/mailboxes';
    private defaultMailboxUrl: string = GlobalVariables.BACKEND_API_URL + '/default_mailbox/';
    private newCodeUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/ticketing/mailboxes/resend_confirmation/';
    public mailboxIndex: number;
    public newReg: boolean = !!0;
    public allMailboxes: Array<any> = [];
    public timeData: any = {};

    public editReplyEmit: EventEmitter<any> = new EventEmitter<any>();

    constructor(private http: HttpClient,
                private mailboxModel: MailBoxModel,
                public mailbox: Mailbox,
                public defaultMailbox: Mailbox,
                public mailboxes: Mailboxes,
                private usersModel: UsersModel) {
    }

    public createNewMailbox(newMailbox: any): Promise<any> {
        return this.http.post(
            this.mailboxUrl,
            this.mailboxModel.dataCompile(newMailbox),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public changeMailboxName(mailboxName: any): Promise<any> {
        return this.http.patch(
            this.defaultMailboxUrl,
            this.mailboxModel.dataCompile(mailboxName),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public changeMailbox(newMailbox: any, mailboxId: any): Promise<any> {
        const url: string = this.mailboxUrl + '/' + mailboxId;

        return this.http.put(
            url,
            this.mailboxModel.dataCompile(newMailbox),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public getAllMailboxs(): Promise<any> {
        return this.http.get(this.mailboxUrl, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public mailboxIdAllAgents(id: any): Promise<any> {
        return this.http.get(this.mailboxUrl + '/' + id + '/users', GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public getMailboxById(id: any): Promise<any> {
        return this.http.get(
            this.mailboxUrl + '/' + id,
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public verifyMailbox(mailboxId: any): Promise<any> {
        const url: string = this.mailboxUrl + '/verify/' + mailboxId;

        return this.http.post(
            url,
            this.mailboxModel.dataCompile(''),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public drnfNewCode(mailboxId: any): Promise<any> {
        const url: string = this.newCodeUrl +  mailboxId;
        return this.http.post(
            url,
            this.mailboxModel.dataCompile(''),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public changeAutoreply(name: any, mailboxId: number): Promise<any> {
        const url: string = this.mailboxUrl + '/' + mailboxId + '/' + 'auto_reply';

        return this.http.post(
            url,
            this.mailboxModel.dataCompile(name),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public userMailboxPermissions(userId: any, mailboxId: any, check: any): Promise<any> {
        const url: string = this.mailboxUrl + '/permissions/' + mailboxId + '/' + userId + '/' + check;

        return this.http.post(
            url,
            this.mailboxModel.dataCompile(name),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public checkForwarding(mailboxId: any): Promise<any> {
        const url: string = this.mailboxUrl + '/' + mailboxId + '/check_forwarding';

        return this.http.post(
            url,
            this.mailboxModel.dataCompile(''),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public checkDkim(mailboxId: any): Promise<any> {
        const url: string = this.mailboxUrl + '/verify/' + mailboxId;

        return this.http.post(
            url,
            this.mailboxModel.dataCompile(''),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public setOfficeHours(timeData: any, mailboxId: number): Promise<any> {
        const url: string = this.mailboxUrl + '/hours/' + mailboxId;

        return this.http.post(
            url,
            this.mailboxModel.dataCompile(timeData),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public getOfficeHours(mailboxId: number): Promise<any> {
        const url: string = this.mailboxUrl + '/hours/' + mailboxId;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.mailboxModel.extractData)
            .catch(this.mailboxModel.handleError);
    }

    public checkEmailConfirmation( confirmationKey: string|number ): Promise<any> {
        const url: string = this.mailboxUrl + '/confirm/' + confirmationKey;

        return this.http.post(url, '', GlobalServices.AuthHeader(this.usersModel.getToken()))
          .toPromise()
          .then(this.mailboxModel.extractData)
          .catch(this.mailboxModel.handleError);
    }
}
