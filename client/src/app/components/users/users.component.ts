import {Component, OnInit, OnDestroy} from '@angular/core';
import {UsersService} from '../../services/components/users.service';
import {Router} from '@angular/router';
import {UsersModel} from '../../models/components/users.model';
import {GlobalVariables} from '../../services/extra/global.variables';

@Component({
    selector: 'users',
    templateUrl: '../../html/users/users.component.html',
})

export class UsersComponent implements OnInit, OnDestroy {
    public cloud: any = showed;
    public firstInit: boolean = !!0;
    public clicksorted: boolean = !!0;
    public allUsers: Array<any> = [];
    public selectMenu: any = {
        emptyFolderMsg: !!0 as boolean,
        showLoading: !!0 as boolean,
    };

    public children: any;
    public imgUrl: any = GlobalVariables.BACKEND_DOMAIN;
    public userName: any;
    public userSidebar: any;
    public userFiltered: Array<any> = [];
    public subscription: any;

    constructor(private usersService: UsersService,
                private router: Router,
                private usersModel: UsersModel) {
        this.subscriptions();
    }

    public subscriptions(): void {
        this.subscription = this.usersService.usersSortingSatatus.subscribe((event: any): void => {
            this.userName = event;
            this.sortedUser(event.status);
        });

        this.usersService.usersAfterInvite.subscribe((status: boolean): void => {
            if (status)
                this.getUsers();
        });
    }

    public ngOnInit() {
        this.getUsers();
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public sortedUser(active: string) {
        if (active) {
            this.clicksorted = !!1;
            this.allUsers = [];
            this.getUsers();
        }
    }

    public getUsers(): void {
        let acount_one: any,
            confirmedUsers: any,
            invitedUsers: any;

        this.usersService.getAllUsers({active: 'active'})
            .then((data: any): void => {
                if (data.success) {
                    // if (this.usersService.userParams.active === 'active') {
                    data.data.confirmedUsers[0]['status'] = 'Active';
                    acount_one = [data.data.confirmedUsers[0]];
                    confirmedUsers = data.data.confirmedUsers;
                    confirmedUsers.splice(0, 1);

                    // this.children = confirmedUsers;
                    // this.children = this.children.sort((a: any, b: any) => {
                    //     return new (Date as any)((b as any).created_at) - new (Date as any)((a as any).created_at);
                    // });
                // } else if (this.usersService.userParams.active === 'inactive') {
                    invitedUsers = data.data.invitedUsers;
                    const allUsers: any = invitedUsers.concat(confirmedUsers);
                    (Object as any).values(allUsers).forEach((obj: any, key: any): void => {
                        if (allUsers[key]['verified']){
                            allUsers[key]['status'] = 'Inactive';
                        }else{
                            allUsers[key]['status'] = 'Active';

                        }
                        if (obj.role_id === 4) {
                            allUsers[key].display_user_role = 'Agent';
                        } else if (obj.role_id === 3) {
                            allUsers[key].display_user_role = 'Admin';
                        }
                    });
                    this.children  = allUsers.sort((a: any, b: any) => {
                        return new (Date as any)((b as any).created_at) - new (Date as any)((a as any).created_at);
                    });

                    this.children =  acount_one.concat(this.children);


                    // }
                    this.allUsers = this.children;
                    console.log(this.allUsers)
                    this.usersFilter();

                    const navigatedData: any = this.router.getNavigatedData();
                    if (navigatedData) {
                        if (navigatedData.hasOwnProperty('userRole')) {
                            this.allUsers.forEach((user: any): void => {
                                if (user.display_user_role === navigatedData.userRole) {
                                    this.allUsers = [];
                                    this.userFiltered.push(user);
                                }
                            });
                            this.allUsers = this.userFiltered;
                            this.selectMenu.emptyFolderMsg = this.allUsers.length ? !!0 : !!1;
                        }
                    }
                }
            });
    }

    public usersFilter(): void {
        if (typeof this.userName === 'string') {
            this.allUsers.forEach((user: any): void => {
                if (user.display_user_role === this.userName) {
                    this.allUsers = [];
                    this.userFiltered.push(user);
                }
            });
            this.allUsers = this.userFiltered;
            this.selectMenu.emptyFolderMsg = this.allUsers.length === 0 ? !!1 : !!0;
        }

        if (this.clicksorted === !!1) {
            this.allUsers = [];
            this.allUsers = this.children;
            this.selectMenu.emptyFolderMsg = this.allUsers.length === 0 ? !!1 : !!0;
        }
    }

    public redirectUserProfilePage(user: any): void {
        if (user.status !== 1) {
            this.router.navigate(['/settings/users-profile', user.id]);
        }
    }

    public openCloseMenu(menuNames: Array<string>, clickOutside?: boolean, callFunction?: string): void {
        menuNames.forEach((name: string): void => {
            if (callFunction) {
                this[callFunction](name, clickOutside);
            } else if (clickOutside) {
                if (this.selectMenu[name])
                    this.selectMenu[name] = !!0;
            } else {
                this.selectMenu[name] = !this.selectMenu[name];
            }
        });
    }
}
