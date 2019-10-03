import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../services/components/users.service';
import {GlobalServices} from '../../services/helpers/global.service';
import {ValidationService} from '../../services/helpers/validation.service';
import {UsersModel} from '../../models/components/users.model';
import {ReCaptchaComponent} from '../captcha/captcha.component';
import {_} from '../../services/helpers/helper.service';
import {MailBoxModel} from '../../models/components/mailbox.model';
import {User} from '../../dto';
import {IntegrationService} from '../../services/integration/integration.service';
import {ToastrService} from '../../modules/toastr/toastr/toastr-service';

@Component({
    selector: 'user-reg',
    templateUrl: '../../html/register/register.component.html',
})

export class RegisterComponent implements OnInit {

    private formKeysByStep: Array<any> = [
        [
            'email',
        ],
        [
            'first_name',
            'last_name',
            'company_url',
            'company_name',
            'password',
        ]
    ];

    private checkStepValidation( step : number): boolean{
        console.log(this.formKeysByStep[step-1])
        step = step - 2;
        if(this.formKeysByStep[step]){

            do {
                for(let i: number = 0; i < this.formKeysByStep[step].length; ++i){
                    console.log(this.usersService.stepsData[this.formKeysByStep[step][i]])
                    if(!this.usersService.stepsData[this.formKeysByStep[step][i]] || !this.usersService.stepsData[this.formKeysByStep[step][i]].trim()){
                        return !!0
                    }
                }
                step--
            } while (this.formKeysByStep[step]);

        }
        return !!1;
    }
    public steps: Array<number> = [1,2,3];
    public tabControll: number = 1;
    public routeSubscribe: any ;
    public defoultTrue: boolean = !!0;
    constructor(private router: Router,
                private usersService: UsersService,
                private titleService: Title,
                private route: ActivatedRoute,
                private mailboxModel: MailBoxModel,
                private formBuilder: FormBuilder,
                private userModel: UsersModel,
                private user: User,
                private integrationService: IntegrationService,
                private toastr: ToastrService,
                private cdRef: ChangeDetectorRef,
    ) {

        const routeParams: any = this.route.snapshot.params;
        this.tabControll = 0;
        if (routeParams.id && routeParams.id <= 3 && this.userModel.getNewUser() && routeParams.id > 1){
            this.tabControll = routeParams.id;
            this.usersService.stepsData = this.userModel.getNewUser().user;
            if(!this.checkStepValidation(routeParams.id)){
                this.router.navigate(['register', 1]);
            }else{
                this. tabControll = this.userModel.getNewUser().steps;
            }

        }else{
            this.router.navigate(['register', 1]);
        }
        this.subSubscribe();
    }
    public ngOnDestroy(): void {
        this.routeSubscribe.unsubscribe();
    }

    public subSubscribe(): void {
        this.routeSubscribe = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                if (this.tabControll !== (this.route.params as any).value.id && (this.route.params as any).value.id) {
                    this.tabControll = (this.route.params as any).value.id;
                }
            }
        });
    }
    public ngOnInit(): void {
        this.titleService.setTitle('Birddesk: Register');
    }
    public changeStep(step: number): void {
        const currentStep: number =  this.userModel.getNewUser().steps;
        if (step <= currentStep){
            this.tabControll = step;
        }
    }
    public goBack(): void {
        this.tabControll =  this.tabControll - 1;
        if (this.tabControll < 1){
            this.router.navigate(['get-started']);
        }else{
            this.router.navigate(['register', this.tabControll]);
        }
    }

}
