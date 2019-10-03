import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Sidebar} from './components/sidebar';
import {SidebarSettings} from './components/sidebar-settings';
import {SidebarRoutingModule} from './sidebar-routing.module';
import {ApplicationPipesModule} from '../../ApplicationPipesModule.module';
import {GlobalSidebar} from './components/global-sidebar';
import {SvgsModule} from '../svg-html/svg-module';
import {OldSidebar} from './components/old-sidebar';
import {DropdownModule} from '../dropdown/dropdown.module';
// import {NgStringPipesModule} from '../../pipes/string';

@NgModule({
    imports: [
        SidebarRoutingModule,
        CommonModule,
        SvgsModule,
        ApplicationPipesModule,
        DropdownModule,
        // NgStringPipesModule
    ],
    declarations: [
        Sidebar,
        GlobalSidebar,
        OldSidebar,
        SidebarSettings,
    ],
    exports: [
        Sidebar,
        GlobalSidebar,
        OldSidebar,
        SidebarSettings,
        // NgStringPipesModule
    ],
})

export class SidebarModule { }
