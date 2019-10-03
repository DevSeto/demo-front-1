import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {UsersService} from '../../services/components/users.service';
import {Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'delete-user',
    templateUrl: '../../html/delete-user/delete-user.html',
})

export class DeleteUser implements OnInit {

    public previousTitle: string;

    @Output('closeDeleteEmit')
    public closeDeleteEmit: EventEmitter<void|boolean> = new EventEmitter<void|boolean>();

    @Input('invitedAgentName')
    public invitedAgentName: any;

    constructor(private userservice: UsersService,
                private router: Router,
                private usersmodel: UsersModel,
                private title: Title) {

    }

    public ngOnInit() {}

    public closeDeletePopup(): void {
        this.closeDeleteEmit.emit();
        this.title.setTitle(this.previousTitle);
    }
}
