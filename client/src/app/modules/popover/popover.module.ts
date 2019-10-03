import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PopoverComponent } from './popover.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  declarations: [
    PopoverComponent,
  ],
  providers: [
  ],
  exports: [
    PopoverComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class PopoverModule { }