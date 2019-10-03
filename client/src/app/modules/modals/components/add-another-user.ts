import {Component, OnInit, HostListener} from '@angular/core';
import {UsersService} from '../../../services/components/users.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'add-another-user',
    templateUrl: '../html/add-another-user.html',
})

export class AddAnotherUser implements OnInit {

    public cloud: any = showed;
    public previousTitle: string;
    public invitedAgent: any;

    @HostListener('document:keyup', ['$event'])
    public isPressedToEscape(event: any): void {
        if (event.keyCode === 27) {
            this.cloud.effect = 'addAnotherUser';
            this.title.setTitle(this.previousTitle);
        }

    }

    constructor(private usersService: UsersService,
                private title: Title) {
        this.previousTitle = this.title.getTitle();
        this.title.setTitle('Birddesk: Add another user');
        this.invitedAgent = this.usersService.invitedUsersFormValue;
    }

    public ngOnInit() {
    }

    public closeAddNewUser(): void {
        this.cloud.effect = 'addAnotherUser';
        this.title.setTitle(this.previousTitle);
    }

    public openAddUser(): void {
        this.cloud.effect = 'addAnotherUser';
        this.cloud.effect = 'addUser';
    }
}
