import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariables} from '../extra/global.variables';
import {UsersModel} from '../../models/components/users.model';
import {GlobalServices} from '../helpers/global.service';
import {AllUsers, ActiveUsers, User, UserModel} from '../../dto';
import {UserDtoInterface} from '../../modules/dto/user/interfaces/user-dto.interface';
import {CompanyInterface} from '../../modules/dto/company/interfaces/company.interface';
import {Company} from '../../modules/dto/company/dto/company.dto';
import {UsersPreferencesModel} from '../../models/components/usersPreferences.model';
import {UserDtoModule} from '../../modules/dto/user/user-dto.module';

@Injectable()
export class UsersService {

    public stepsData: any = {
        full_name: '',
        password: '',
        email: '',
        company_url: '',
        mailbox_email: '',
        demo_mailbox_name: '',
        mailbox_name: '',
        mailbox_forwarding: 'yundt_lonny@kerluke.me',
        company_name: '',
        first_name: '',
        last_name: '',
    };
    public defoultimgUrl = '../../../../../public/images/user-default-img.png';

    private usersRegisterUrl: string = GlobalVariables.BACKEND_API_URL + '/reg-step-final';
    // private usersRegisterUrl: string = GlobalVariables.BACKEND_API_URL + '/register';
    private getsubdomain: string = GlobalVariables.BACKEND_API_URL + '/get-subdomain/';
    private stepUrl: string = GlobalVariables.BACKEND_API_URL + '/reg-step';
    private agentRegisterUrl: string = GlobalVariables.BACKEND_API_URL + '/agent-login';
    private sendEmailUrl: string = GlobalVariables.BACKEND_API_URL + '/forget_password/confirm_email';
    private findProfileLink: string = GlobalVariables.BACKEND_API_URL + '/get-workspace/';
    private forgetPasswordUrl: string = GlobalVariables.BACKEND_API_URL + '/forget_password/new_password';
    private checkTokenUrl: string = GlobalVariables.BACKEND_API_URL + '/forget_password/check_token';
    private usersLoginUrl: string = GlobalVariables.BACKEND_API_URL + '/login';
    private usersNotificatiUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/user/profile/notifications';
    private usersProfileUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/user/profile';
    private usersSettingsProfileUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/company/users';
    private usersUserData: string = GlobalVariables.BACKEND_API_URL + '/user';
    private usersAvatarUrl: string = this.usersProfileUrl + '/avatar';
    private usersUpdateToken: string = GlobalVariables.BACKEND_API_URL + '/update_token';
    private usersSettingsUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/';
    private resetPasswordUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/user/reset_password';
    private companySettingsUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/company/settings';
    private preferencesUrl: string = GlobalVariables.BACKEND_API_URL + '/settings/user/preferences';

    public compnayName: string = '';
    private authorization: boolean = !!0;
    public invitedUsersFormValue: any;
    public userParams: any = {
        active: 'active',
    };

    constructor(private http: HttpClient,
                private userModel: UsersModel,
                public user: User,
                public company: Company,
                public activeUsers: ActiveUsers,
                public usersPreferencesModel: UsersPreferencesModel,
                public allUsers: AllUsers) {
    }

    public forBlure: boolean = !!0;
    public userData: EventEmitter<any> = new EventEmitter();
    public usersSortingSatatus: EventEmitter<any> = new EventEmitter<any>();
    public changeUserData: EventEmitter<any> = new EventEmitter<any>();
    public usersAfterInvite: EventEmitter<boolean> = new EventEmitter<boolean>();

    public setUser(user: UserDtoInterface|null): void {
        if (user && user.step && typeof user.step === 'string') {
            user.step = (JSON as any).parse(user.step);
        }

        if (user) {
            (Object as any).keys(user).forEach((key: string, index: number): void => {
                this.user[key] = user[key];
            });
        }
    }
    public setStepData(user: any|null): void {
        if (user.first_name && user.last_name){
            user.full_name = user.first_name + ' ' + user.last_name;
        }
        if (user.subdomain){
            user.company_url = user.subdomain;
        }
        if (user) {
           for (const key in user){
                if (!user[key]){
                    user[key] = '';
                }
                this.stepsData[key] = user[key];
            }
        }
    }

