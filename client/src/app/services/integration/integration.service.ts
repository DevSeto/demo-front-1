import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class IntegrationService {
    private backendUrl: string = environment.integration.backendUrl;
    private backendApiUrl: string = `${this.backendUrl}/api`;
    private frontendUrl: string = environment.integration.frontendUrl;
    private user: any;
    private tokenKey: string = 'chat_token';
    private token: string;

    constructor(
        private http: HttpClient,
    ) { }

    public register(request: IRegisterRequest): void {
        // const headers: HttpHeaders = new HttpHeaders();
        // headers.append('content-type', 'application/json');
        // headers.append('accept', 'application/json');
        //
        // this.http.post<IRegisterResponse>(`${this.backendApiUrl}/integration/register`, {
        //     user: request.user,
        // }, {
        //     headers,
        // }).subscribe((response: IRegisterResponse) => {
        //     this.user = request.user;
        //     this.token = response.token;
        //     localStorage.setItem(this.tokenKey, this.token);
        // }, error => {
        //     // console.error(error);
        // });
    }

    public login(request: ILoginRequest): void {
        // const headers: HttpHeaders = new HttpHeaders();
        // headers.append('content-type', 'application/json');
        // headers.append('accept', 'application/json');
        //
        // this.http.post<ILoginResponse>(`${this.backendApiUrl}/integration/login`, {
        //     user: request.user,
        // }, {
        //     headers,
        // }).subscribe((response: ILoginResponse) => {
        //     this.user = request.user;
        //     this.token = response.token;
        //     localStorage.setItem(this.tokenKey, this.token);
        // }, error => {
        //     // console.error(error);
        // });
    }

    public logout(request: ILogoutRequest): void {
        // const headers: HttpHeaders = new HttpHeaders();
        // headers.append('content-type', 'application/json');
        // headers.append('accept', 'application/json');
        //
        // this.http.post<ILogoutResponse>(`${this.backendApiUrl}/integration/logout`, {
        //     user: request.user,
        // }, {
        //     headers,
        // }).subscribe((response: ILogoutResponse) => {
        //     this.user = request.user;
        //     this.token = response.token;
        //     localStorage.setItem(this.tokenKey, this.token);
        // }, error => {
        //     // console.error(error);
        // });
    }

    public getRedirectLink(): string {
        const token: string = localStorage.getItem(this.tokenKey);
        const objectQuery: any = {
            command: 'login',
            token,
            backUrl: location.href,
        };
        const stringQuery: string = Object.keys(objectQuery)
            .map(key => `${key}=${objectQuery[key]}&`).join('');
        const url: string = `${this.frontendUrl}/integration?${stringQuery}`;
        return url;
    }

    public get BackendUrl(): string {
        return this.backendUrl;
    }

    public get FrontendUrl(): string {
        return this.frontendUrl;
    }
}

export interface IRegisterRequest {
    user: any;
}

export interface IRegisterResponse {
    token: string;
}

export interface ILoginRequest {
    user: any;
}

export interface ILoginResponse {
    token: string;
}

export interface ILogoutRequest {
    user: any;
}

export interface ILogoutResponse {
    token: string;
}