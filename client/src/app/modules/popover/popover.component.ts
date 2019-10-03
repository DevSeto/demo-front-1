import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PAGINATION_CONTROL_VALUE_ACCESSOR } from '../pagination/components/pagination.component';
import { LabelsInterface } from '../../interfaces/components/labels.interface';
import { LabelModel } from '../dto/label/models/label.model';

@Component({
  selector: 'popover-dropdown',
  templateUrl: './popover.component.html',
})

export class PopoverComponent implements  OnInit {
  @Input('parentTag')
  public parentTag: any;
  @Input('labels')
  public labels: Array<LabelModel> = [];
  @Input('color')
  public color: Array<LabelModel> = [];
  public currentPosition: any = {
    top: '',
    left: 0,
  }
  constructor(){

  }
  public ngOnInit(): void{
    this.offset(this.parentTag);
   }
  private  offset(el: any): void {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.currentPosition  = { top: rect.top + scrollTop, left: rect.left + scrollLeft - 200};
  }
}