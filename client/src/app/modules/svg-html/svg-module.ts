import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SvgComponent} from './svg.component';
import {CommonModule} from '@angular/common';
import { IconSVG } from './icon-svg/icon-svg.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SvgComponent,
        IconSVG,
    ],
    providers: [
    ],
    exports: [
        SvgComponent,
        IconSVG,
    ],
})
export class SvgsModule {}