import {Component} from '@angular/core';
import {UsersModel} from '../../models/components/users.model';
import {Router} from '@angular/router';
import {SocketService} from '../../services/components/socket.service';
import {IntegrationService} from '../../services/integration/integration.service';

@Component({
    template: `<div style='position: absolute; width: 100%; height: 100%; background: #ffffff; z-index: 10000'></div>`,
})

export class LogoutComponent {

    constructor(private userModel: UsersModel,
                private router: Router,
                private socketService: SocketService,
                private integrationService: IntegrationService) {
        this.processRedirection();
    }

    /**
     * logout user and clear local storage
     */
    private processRedirection() {
        // this.integrationService.logout({user: this.userModel.select()});
        this.socketService.logoutUser();

        setTimeout(() => {
            this.userModel.logoutUser();
            (window as any).location.reload();
        }, 10);
    }
}
