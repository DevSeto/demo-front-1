import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Encryption} from '../../services/helpers/encryption.service';
import {_} from '../../services/helpers/helper.service';
import {GlobalServices} from '../../services/helpers/global.service';
import {ToastrService} from '../../modules/toastr';

@Injectable()
export class ErrorService extends Encryption {

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public errorOfData: any;

    constructor(private toastr: ToastrService) {
        super();
    }

    public handleError: any = (error: HttpErrorResponse): any => {
        console.log('error',error)
        let body: any;
        GlobalServices.processErrorHandlers(error);
        body = error.error;

        if (_.empty(body.errors)) {
            this.errorOfData = body.errors;
        }else if (_.empty(body) && error.status !== 500) {
            // body.errors = Encryption.deCrypt(body.errors);
            this.errorOfData = body;
        }

        this.showError();
        return body || {};
    }

    public showError() {
        if (_.empty(this.errorOfData)) {
            (Object as any).values(this.errorOfData).forEach((text: any): void => {
                this.toastr.error(text, 'Error', this.defaultToastrParams);
            });
        }
    }
}
