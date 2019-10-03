import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
    selector: 'errors-popup',
    templateUrl: '../../html/errors-popup/errors-popup.component.html',
})

export class ErrorsPopup implements OnInit {

    public errorList: any = {
        title: 'Warning',
        text: '',
    };

    public ngOnInit(): void {}
}
