import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';

@Injectable()
export class SecondaryAuthGuard implements CanActivate {

    constructor(private router: Router,
                private userModel: UsersModel) {
    }

    public canActivate(): boolean {
        if (this.userModel.isLogged()) {
            this.router.navigate(['/']);
            return !!0;
        }

        return !!1;
    }
}
