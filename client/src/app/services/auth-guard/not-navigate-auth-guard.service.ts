import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';
import {GlobalVariables} from '../extra/global.variables';
import {CLEAR_CLOUD_EFFECTS} from '../helpers/util.service';

@Injectable()
export class NotNavigateAuthGuardService implements CanActivate {

    constructor(private router: Router,
                private userModel: UsersModel) {
    }


    public canActivate(): boolean {
        if (this.userModel.isLogged()) {
            this.router.navigate(['/tickets']);

            return !!0;
        }

        return !!1;
    }
}
