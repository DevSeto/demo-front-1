import {CookieOptionsArgs} from '../../interfaces/cookie/cookie.options.interface';

export class CookieOptions {

    public path: string;
    public domain: string;
    public expires: string|Date;
    public secure: boolean;

    constructor({path, domain, expires, secure}: CookieOptionsArgs = {}) {
        this.path = this.isPresent(path) ? path : null;
        this.domain = this.isPresent(domain) ? domain : null;
        this.expires = this.isPresent(expires) ? expires : null;
        this.secure = this.isPresent(secure) ? secure : !!0;
    }

    public merge(options?: CookieOptionsArgs): CookieOptions {
        return new CookieOptions({
            path: this.isPresent(options) && this.isPresent(options.path) ? options.path : this.path,
            domain: this.isPresent(options) && this.isPresent(options.domain) ? options.domain : this.domain,
            expires: this.isPresent(options) && this.isPresent(options.expires) ? options.expires : this.expires,
            secure: this.isPresent(options) && this.isPresent(options.secure) ? options.secure : this.secure,
        } as CookieOptionsArgs);
    }

    private isPresent: (options?: CookieOptionsArgs|string|Date|boolean) => boolean = (obj: any): boolean => obj !== undefined && obj !== null;
}