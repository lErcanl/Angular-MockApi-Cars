import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderSubject = new BehaviorSubject(false);
  loading: any;
  constructor() {}

  showLoader() {
    this.loading = setTimeout(() => {
      this.loaderSubject.next(true);
    }, 100);
  }

  hideLoader() {
    clearTimeout(this.loading);
    this.loaderSubject.next(false);
  }
}
