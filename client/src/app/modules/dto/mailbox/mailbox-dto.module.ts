import {NgModule} from '@angular/core';
import {Mailbox} from './index';
import {Mailboxes} from './index';

@NgModule({
    providers: [
        Mailboxes,
        Mailbox,
    ],
})

export class MailboxDtoModule { }
