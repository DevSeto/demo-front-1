import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';

@Injectable()
export class UrlGuard implements CanActivate {

    constructor(private router: Router,
                private userModel: UsersModel) {
    }

    public canActivate(): boolean {
        const loggedUser: any = this.userModel.getLoggedUser();
        if (loggedUser.role_id !== 2) {
            this.router.navigate(['/tickets']);
            return !!0;
        }

        return !!1;
    }
}
