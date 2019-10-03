export class CrossdomainLocalstorage {

    public origin: string;
    public path: string;
    public storage: string;

    private _origin: string;
    private _path: string;
    private _iframe: any = null;
    private _iframeReady: boolean = !!0;
    private _queue: Array<any> = [];
    private _requests: any = {};
    private _id: number = 0;

    constructor(opts: any) {
        this.origin = opts.origin || '';
        this.path = opts.path || '';
        this.storage = opts.storage || 'localStorage';
        this._origin = this.origin;
        this._path = this.path;
    }

    private init(): void {
        if (!this._iframe && this.supported) {
            this._iframe = (document.createElement('iframe')) as HTMLIFrameElement;
            this._iframe.style.cssText = 'position:absolute; width:1px; height:1px; left:-9999px;';

            document.body.appendChild(this._iframe);

            if ((window as any).addEventListener) {
                this._iframe.addEventListener('load', (): void => this._iframeLoaded(), !!0);
                (window as any).addEventListener('message', (event: any): void => this._handleMessage(event), !!0);
            } else if (this._iframe.attachEvent) {
                this._iframe.attachEvent('onload', function() {
                    this._iframeLoaded();
                }, !!0);
                (window as any).attachEvent('onmessage', (event: any): void => this._handleMessage(event));
            }

            this._iframe.src = this._origin + this._path;
        }
    }

    private supported(): boolean {
        try {
            return (window as any).JSON && this.storage in window && window[this.storage] !== null;
        } catch (e) {
            return !!0;
        }
    }

    private _sendRequest(data: any): void {
        if (this._iframe) {
            this._requests[data.request.id] = data;
            this._iframe.contentWindow.postMessage(JSON.stringify(data.request), this._origin);
        }
    }

    private _iframeLoaded(): void {
        this._iframeReady = !!1;

        if (this._queue.length) {
            for (let i = 0, len = this._queue.length; i < len; i++)
                this._sendRequest(this._queue[i]);

            this._queue = [];
        }
    }

    private _handleMessage(event: any): void {
        let data: any;
        if (event.origin === this._origin) {
            data = JSON.parse(event.data);

            if (typeof this._requests[data.id] !== 'undefined') {
                if (typeof this._requests[data.id].deferred !== 'undefined')
                    this._requests[data.id].deferred.resolve(data.value);

                if (typeof this._requests[data.id].callback === 'function')
                    this._requests[data.id].callback(data.key, data.value);

                delete this._requests[data.id];
            }
        }
    }

    public get(key: string, callback: void): Promise<any> {
        let request: any,
            data: any;

        this.init();

        if (this.supported()) {
            request = {
                id: ++this._id,
                type: 'get',
                key,
                storage: this.storage,
            };

            data = {
                request,
                callback,
            };

            if ((window as any).jQuery)
                data.deferred = jQuery.Deferred();

            if (this._iframeReady)
                this._sendRequest(data);
            else
                this._queue.push(data);

            if ((window as any).jQuery)
                return data.deferred.promise();
        }
    }

    public set(key: string, value: any): Promise<any> {
        let request: any,
            data: any;

        this.init();

        if (this.supported()) {
            request = {
                id: ++this._id,
                type: 'set',
                key,
                value,
                storage: this.storage,
            };

            data = {
                request,
            };

            if ((window as any).jQuery)
                data.deferred = jQuery.Deferred();

            if (this._iframeReady)
                this._sendRequest(data);
            else
                this._queue.push(data);

            if ((window as any).jQuery)
                return data.deferred.promise();
        }
    }

    public remove(key: string): Promise<any> {
        let request: any,
            data: any;

        this.init();

        if (this.supported()) {
            request = {
                id: ++this._id,
                type: 'remove',
                key,
                storage: this.storage,
            };

            data = {
                request,
            };

            if ((window as any).jQuery)
                data.deferred = jQuery.Deferred();

            if (this._iframeReady)
                this._sendRequest(data);
            else
                this._queue.push(data);

            if ((window as any).jQuery)
                return data.deferred.promise();
        }
    }
}