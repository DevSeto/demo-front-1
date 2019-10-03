import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const modalsRoutes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild(modalsRoutes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ModalsRoutingModule { }