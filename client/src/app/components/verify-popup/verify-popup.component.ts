import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
    selector: 'verify-popup',
    templateUrl: '../../html/verify-popup/verify-popup.component.html',
})

export class VerifyPopup implements OnInit {

    public ngOnInit(): void {
    }

    @Input('modalData')
    public modalData: any;

    @Output('verifyModal')
    public verifyModal: EventEmitter<void|boolean> = new EventEmitter<void|boolean>();

    @Output('closeVerifyModal')
    public closeVerifyModal: EventEmitter<void|boolean> = new EventEmitter<void|boolean>();

    public verifyButton(): void {
        this.verifyModal.emit();
    }

    public closeModal(): void {
        this.closeVerifyModal.emit();
    }
}