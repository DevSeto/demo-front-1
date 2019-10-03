import { Component, OnInit } from '@angular/core';
import { ActionGifService } from '../../services/components/action-git.service';
import { AlertService } from '../../services/components/alert.service';

@Component({
  template: `
    <div
      class="action-gif" *ngIf="isShow"
      (animationend)="animationendHandler()"
      >
      <img src="/public/images/gif/bird.gif"/>
    </div>
  `,
  selector: 'action-gif',
})

export class ActionGifComonent implements OnInit{
  isShow = false;

  constructor(
    private actionGifService: ActionGifService,
    private alertService: AlertService,
  ) {
  }

  animationendHandler() {
    this.isShow = false;
  }

  ngOnInit() {
    this.actionGifService.actionEvent.subscribe( () => {
      this.isShow = true;
      this.alertService.actionEvent.emit({type: 'ok', message: 'You closed the ticket'});
    })
  }
}