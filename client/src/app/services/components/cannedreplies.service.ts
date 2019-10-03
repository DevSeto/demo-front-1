import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariables} from '../extra/global.variables';
import {TicketsModel} from '../../models/components/tickets.model';
import {GlobalServices} from '../helpers/global.service';
import {UsersModel} from '../../models/components/users.model';
import {CannedReplies} from '../../modules/dto/canned-raply/dto/canned-replies.dto';
import {Categorys} from '../../modules/dto/canned-raply/dto/categorys.dto';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {CannedRepliesModel} from '../../modules/dto/canned-raply';

@Injectable()
export class CannedrepliesService {

    public poxostest: EventEmitter<any> = new EventEmitter<any>();

    public mailboxId: any;
    public textArea: any;
    public categoryId: number;
    public selectReplies: Array<string>;
    public test: string = '';
    public cannedrepliesBody: string = '';
    private globalUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/ticketing/';

    constructor(private http: HttpClient,
                public usersModel: UsersModel,
                private ticketsModel: TicketsModel,
                public cannedReplies: CannedReplies,
                public repliesList: CannedReplies,
                public currentCannedReplies: CannedRepliesModel,
                public categorys: Categorys,
                private mailboxModel: MailBoxModel) {
        this.mailboxId = mailboxModel.getMailboxCurrentId();
    }

    public getAllReplies(): Promise<any> {
        const url: string = this.globalUrl + 'canned_replies';

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getAllCategory(): Promise<any> {
        const url: string = this.globalUrl + 'canned_replies/categories';

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getCannedrepliesByCatId(id: number): Promise<any> {
        const url: string = this.globalUrl  + 'canned_replies/categories/' + id;

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public createCannedReplies(data: any): Promise<any> {
        const url: string = this.globalUrl + 'canned_replies';

        return this.http.post(
            url,
            this.ticketsModel.dataCompile(data),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public editCannedReply(data: any): Promise<any> {
        const url: string = `${this.globalUrl}canned_replies/${data.id}`;

        return this.http.put(
            url,
            this.ticketsModel.dataCompile(data),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }
    public editCannedReplyCategory(categoryName: string, id: number): Promise<any> {
        const url: string = `${this.globalUrl}canned_replies/categories/${id}`;

        return this.http.put(
            url,
            this.ticketsModel.dataCompile({name: categoryName}),
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public getCannedRepliesByMailboxId(): Promise<any> {
        const url: string = this.globalUrl + 'canned_replies';

        return this.http.get(url, GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public deleteReplies(id: any): Promise<any> {
        const url: string = this.globalUrl + 'canned_replies/' + id;

        return this.http.delete(
            url,
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }
    public deleteCategories(id: any): Promise<any> {
        const url: string = this.globalUrl + 'canned_replies/categories/' + id;

        return this.http.delete(
            url,
            GlobalServices.AuthHeader(this.usersModel.getToken()),
        )
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }

    public setNewCategory(categoryName: string): Promise<any> {
        const url: string = this.globalUrl + 'canned_replies/categories';

        return this.http.post(
            url,
            this.ticketsModel.dataCompile({name: categoryName}),
            GlobalServices.AuthHeader(this.usersModel.getToken()))
            .toPromise()
            .then(this.ticketsModel.extractData)
            .catch(this.ticketsModel.handleError);
    }
}
