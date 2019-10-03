import {Component, Input} from '@angular/core';

@Component({
    selector: 'images-popup',
    templateUrl: '../html/images.component.html',
})
export class ImagesPopup {

    public cloud: any = showed;

    @Input('imgFullPath')
    public imgFullPath: string;

    constructor() {
    }
}
