import {NgModule} from '@angular/core';
import {Categorys} from './dto/categorys.dto';
import {CannedReplies} from './dto/canned-replies.dto';
import {CannedRepliesModel} from './models/canned-replies.model';

@NgModule({
    providers: [
        Categorys,
        CannedRepliesModel,
        CannedReplies,
    ],
})

export class CannedReplyDtoModule {}
