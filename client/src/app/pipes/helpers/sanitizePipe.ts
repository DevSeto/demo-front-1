import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'noSanitize' })
export class SanitizePipe implements PipeTransform {

    constructor(
        private domSanitizer: DomSanitizer,
    ) {}

    public transform( html: string ): SafeHtml
    {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }
}