    public setCompany(company: CompanyInterface|null): void {
        if (company) {
            if (!company.logo_full_path || !company.logo_full_path.trim()) {
                company.logo_full_path = this.defoultimgUrl;
            }

            this.compnayName = company.company_name;
            (Object as any).keys(company).forEach((key: string, index: number): void => {
                this.company[key] = company[key];
            });
        }
    }

    public registerUser(registerUser: any): Promise<any> {
        this.authorization = !!1;
        this.userModel.userAuthotization = !!0;

        return this.http.post(this.usersRegisterUrl,
            this.userModel.dataCompile(registerUser),
            {
                observe: 'response',
                responseType: 'json',
            },
        )
            .toPromise()
            .then(this.userModel.extractData)
            .catch(this.userModel.handleError);
    }

    public checkExistCompany(subdomain: string): Promise<any> {

        return this.http.get(this.getsubdomain + subdomain,
            {
                observe: 'response',
                responseType: 'json',
            },
        )
            .toPromise()
            .then(this.userModel.extractData)
            .catch(this.userModel.handleError);
    }

    public saveSteps(userDataa: any, step: number): Promise<any> {

        return this.http.post(
            this.stepUrl + step,
            this.userModel.dataCompile(userDataa),
            {
                observe: 'response',
                responseType: 'json',
            },
        )
            .toPromise()
            .then(this.userModel.extractData)
            .catch(this.userModel.handleError);
    }

    public registerAgent(registerUser: any, hash: string): Promise<any> {
        this.authorization = !!1;

        return this.http.post(
            this.agentRegisterUrl + '/' + hash,
            this.userModel.dataCompile(registerUser),
            {
                observe: 'response',
                responseType: 'json',
            },
        )
            .toPromise()
            .then(this.userModel.extractData)
            .catch(this.userModel.handleError);
    }

