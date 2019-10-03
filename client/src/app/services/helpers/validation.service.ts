import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {

    constructor() {
    }

    public static password: string;

    public static getValidatorErrorMessage(validatorName: string, validatorValue?: any, fieldName?: string): string {
        const config: any = {
            required: `The ${fieldName} field is required.`,
            invalidfild: `No character is allowed.`,
            invalidEmailAddress: 'Invalid email address.',
            email: 'Invalid email address.',
            invalidWebsite: 'Invalid Website.',
            companyUrl: `The URL couldn't contain only Numbers.`,
            includeSpace: 'You cannot have a space in your password.',
            invalidPassword: 'Invalid password. Password must be at least 6 characters long which contain at least a number.',
            invalidPasswordConfirmation: 'These passwords don\'t match. Try again?',
            minlength: `Minimum ${fieldName} length to at least a value of  ${validatorValue.requiredLength}.`,
            maxlength: `Maximum  ${fieldName} length up to  ${validatorValue.requiredLength}.`,
            invalidFullName: 'Please, write first and last names separately.',
            invalidPhoneNumber: 'Please enter a valid phone number',
            invalidDomain: 'The company domain is required.',
            requiredCustomerName: 'User name is required.',
            emailFieldIsRequired: 'Email field is required',
        };

        return config[validatorName];
    }
    public static isInt(control: any, type: any): any {
        if (control.value  && isNaN(Number(control.value))) {
            return null;
        }
        return {companyUrl: !!1};
    }
    public static dbValidator(control: any, type: any): any {
        const patt = /[!@#$%^&*(),.?":[\]{}/|<>\\=`~'+-]/g;
        if (!control.value  || (control.value && !control.value.match(patt))) {
            return null;
        }
        return {invalidfild: !!1};
    }
    public static emailFieldValidator(control: any): any {
        if (control.value !== '')
            return null;
        else
            return {emailFieldIsRequired: !!1};
    }
    public static emailValidator(control: any, type: any): any {
        if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else
            return {invalidEmailAddress: !!1};
    }

    public static dontRequiredEmailValidator(control: any, type?: any): any {
        if (!control.value.length || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else
            return {invalidEmailAddress: !!1};
    }

    public static dontReqemailValidator(control: any, type: any): any {
        if (control.value.length || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else
            return {invalidEmailAddress: !!1};
    }

    public static webSiteValidator(control: any, type: any): any {
        if (control.value && control.value.match(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)) {
            return null;
        } else
            return {invalidWebsite: !!1};
    }

    public static phoneNubmer(control: any, type: any): any {
        if (control.value.length < 1 || control.value.match(/^\d{12}$/)) {
            return null;
        } else
            return {invalidPhoneNumber: !!1};
    }

    public static passwordValidator(control: any): any {
        ValidationService.password = control.value;

        if (control.value.includes(' ')) {
            return {includeSpace: !!1};
        } else {
            if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/))
                return null;
            else
                return {invalidPassword: !!1};
        }
    }

    public static dontSpace(control: any): any {

        if (control.value.includes(' ')) {
            return {includeSpace: !!1};
        } else {
            return null;
        }
    }

    public static passwordConfirmation(control: any): any {
        if (control.value === ValidationService.password)
            return null;
        else
            return {invalidPasswordConfirmation: !!1};
    }

    public static fullNameValidator(control: any): any {
        let firstname: any,
            lastname: any,
            userFullName: any;

        if (!control.value) {
            return null;
        }

        userFullName = control.value.split(' ');
        userFullName.forEach((value: any, index: number): void => {
            if (!index) {
                firstname = value;
            } else {
                if (!lastname)
                    lastname = '' + value;
            }
        });

        if (!lastname || !firstname) {
            return {invalidFullName: !!1};
        }
    }

    public static customerNameValidator(control: any): any {
        if (control.value !== '')
            return null;
        else
            return {requiredCustomerName: !!1};
    }

    public static domainValidator(control: any): any {
        if (control.value !== '')
            return null;
        else
            return {invalidDomain: !!1};
    }
}
