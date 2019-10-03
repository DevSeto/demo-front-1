import {MainInterface} from './main.interface';

export interface UsersInterface extends MainInterface {

    logoutUser: () => void;
    deleteToken: (data: any) => void ;
    updateToken: any;

    deleteUser(): void;
    saveToken( token: string, time: string, companyUrl: string ): void;
    setAuthTokenExpTime( time: string ): void;
    getAuthTokenExpTime(): boolean;
    updateAuthTokenExpTime( rememberMe?: boolean ): void;
    setLoggedUserId( id: number ): void;
    getLoggedUserId(): number;
    getToken(): string;
    getLoggedUser(): any;
    isLogged(): boolean;
}