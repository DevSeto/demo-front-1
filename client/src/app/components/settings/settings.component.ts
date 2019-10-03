import {Component, OnInit} from '@angular/core';
import {UsersModel} from '../../models/components/users.model';

@Component({
    templateUrl: '../../html/settings/settings.component.html',
})

export class SettingsComponent implements OnInit {

    public userData: any;

    constructor(private userModel: UsersModel) {
    }

    public ngOnInit() {
        this.userData = this.userModel.getLoggedUser();
    }
}
