import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from '../../services/helpers/validation.service';

@Component({
    selector: 'form-errors',
    template: `<span *ngIf="!!errorMessage">{{errorMessage}}</span>`,
})

export class FormErrors {

    public isSubmited: boolean = !!0;

    @Input()
    public control: any;

    @Input()
    public controlName: string = '';

    @Input()
    public set formSubmit(submitit: any) {
        if (submitit) {
            this.isSubmited = !!1;
        } else {
            this.isSubmited = !!0;
        }
    }

    constructor() {}

    public get errorMessage(): any {
        if (this.isSubmited && this.control) {
            for (const propertyName in this.control.errors) {
                if ((this.control.errors.hasOwnProperty(propertyName) && this.control.touched) ||
                    this.control.parent.submitted
                ){
                    return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName], this.controlName);
                }
            }
        }

        return null;
    }
}