import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const sidebarRoutes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild(sidebarRoutes),
    ],
    exports: [
        RouterModule,
    ],
})
export class SidebarRoutingModule { }
