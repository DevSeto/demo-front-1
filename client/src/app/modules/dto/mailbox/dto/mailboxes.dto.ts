import {Injectable} from '@angular/core';
import {DtoMailboxModel} from '../models/mailbox.model';
import {MailboxDtoInterface} from '../interfaces/mailbox-dto.interface';

type MAILBOX = Array<MailboxDtoInterface>;

@Injectable()
export class Mailboxes extends Array<DtoMailboxModel> implements MAILBOX {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, Mailboxes.prototype);
    }

    public set(mailboxs: MAILBOX): void {
        for (const mailbox in mailboxs)
            this[mailbox] = mailboxs[mailbox ];
    }
}
