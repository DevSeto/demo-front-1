import {PipeTransform, Pipe} from '@angular/core';
import {isString} from '../helpers/helpers';

@Pipe({
    name: 'timePipe',
})

export class TimePipe implements PipeTransform {

    transform( date_str: any , forSnooze ?: string ): any
    {
        const months: any = {
            1: 'Jan',
            2: 'Feb',
            3: 'Mar',
            4: 'Apr',
            5: 'May',
            6: 'Jun',
            7: 'Jul',
            8: 'Aug',
            9: 'Sept',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec',
        };

        if (!date_str) {return; }
        if (forSnooze){
            return this.snoozeTimner(date_str , forSnooze);
        }
        const currentresult = date_str;
        date_str = $.trim(date_str);
        date_str = date_str.replace(/\.\d\d\d+/, ''); // remove the milliseconds
        date_str = date_str.replace(/-/, '/').replace(/-/, '/'); // substitute - with /
        date_str = date_str.replace(/T/, ' ').replace(/Z/, ' UTC'); // remove T and substitute Z with UTC
        date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // +08:00 -> +0800
        const parsed_date: any = new Date(date_str);
        const getDate: number = parsed_date.getDate();
        const getMonth: number = parsed_date.getMonth();
        const getFullYear: number = parsed_date.getFullYear();

        const relative_to: any = (arguments.length > 1) ? arguments[1] : new Date(); // defines relative to what ..default is now
        let delta: any = parseInt(((relative_to.getTime() - parsed_date) / 1000).toString(), 10);
        let currentUserTimezone: any = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[0];
        if (((+currentUserTimezone.split(' ')[0].split('+')[1]))){
            currentUserTimezone = ((+currentUserTimezone.split(' ')[0].split('+')[1].replace(/\(|\)/g, '')) / 100) * 60 * 60;

        }else{
            currentUserTimezone = ((+currentUserTimezone.split(' ')[0].split('-')[1].replace(/\(|\)/g, '')) / 100) * 60 * 60;
        }

        delta = (delta < 2) ? 2 : delta;
        delta = delta - currentUserTimezone;
        let r: any = '';
        if ((parseInt((delta / 86400).toString(), 10)) > 6) {
           r = `${getDate} ${months[getMonth + 1]} ${getFullYear}`;
        } else if (delta < 120) {
            r = 'a minute ago';
        } else if (delta < (45 * 60)) {
            r = (parseInt((delta / 60).toString(), 10)).toString() + ' min ago';
        } else if (delta < (2 * 60 * 60)) {
            r = 'an hour ago';
        } else if (delta < (24 * 60 * 60)) {
            r = '' + (parseInt((delta / 3600).toString(), 10)).toString() + ' hours ago';
        } else if (delta < (48 * 60 * 60)) {
            r = 'a day ago';
        } else {
            r = (parseInt((delta / 86400).toString(), 10)).toString() + ' days ago';
        }

        return r;
    }

    snoozeTimner( snooze_time: string , server_time: string ): any
    {
        const countDownDate = new Date(snooze_time).getTime();

// Update the count down every 1 second
//         var x = setInterval(() =>{

        // Get todays date and time
        const now = new Date(server_time).getTime();

        // Find the distance between now an the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days: any = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours: any = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes: any  = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds: any = Math.floor((distance % (1000 * 60)) / 1000);

        if (days > 0){
            days = days + ' day  ';
        }else{
            days = '';
        }
        if (hours < 10){
            hours = '0' + hours;
        }
        if (minutes < 10){
            minutes = '0' + minutes;
        }
        if (seconds < 10){
            seconds = '0' + seconds;
        }

        let snoozeTimeDate: string = days  + hours + ':' +  minutes ;

        if (distance > 0){
            // setTimeout(()=>{
            //     let sndate = new Date(server_time);
            //
            //     sndate.setSeconds(sndate.getSeconds() + 8);
            //     this.snoozeTimner( countDownDate  , sndate);
            // },8000)
        }else{
            snoozeTimeDate = '';
        }

        return snoozeTimeDate;
        // Output the result in an element with id="demo"
        // If the count down is over, write some text
        // if (distance < 0) {
        //     clearInterval(x);
        //     document.getElementById("demo").innerHTML = "EXPIRED";
        // }
        // }, 1000);
    }

}
