import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  noticeSub = new BehaviorSubject<any>({
    type: '',
    message: '',

  });
  constructor() { }
  setAlertHandler(type: string, message: string) {
    this.noticeSub.next({
      type,
      message,

    });
  }
}
