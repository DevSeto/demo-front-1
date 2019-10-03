import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../services/helpers/validation.service';
import {_} from '../../services/helpers/helper.service';
import {UsersService} from '../../services/components/users.service';
import {UsersModel} from '../../models/components/users.model';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GlobalServices as GS} from '../../services/helpers/global.service';
import {ToastrService} from '../../modules/toastr';
import {NotificationsService} from '../../services/components/notifications.service';
import {SocketService} from '../../services/components/socket.service';

@Component({
    selector: 'users-profile',
    templateUrl: '../../html/users-profile/users-profile.component.html',
})

export class UsersProfileComponent implements OnInit {

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public readonly timeZonesCount: number = 24;
    private firstInitialize: boolean = !!1;
    public cloud: any = showed;
    public countries: Array<any> = [];

    public userAvatar: any = {
        updated: !!0,
        url: '',
        file: {},
    };

    public changeColor: any = {
        active: !!1,
        inactive: !!0,
        activeHistory: !!1,
        inactiveHistory: !!0,
    };

    public selectUsersName: Array<string> = [
        'Account Owner',
        'Admin',
        'Agent',
    ];
    public usersAvatar: any = {
        avatar1: '../../../../../public/images/images/avatar1.jpg',
        avatar2: '../../../../../public/images/images/avatar2.jpg',
        avatar3: '../../../../../public/images/images/avatar3.jpg',
        avatar4: '../../../../../public/images/images/avatar4.jpg',
        avatar5: '../../../../../public/images/images/avatar5.jpg',
        avatar6: '../../../../../public/images/images/avatar6.jpg',
        avatar7: '../../../../../public/images/images/avatar7.jpg',
        avatar8: '../../../../../public/images/images/avatar8.jpg',
        avatar9: '../../../../../public/images/images/avatar9.jpg',
        avatar10: '../../../../../public/images/images/avatar10.jpg',
    };

    public uploadedFiles: any = [];
    public currentUserTimezone: any;
    public logedUser: any;
    public previousRoute: string;
    public previousTitle: string;
    public userId: any;
    public settingForm: any;
    public individualUser: any;
    public allAssignedTickets: Array<any> = [];
    public ticketsFiltered: Array<any> = [];
    public openClosed: boolean = !!0;
    public openClosedtab1: boolean = !!0;
    public sorted: any = {
        opened: !!0,
        close: !!0,
    };
    public selectMenu: any = {
        areYouSure: !!0 as boolean,
        resetPassword: !!0 as boolean,
        users: !!0 as boolean,
    };

    public _settingsFormErrors: any = {
        full_name: {
            verify: !!0,
            text: _._,
        },
        email: {
            verify: !!0,
            text: _._,
        },
        title: {
            verify: !!0,
            text: _._,
        },
        alternate_email: {
            verify: !!0,
            text: _._,
        },
        phone: {
            verify: !!0,
            text: _._,
        },
        time_zone: {
            verify: !!0,
            text: _._,
        },
    };
    public userData: any = {
        full_name: '',
        first_name: '',
        last_name: '',
        email: '',
        alternate_email: '',
        title: '',
        phone: '',
        display_user_role: '',
        time_zone: '',
        country: '',
        country_code: '',
        flag: '',
    };

    public settingsValidation: any = {
        full_name: [
            this.userData.first_name + ' ' + this.userData.last_name,
            [
                Validators.required,
                ValidationService.fullNameValidator,
                Validators.minLength(3),
            ],
        ],
        title: [
            this.userData.title,
            [
            ],
        ],
        email: [
            this.userData.email,
            [
                Validators.required,
                ValidationService.emailValidator,
                Validators.minLength(6),
            ],
        ],
        alternate_email: [
            this.userData.alternate_email,
            [
                ValidationService.dontRequiredEmailValidator,
            ],
        ],
        phone: [
            this.userData.phone,
            [
                Validators.minLength(6),
            ],
        ],
        time_zone: [
            this.userData.time_zone,
            [
                Validators.required,
            ],
        ],
    };

    /**
     * get user settings errors from server
     * @returns {any}
     */
    public get settingFormErrors(): any {
        return this._settingsFormErrors;
    }

    /**
     * set user settings errors from server
     * @param currentErrors
     */
    public set settingFormErrors(currentErrors: any) {
        if (_.empty(currentErrors)) {
            for (const key in currentErrors) {
                console.log(key);
                if (currentErrors.hasOwnProperty(key) && this._settingsFormErrors.hasOwnProperty(key)) {
                    this._settingsFormErrors[key].verify = !!1;
                    this._settingsFormErrors[key].text = currentErrors[key][0];
                }
            }
        }
    }

    @Input()
    public classError: any = (param: string): boolean => {
        if (!this.settingForm.controls[param].valid && this.settingForm.submitted) {
            return !!1;
        } else if (this._settingsFormErrors[param].verify && this.settingForm.submitted) {
            return !!1;
        } else
            return !!0;
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.settingForm.controls[param].valid && this.settingForm.controls[param].touched;
    }

