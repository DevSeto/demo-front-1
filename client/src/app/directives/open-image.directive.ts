import {Directive, HostListener} from '@angular/core';
import {TicketsService} from '../services/components/tickets.service';

@Directive({
    selector: '[openImage]',
})
export class OpenImageDirective {

    public cloud: any = showed;

    constructor(public ticketService: TicketsService) {
    }

    @HostListener('click', ['$event'])
    public openImage(image: any) {
        if (image.target.localName === 'img') {
            this.ticketService.selectedImagen = image.target.currentSrc;
            this.cloud.effect = 'imgPopup';
        }
    }
}