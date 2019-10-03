import {Injectable} from '@angular/core';
import {CannedRepliesInterface} from '../interfaces/canned-replies.interface';
import {CannedRepliesModel} from '../models/canned-replies.model';

type REPLY = Array<any>;

@Injectable()
export class CannedReplies extends Array<any> implements REPLY {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, CannedReplies.prototype);
    }

    public set(cannedReplies: REPLY): void {
        for (const reply in cannedReplies)
            this[reply] = cannedReplies[reply];
    }

    public reset: () => void = (): void => {
        this.splice(0, this.length);
    }
}
