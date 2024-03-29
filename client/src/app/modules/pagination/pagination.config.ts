import {Injectable} from '@angular/core';

@Injectable()
export class PaginationConfig {

    public main: any = {
        maxSize: void 0,
        itemsPerPage: 10,
        boundaryLinks: false,
        directionLinks: true,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        pageBtnClass: '',
        rotate: true,
    };

    public pager: any = {
        itemsPerPage: 15,
        previousText: '« Previous',
        nextText: 'Next »',
        pageBtnClass: '',
        align: true,
    };
}
