import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AlertService {
  actionEvent = new EventEmitter<{type: string, message: string}>();
  constructor() {}
}