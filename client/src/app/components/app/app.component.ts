import { AfterContentInit, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import {UsersModel} from '../../models/components/users.model';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
import {TicketsService} from '../../services/components/tickets.service';
import {filter, map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { UsersPreferencesModel } from '../../models/components/usersPreferences.model';
@Component({
    selector: 'birddesk',
    templateUrl: '../../html/app/app.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class AppComponent  implements AfterContentInit {
    public environment = environment;

    public showedSidebar: string = '';
    public cloud: any = showed;
    public urlparams: string = '';
    public showView: boolean = !!0;
    constructor(private usersModel: UsersModel,
                private route: ActivatedRoute,
                private location: PlatformLocation,
                public userPreferencesModel: UsersPreferencesModel,
                public ticketService: TicketsService,
                public router: Router,
                private host: ElementRef, private renderer: Renderer2
    ) {

        if(typeof require && typeof require != "undefined"){
            if (userPreferencesModel.getStyleKey()){
                (require as any).ensure(['./../../../../../public/scss/main-dark.scss'], (require : any) :void => {
                    (require as any)('./../../../../../public/scss/main-dark.scss');
                });
            }else{
                (require as any).ensure(['./../../../../../public/scss/main.scss'], (require : any) :void => {
                    (require as any)('./../../../../../public/scss/main.scss');
                });
            }
            this.showView = !!1;
        }else{
            var cssId = 'myCss'+userPreferencesModel.getStyleKey();

            if (!document.getElementById(cssId))
            {
                var head  = document.getElementsByTagName('head')[0];
                var link  = document.createElement('link');
                link.id   = cssId;
                link.rel  = 'stylesheet';
                link.type = 'text/css';

                link.href = 'public/css/main'+userPreferencesModel.getStyleKey()+'.css';
                link.media = 'all';
                head.appendChild(link);
                setTimeout(()=>{
                    this.showView = !!1;
                },700)
            }
        }


        location.onPopState(() => {
            this.ticketService.tickets.reset();
            setTimeout((): void => {
                this.ticketService.goBack.emit(!!1);
            }, 100);
        });
       this.urlparams = (<any> window).location.pathname;
       this.subscribeNavigationEnd();
    }
    public ngAfterContentInit() {


    }
    /**
     * For Sidebar and Sidebar Settings, get value from app.routing.module.ts
     */
    private subscribeNavigationEnd(): void {
        const events: any = this.router.events;

        events
            .pipe(filter((e: any): any => e instanceof NavigationEnd))
            .pipe(map((): any => this.route))
            .pipe(map((route: any): any => {
                if (route.firstChild)
                    route = route.firstChild;
                if ((window as any).location.host.search(this.environment.origin) === -1 && (window as any).location.href.search('404') === -1){
                    this.router.navigate(['404']);
                }

                return route;
            }))
            .pipe(filter((route: any): any => route.outlet === 'primary'))
            .pipe(mergeMap((route: any): any => route.data))
            .subscribe((e: any): any => this.showedSidebar = e.sidebar);
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.urlparams = event.url;
                if (!this.urlparams.match('/register') &&  this.usersModel.getNewUser()){
                    console.log(this.urlparams.match('/register'))

                    this.usersModel.deleteNewUser();
                }

            }
        });
    }

    /**
     * check user is logged
     * @returns {boolean}
     */
    public isLogged(): boolean {
        let locationUrl: Array<string>;

        locationUrl = (window as any).location.host.split('.');
        if ((window as any).location.host.search(this.environment.origin) === -1 && (window as any).location.href.search('404') === -1){
            this.router.navigate(['404']);
        }else  if (locationUrl[0] === 'testnew')
            return !!0;
        else
            return this.usersModel.getAuthTokenExpTime();
    }
}
