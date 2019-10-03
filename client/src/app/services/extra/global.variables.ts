export class GlobalVariables {

    public static get BACKEND_DOMAIN(): string {
        return 'https://api.birdtest.nl';
    }

    public static get LOGIN_URL(): string {
        return 'https://login.birdtest.nl';
    }

    public static get BACKEND_API_URL(): string {
        return `${this.BACKEND_DOMAIN}/api`;
    }

    public static get DOMAIN_NAME(): string {
        if ((window as any).production_mode) {
            return 'birdtest.nl';
        }
    }

    public static get localSubDomain(): string {
        return 'pedrospoxos';
    }

    public static get localUrl(): string {
        const port: string = (window as any).location.port;

        return `http://${this.localSubDomain}.localhost:${port}`;
    }

    public static get TICKETS_FILES_UPLOAD_URL(): string {
        return `${this.BACKEND_API_URL}/tickets/upload_file`;
    }
}