    public getPreferences(): Promise<any> {
        return this.http.get(
            this.preferencesUrl,
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.usersPreferencesModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public setPreferences(data: any): Promise<any> {
        return this.http.post(
            this.preferencesUrl,
            this.userModel.dataCompile(data),
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then((res: any) => {
                this.usersPreferencesModel.update(data);
                return this.userModel.dataExtract(res);
            })
            .catch(this.userModel.handleError);
    }

    public getNewAgentData(hash: string): Promise<any> {
        this.authorization = !!1;
        const url: string = GlobalVariables.BACKEND_API_URL + '/agent-login/' + hash;

        return this.http.get(url, GlobalServices.AuthHeader())
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public loginUser(loginUser: any, rememberMe: boolean): Promise<any> {
        this.userModel.isRememberMe = rememberMe;
        this.authorization = !!1;
        this.userModel.userAuthotization = !!0;

        if (rememberMe) {
            loginUser.remember = 1;
        }
        return this.http.post(this.usersLoginUrl, this.userModel.dataCompile(loginUser), {
            observe: 'response',
            responseType: 'json',
        })
            .toPromise()
            .then(this.userModel.extractData)
            .catch(this.userModel.handleError);
    }

    public forgetPassword(passwords: any): Promise<any> {
        const url: string = `${this.forgetPasswordUrl}${window.location.search}`;

        return this.http.post(
            url,
            this.userModel.dataCompile(passwords),
            GlobalServices.AuthHeader(),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public checkToken(): Promise<any> {
        const url: string = `${this.checkTokenUrl}${window.location.search}`;

        return this.http.post(
            url,
            this.userModel.dataCompile({}),
            GlobalServices.AuthHeader(),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public sendLinkToEmail(email: any): Promise<any> {
        return this.http.post(
            this.sendEmailUrl,
            this.userModel.dataCompile(email),
            GlobalServices.AuthHeader(),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }
    public sendFindProfile(email: any): Promise<any> {
        return this.http.get(
            this.findProfileLink + email,
            GlobalServices.AuthHeader(),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public openNotificationAccesses(accesses?: any): Promise<any> {

        return this.http.post(
            this.usersNotificatiUrl,
            this.userModel.dataCompile(accesses),
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public resetUserPassword(updatePassword: any, userId: number): Promise<any> {
        const url: string = `${this.resetPasswordUrl}/${userId}`;

        return this.http.post(
            url,
            this.userModel.dataCompile(updatePassword),
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public updateUser(updateUser: any, userId: number): Promise<any> {
        const url: string = `${this.usersProfileUrl}/${userId}`;

        return this.http.post(
            url,
            this.userModel.dataCompile(updateUser),
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public updateCompany(updateCompany: any): Promise<any> {
        return this.http.put(
            this.companySettingsUrl,
            this.userModel.dataCompile(updateCompany),
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public getUserProfile(userId: number): Promise<any> {
        return this.http.get(this.usersProfileUrl + userId, GlobalServices.AuthHeader())
            .toPromise()
            .then((dat: any) => {});
    }

    public getUserData(): Promise<any> {
        return this.http.get(
            this.usersUserData,
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public getAllUsers(params?: any): Promise<any> {
        let url: string = this.usersSettingsProfileUrl;
        if (params){
            url = url + `?role=${params.active}`;
            if (params.mailbox_id) {
                url += `&mailbox_id=${params.mailbox_id}`;
            }
        }

        return this.http.get(url, GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public getUserById(id: number): Promise<any> {
        const url = this.usersSettingsProfileUrl + '/' + id;

        return this.http.get(url, GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public companySettings(): Promise<any> {
        const url = this.companySettingsUrl;

        return this.http.get(url, GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public getTicketsByUserId(userId: number): Promise<any> {
        const url = this.usersSettingsProfileUrl + '/' + userId + '/tickets';

        return this.http.get(url, GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public addUser(userData: any): Promise<any> {
        const url: string = this.usersSettingsProfileUrl + '/invite';

        return this.http.post(
            url,
            this.userModel.dataCompile(userData),
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public getSettingsUserProfile(): Promise<any> {
        return this.http.get(
            this.usersProfileUrl,
            GlobalServices.AuthHeaderForAvatar(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public updateAvatar(data: any, user_id: any): Promise<any> {
        data.append('user_id', user_id);

        return this.http.post(
            this.usersProfileUrl + '/avatar/' + user_id,
            data,
            GlobalServices.AuthHeaderForAvatar(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public updateCompanyLogo(data: any): Promise<any> {
        return this.http.post(
            this.companySettingsUrl,
            data,
            GlobalServices.AuthHeaderForAvatar(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }

    public deleteAvatar(id: number): Promise<any> {
        const url: string = this.usersAvatarUrl + '/' + id;

        return this.http.delete(url, GlobalServices.AuthHeader())
            .toPromise()
            .then(this.extractData)
            .catch(this.userModel.handleError);
    }

    public updateToken(): Promise<any> {
        let url: string = this.usersUpdateToken;

        url += `
            ?user_id=${this.userModel.getLoggedUserId()}
            &company_url=${this.userModel.getProperty('company_url')}
        `;

        return this.http.get(url, GlobalServices.AuthHeader(this.userModel.getToken()))
            .toPromise()
            .then(this.extractData)
            .catch(this.userModel.handleError);
    }

    public extractData(res: any): any {
        if (this.authorization) {
            this.authorization = !!0;
            return this.userModel.extractData(res);
        } else {
            return this.userModel.extractData(res);
        }
    }

    public changeStep(stepId: any): Promise<any> {
        return this.http.post(
            this.usersSettingsUrl + 'user/profile/step/' + stepId,
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.extractData)
            .catch(this.userModel.handleError);
    }

    public getCountries(): Promise<any> {
        return this.http.get(
            `${GlobalVariables.BACKEND_API_URL}/countries`,
            GlobalServices.AuthHeader(this.userModel.getToken()),
        )
            .toPromise()
            .then(this.userModel.dataExtract)
            .catch(this.userModel.handleError);
    }
}
