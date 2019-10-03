import {Injectable} from '@angular/core';
import {DtoMailboxModel} from '../models/mailbox.model';
import {MailboxDtoInterface} from '../interfaces/mailbox-dto.interface';

@Injectable()
export class Mailbox extends DtoMailboxModel implements MailboxDtoInterface {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, Mailbox.prototype);
    }

    public auto_reply_timeline: AutoReplyFormatInterface =  new AutoReplyFormat();

    public set(mailboxs: MailboxDtoInterface): void {
        for (const mailbox in mailboxs){

            if (typeof this[mailbox] === 'object' && mailbox === 'auto_reply_timeline'){
                this[mailbox].set(mailboxs[mailbox]);
            }else{
                this[mailbox] = mailboxs[mailbox];

            }
        }
    }
}
export class AutoReplyFormat implements AutoReplyFormatInterface{
    public Monday: AutoReplyDeyDataInterface = new AutoReplyDeyData();
    public Tuesday: AutoReplyDeyDataInterface = new AutoReplyDeyData();
    public Wednesday: AutoReplyDeyDataInterface = new AutoReplyDeyData();
    public Thursday: AutoReplyDeyDataInterface = new AutoReplyDeyData();
    public Saturday: AutoReplyDeyDataInterface = new AutoReplyDeyData();
    public Sunday: AutoReplyDeyDataInterface = new AutoReplyDeyData();
    public Friday: AutoReplyDeyDataInterface = new AutoReplyDeyData();
    public set: (auto_reply_timelines: AutoReplyFormatInterface) => void  =  (auto_reply_timelines: AutoReplyFormatInterface): void => {
        for (const auto_reply_timeline in auto_reply_timelines){
            if (auto_reply_timelines.hasOwnProperty(auto_reply_timeline)) {
                for (const deyData in auto_reply_timelines[auto_reply_timeline]) {
                    if (auto_reply_timelines[auto_reply_timeline][deyData]){
                        if (typeof auto_reply_timelines[auto_reply_timeline][deyData] === 'string'){
                            auto_reply_timelines[auto_reply_timeline][deyData] = new Date(auto_reply_timelines[auto_reply_timeline][deyData]);
                        }
                        this[auto_reply_timeline][deyData] = auto_reply_timelines[auto_reply_timeline][deyData];
                    }

                }
            }
        }
    }
}

export class AutoReplyDeyData implements AutoReplyDeyDataInterface{

    public from: Date = new Date(0, 0, 0, 9, 0, 0);
    public to: Date = new Date(0, 0, 0, 17, 0, 0);
    public enable: number = 0;
    // @ts-ignore
    // public set from(from:string):void{
    //     this._from = new Date(from);
    // }
    // // @ts-ignore
    // public get from():Date{
    //     return this._from ;
    // }
    // // @ts-ignore
    // public set to(to:string):void{
    //     this._to = new Date(to);
    // }
    // // @ts-ignore
    // public get to():Date{
    //     return this._to ;
    // }

}

export interface AutoReplyFormatInterface{
    Monday: AutoReplyDeyDataInterface;
    Tuesday: AutoReplyDeyDataInterface;
    Wednesday: AutoReplyDeyDataInterface;
    Thursday: AutoReplyDeyDataInterface;
    Saturday: AutoReplyDeyDataInterface;
    Sunday: AutoReplyDeyDataInterface;
    Friday: AutoReplyDeyDataInterface;
    set: (auto_reply_timelines: AutoReplyFormatInterface) => void;
}
export interface AutoReplyDeyDataInterface{
    from: Date;
    to: Date;
    enable: number;
}