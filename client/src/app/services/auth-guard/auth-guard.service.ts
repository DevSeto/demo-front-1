import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';
import {GlobalVariables} from '../extra/global.variables';
import {CLEAR_CLOUD_EFFECTS} from '../helpers/util.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private userModel: UsersModel) {
    }

    public canActivate(): boolean {
        let locationPath: Array<string>;

        if (!(window as any).production_mode) {
            locationPath = (window as any).location.host.split('.');

            if (locationPath.length !== 2) {
                if (locationPath[0] !== GlobalVariables.localSubDomain) {
                    (window as any).location.href = GlobalVariables.localUrl;
                    return !!0;
                }
            }
        }

        if (!this.userModel.getAuthTokenExpTime()) {
            this.router.navigate(['/']);
            return !!0;
        }

        if (!this.userModel.isLogged()) {
            this.userModel.logoutUser();
            this.router.navigate(['/']);
            return !!0;
        }

        CLEAR_CLOUD_EFFECTS();
        return !!1;
    }
}
