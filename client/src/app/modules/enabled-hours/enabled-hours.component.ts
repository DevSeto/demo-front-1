import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MailBoxService} from '../../services/components/mailbox.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from '../../modules/toastr/toastr/toastr-service';
import {NotificationJson} from '../../jsons/notification.json';
import {HoursDataJson} from '../../jsons/global-data';

declare let $: any;

@Component({
    selector: 'enabled-hours',
    templateUrl: './enabled-hours.component.html',
})

export class EnabledHours implements OnInit {

    public hoursData: HoursDataJson = new HoursDataJson();
    public isShowed: boolean = !!0;
    public mailboxId: number;
    public selectMenu: any = {};
    public cloud: any = showed;

    public dayErros: Array<boolean|null> = [];
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public days: Array<string> = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    // @Input()
    // public set hoursData(data: any) {
    //     if (data) {
    //         (Object as any).keys(data).forEach((day: any, index: string) => {
    //             this.mailboxService.mailbox.auto_reply_timeline[day].to = (new Date(data[day].to));
    //             this.timeData[day].from = (new Date(data[day].from));
    //             this.timeData[day].enable = data[day].enable;
    //         });
    //     }
    // }

    // @Input()
    // public set updateHours(val: boolean) {
    //     if (val) {
    //         let validTimeCount: number = 0;
    //
    //         (Object as any).keys(this.timeData).forEach((day: any, index: string) => {
    //             this.timeData[day].to = (new Date(this.timeData[day].to));
    //             this.timeData[day].from = (new Date(this.timeData[day].from));
    //
    //             if (this.timeData[day].to <= this.timeData[day].from) {
    //                 this.toastrService.info('End date should be greater than the start date.', 'Info', this.defaultToastrParams);
    //             } else
    //                 validTimeCount += 1;
    //         });
    //
    //         if (validTimeCount === (Object as any).values(this.timeData).length)
    //             this.validHoursEmit.emit({data: this.timeData, valid: !!1});
    //         else
    //             this.validHoursEmit.emit({data: null, valid: !!0});
    //     }
    // }

    @Output('validHoursEmit')
    public validHoursEmit: EventEmitter<Array<boolean|null>> = new EventEmitter<Array<boolean|null>>();

    constructor(
                private toastrService: ToastrService,
                public mailboxService: MailBoxService) {
    }
    public changeDate(day: string) {
        if (this.mailboxService.mailbox.auto_reply_timeline[day].to <= this.mailboxService.mailbox.auto_reply_timeline[day].from &&  !this.dayErros[day]) {
            this.dayErros[day] = !!1;
            this.toastrService.info('End date should be greater than the start date.', 'Info', this.defaultToastrParams);
        }else if (this.mailboxService.mailbox.auto_reply_timeline[day].to > this.mailboxService.mailbox.auto_reply_timeline[day].from && this.dayErros[day]){

            delete this.dayErros[day];
        }
        this.validHoursEmit.emit(this.dayErros);

    }
    public changeHours(hours: number, day: string  , position: string): void{
        this.mailboxService.mailbox.auto_reply_timeline[day][position] =  new Date(0, 0, 0, hours, 0, 0);
    }

    public ngOnInit() {

    }

    public clickCheckbox(day: string): void {
        this.mailboxService.mailbox.auto_reply_timeline[day].enable = 1 - this.mailboxService.mailbox.auto_reply_timeline[day].enable  ;

    }
}
