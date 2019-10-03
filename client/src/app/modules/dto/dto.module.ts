import {NgModule} from '@angular/core';
import {UserDtoModule} from './user/user-dto.module';
import {TicketDtoModule} from './ticket/ticket-dto.module';
import {LabelModule} from './label/label.module';
import {StatusDtoModule} from './status/status.module';
import {MailboxDtoModule} from './mailbox/mailbox-dto.module';
import {CannedReplyDtoModule} from './canned-raply/category-dto.module';
import {CompanyModule} from './company/company.module';
import {NotificationModule} from './notification/notification.module';

@NgModule({
    imports: [
        UserDtoModule,
        TicketDtoModule,
        CompanyModule,
        MailboxDtoModule,
        LabelModule,
        StatusDtoModule,
        CannedReplyDtoModule,
        NotificationModule,
    ],
})

export class DtoModule { }
