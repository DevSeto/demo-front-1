import {CookieOptionsArgs} from './cookie.options.interface';

export interface CookieInterface {
    get(key: string): string;
    getObject(key: string): object;
    getAll(): object;
    put(key: string, value: string, options?: CookieOptionsArgs): void;
    putObject(key: string, value: object, options?: CookieOptionsArgs): void;
    remove(key: string, options?: CookieOptionsArgs): void;
    removeAll(): void;
}