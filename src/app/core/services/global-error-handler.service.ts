import { Injectable } from '@angular/core';
import { AlertService } from './alert-service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler {
  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService
  ) {}
  public message = '';

  handleError(error: any): void {
    if (error.message) {
      this.message = error.message;
    }
    this.alertService.setAlertHandler('error', this.message);
    this.loaderService.hideLoader();
  }
}
