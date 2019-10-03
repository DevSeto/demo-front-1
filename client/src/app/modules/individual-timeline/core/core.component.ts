import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'core',
    templateUrl: 'core.component.html',
})

export class CoreComment implements OnInit {

    public timedate: string = '';

    constructor() {
    }

    public ngOnInit(): void {
        this.updateTcketDataTime();
    }

    /**
     * poxel
     */
    private updateTcketDataTime(): void {
        setInterval(() => {
                this.timedate = this.timedate + ' ';
            },
            4000);
    }
}