    @Input()
    public updateUser(): void {
        // this.settingForm.value.time_zone = this.userData.time_zone;
        this.settingForm.controls.time_zone.setValue( this.userData.time_zone);
        console.log(this.settingForm);
        this.settingForm.submitted = !!1;
        this.buildUpdatedData();

        const validForm: boolean = this.settingForm.dirty && this.settingForm.valid;

        if (!this.uploadedFiles.length && (validForm || (this.settingForm.valid && (this.userData.country || this.userData.time_zone)))) {
            this.saveUserProfile();
        } else if (this.uploadedFiles.length && (validForm || (this.settingForm.valid && (this.userData.country || this.userData.time_zone)))) {
            this.saveUserAvatar();
            this.saveUserProfile();
        } else if (!this.settingForm.dirty) {
            this.toastr.info('There is no update to save.', 'Info', this.defaultToastrParams);
        }
    }

    constructor(private usersService: UsersService,
                private route: ActivatedRoute,
                private router: Router,
                private socketService: SocketService,
                private titleService: Title,
                private formBuilder: FormBuilder,
                private userModel: UsersModel,
                private toastr: ToastrService,
                public notificationsService: NotificationsService) {
        usersService.getCountries()
            .then((data: any): void => {
                if (data.success)
                    this.countries = data.data;
            });

        this.logedUser = this.userModel.getLoggedUser();
        this.initialize();
    }

    private initialize(): void {
        this.selectMenu.showLoading = !!1;
        this.settingForm = this.formBuilder.group(this.settingsValidation);
        this.beforeOnInit();
        this.userIndividual();
        this.userTicketsHistory();

        this.usersService.changeUserData.subscribe((users: any): void => {
            this.setUser(users);
        });
    }

    public ngOnInit(): void {
        this.titleService.setTitle('Birddesk: settings');
        this.currentUserTimezone = ((new Date() as any).toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1].split(' (')[0].replace(/[A-Z]+/,'') * 1) / 100;

