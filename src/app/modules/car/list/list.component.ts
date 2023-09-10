import { Component } from '@angular/core';
import { CarService } from 'src/app/core/http/car/car.service';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoaderService } from 'src/app/core/services/loader.service';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
})
export class ListComponent {
  public cars: any = [];
  public colors: any = [];
  constructor(
    private carService: CarService,
    private library: FaIconLibrary,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.library.addIconPacks(fas);
    this.loaderService.showLoader();
    this.carService
      .getCars()
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        this.loaderService.hideLoader();
        this.cars = data;
      });
  }

  edit(id: number) {
    this.router.navigate([`/car/edit/${id}`]);
  }
}
