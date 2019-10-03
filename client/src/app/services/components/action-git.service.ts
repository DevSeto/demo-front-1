import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ActionGifService {
  actionEvent = new EventEmitter();
  constructor() {}
}