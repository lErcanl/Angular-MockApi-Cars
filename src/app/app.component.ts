import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AlertService } from './core/services/alert-service';
import { LoaderService } from './core/services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private notifier: NotifierService;
  public notifierIsActive: boolean = false;

  constructor(
    notifierService: NotifierService,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private spinner: NgxSpinnerService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    //control spinner and the alert by subscribing them into app.ts file

    this.loaderService.loaderSubject.subscribe((data: boolean) => {
      data ? this.spinner.show() : this.spinner.hide();
    });

    this.alertService.noticeSub.subscribe(
      (data: { type: string; message: string }) => {
        this.notifier.notify(data.type, data.message);
      }
    );
  }
}
