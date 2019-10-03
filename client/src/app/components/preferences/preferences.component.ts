import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/components/users.service';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from '../../modules/toastr';

@Component({
    selector: 'preferences',
    templateUrl: '../../html/preferences/preferences.component.html',
})

export class PreferencesComponent implements OnInit {

    public preferences: any;
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;
    public cloud: any = showed;
    constructor(private usersService: UsersService,
                private toastr: ToastrService,
                private formBuilder: FormBuilder) {
        this.usersService.getPreferences().then((data: any) => {
            this.preferences = this.formBuilder.group(data.data);
        });
    }

    public ngOnInit(): void {}

    public updateUserPreferences(): void {
        const validData: any = this.boolianToNum(this.preferences.value);
        this.usersService.setPreferences(validData).then((result: any) => {
            this.toastr.success('Successfully updated.', 'Success', this.defaultToastrParams);
        });
    }

    private boolianToNum(data: any): any {
        Object.keys(data).forEach((item: string) => {
            if (typeof data[item] === 'boolean') {
                if (data[item]) {
                    data[item] = 1;
                } else {
                    data[item] = 0;
                }
            }
        });

        return data;
    }
}
