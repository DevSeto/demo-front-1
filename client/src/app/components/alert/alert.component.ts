import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../services/components/alert.service';

@Component({
  selector: 'alert',
  template: `
  <div
    class="alert" [ngClass]="type"
    *ngIf="isShow"
    (animationend)="animationendHandler()"
    >
    <img class="alert__img" src="/public/images/ico/ok.svg" alt="OK">
    <span class="alert__text"> {{message}} </span>
  </div>
  `,
})

export class AlertComponent implements OnInit{
  @Input() type: string;
  @Input() message: string;
  public isShow = false;

  constructor(
    private alertServic: AlertService
  ) {

  }

  ngOnInit() {
    this.alertServic.actionEvent.subscribe(
      (params: {type: string, message: string}) => {
        this.isShow = true;
        this.message = params.message;
        this.type = params.type;
      }
    );
  }

  animationendHandler() {
    this.isShow = false;
  }
}