        // this.currentUserTimezone = +this.currentUserTimezone.split(' ')[1].replace(/\(|\)/g, '');
        this.currentUserTimezone = '(UTC/GMT ' + this.currentUserTimezone + ' hours) CEST';
        console.log(this.currentUserTimezone)
        this.routeSubscribe();
    }

    private routeSubscribe(): void {
        this.route.params.subscribe((): void => {
            this.firstInitialize = !this.firstInitialize;

            if (this.firstInitialize) {
                this.initialize();
                this.ngOnInit();
            }
        });
    }

    private beforeOnInit(): void {
        if (!this.init())
            this.router.navigate([this.previousRoute]);
    }

    private init(): boolean {
        const routeParams: any = this.route.snapshot.params;
        this.previousRoute = GS.lastRoute.last;

        if (!this.previousRoute)
            this.previousRoute = '/tickets';

        if (routeParams.id) {
            this.userId = routeParams.id;
            this.previousTitle = `Back <- ${this.titleService.getTitle()}`;
            this.titleService.setTitle(`Birddesk: Ticket №${routeParams.id}`);

            return !!1;
        }
        return !!0;
    }

    public showSuccess() {
        this.toastr.success('You have successfully change yor profile settings.', 'Success', this.defaultToastrParams);
    }

    public openCloseMenu(menuNames: Array<string>, clickOutside?: boolean, callFunction?: string): void {
        menuNames.forEach((name: string): void => {
            if (callFunction) {
                this[callFunction](name, clickOutside);
            } else if (clickOutside) {
                if (this.selectMenu[name])
                    this.selectMenu[name] = !!0;
            } else
                this.selectMenu[name] = !this.selectMenu[name];
        });
    }

    public uploadUserAvatar(target: HTMLInputElement): void {
        const reader: FileReader = new FileReader();
        this.uploadedFiles = target.files;

        reader.onload = ( (newAvatar: ProgressEvent): void => {
            this.userData.avatar_url = (newAvatar.target as FileReader).result;
        });

        reader.readAsDataURL(this.uploadedFiles[0]);
    }

    public saveUserAvatar(): any {
        const reader: FileReader = new FileReader();

        reader.onload = ( (newAvatar: ProgressEvent): void => {
            const formData = new FormData();
            formData.append('avatar', this.uploadedFiles[0]);

            this.usersService.updateAvatar(formData, this.individualUser.id)
                .then((data: any): void => {
                    if (data.success) {
                        this.userAvatar.url = (newAvatar.target as FileReader).result;
                        this.userAvatar.file = this.uploadedFiles[0];
                        this.uploadedFiles = [];
                    }
                    this.userAvatar.updated = !!1;
                    this.socketService.updateUsers(this.userData);
                });
        });

        reader.readAsDataURL(this.uploadedFiles[0]);
    }

    public saveUserProfile(): void {
        this.settingForm.value.country_code = this.userData.country_code;
        this.settingForm.value.flag = this.userData.flag;
        this.settingForm.value.country = this.userData.country;
        this.settingForm.value.time_zone = this.userData.time_zone;
        delete this.settingForm.value.full_name;
        this.settingForm.value.first_name = this.userData.first_name.trim();
        this.settingForm.value.last_name = this.userData.last_name.trim();
        this.cloud.effect = 'userUpdateSpin';

        this.usersService.updateUser(this.settingForm.value, this.userData.id)
            .then((data: any): void => {
                if (!data.success) {
                    console.log(data.errors);
                    this.settingFormErrors = data.errors;
                } else {
                    this.settingForm.submitted = !!0;
                    if (this.settingForm.value.id === this.userModel.getLoggedUserId()) {
                        this.userModel.updateUserData(this.settingForm.value.id, this.settingForm.value);
                    }
                    this.socketService.updateUsers(this.userData);
                    this.showSuccess();
                }
                this.cloud.effect = 'userUpdateSpin';
            });
    }

    public openPopupDelete() {
        this.selectMenu.areYouSure = !!1;
    }

    public openResetPopup() {
        this.selectMenu.resetPassword = !!1;
    }

    /**
     * split full name to first and last
     */
    public buildUpdatedData(): void {
        let newData: any,
            userFullName: Array<string>;

        newData = (Object as any).assign({}, this.settingForm.value);

        if (newData.full_name) {
            userFullName = newData.full_name.trim().split(' ');

            if (userFullName[0])
                newData.first_name = userFullName[0];

            if (userFullName[1])
                newData.last_name = userFullName[userFullName.length - 1];
        }

        Object.keys(this.userData).forEach((index: string): void => {
            if (!newData[index]) {
                newData[index] = this.userData[index];
            }
        });

        if (this.userAvatar.updated)
            newData.avatar = this.userAvatar.file;

        this.userData = newData;
    }

    public changeTimezone(timezone: any): void {
        this.currentUserTimezone = timezone;
        this.userData.time_zone = timezone;
    }

    public onlyNumber(event: KeyboardEvent): void {
        if (!+event.key && event.key !== '0') {
            event.preventDefault();
        }
    }

    public userIndividual(): void {
        this.usersService.getUserById(this.userId)
            .then((data: any): void => {
                if (data.success) {
                    this.selectMenu.showLoading = !!0;
                    this.setUser(data.data);
                }
            });
    }

    public setUser(user: any): void {
        console.log('fdsf')
        this.individualUser = user;
        this.userData = this.individualUser;

        if (!this.userData.alternate_email) {
            this.userData.alternate_email = '';
        }

        if (this.userData.time_zone) {
            this.currentUserTimezone = this.userData.time_zone;
        }else{
            this.userData.time_zone = this.currentUserTimezone;
        }
        this.userData.full_name = this.userData.first_name + ' ' + this.userData.last_name;
    }

    public userTicketsHistory(): void {
        this.usersService.getTicketsByUserId(this.userId)
            .then((data: any): void => {
                if (data.success) {
                    this.allAssignedTickets = data.data;
                }
            });
    }

    public changeStyles(): void {
        this.openClosed = !!0;
        this.openClosedtab1 = !!0;
        this.changeColor.inactive = !!0;
        this.changeColor.active = !!1;
    }

    public sortByStatus(name: string): void {
        this.openClosed = !!1;
        this.openClosedtab1 = !!1;
        this.changeColor.inactive = !!1;
        this.changeColor.active = !!0;
        this.sortOpenClosed('closed');
    }

    public sortOpenClosed(name: any): void {
        if (name === 'open') {
            this.ticketsFiltered = [];
            this.allAssignedTickets.forEach((ticket: any): void => {
                if (ticket.status === name) {
                    this.ticketsFiltered.push(ticket);
                }
            });
            this.sorted.opened = !!1;
            this.sorted.close = !!0;
            this.changeColor.activeHistory = !!1;
            this.changeColor.inactiveHistory = !!0;
        } else {
            this.ticketsFiltered = [];
            this.allAssignedTickets.forEach((ticket: any): void => {
                if (ticket.status === name) {
                    this.ticketsFiltered.push(ticket);
                }
            });
            this.sorted.opened = !!0;
            this.sorted.close = !!1;
            this.changeColor.activeHistory = !!0;
            this.changeColor.inactiveHistory = !!1;
        }
    }

    public redirectToTicketPage(event: any, id: number, ticket?: any): void {
        const clickablePlace: boolean = !!(event.target.closest('td.clickable-ticket'));

        // if (ticket && ticket.opened_count === 0)
        //     this.notificationsService.setViewed(id);

        if (clickablePlace)
            this.router.navigate(['/ticket', id]);
    }

    public selectCountry(idx: number): void {
        this.userData.country = this.countries[idx].nicename;
        this.userData.country_code = '+' + this.countries[idx].phonecode;
        this.userData.flag = this.countries[idx].img;
    }
}
