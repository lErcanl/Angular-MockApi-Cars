import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CarService } from 'src/app/core/http/car/car.service';
import { UtilsService } from 'src/app/core/http/utils/utils.service';
import { AlertService } from 'src/app/core/services/alert-service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, CurrencyMaskModule],
})
export class EditComponent {
  editForm!: FormGroup;
  submitted: boolean = false;
  id!: number;
  colors: any = [];
  initialData: any;
  hasChange: boolean = false;
  hpValueRangeValidation: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.loaderService.showLoader();
    //get colors
    this.utilsService
      .getColors()
      .pipe(untilDestroyed(this))
      .subscribe((colorData) => {
        this.colors = colorData;
        //get car data and set them as form values
        this.carService
          .getCar(this.id)
          .pipe(untilDestroyed(this))
          .subscribe((data) => {
            this.loaderService.hideLoader();
            this.initialData = data;
            this.editForm = this.fb.group({
              id: [data.id],
              car_id: [data.car_id],
              instock: [data.instock, Validators.required],
              hp: [data.hp, Validators.required],
              price: [data.price, Validators.required],
              color: [data.color, Validators.required],
            });
            this.onCreateGroupFormValueChange();
          });
      });
  }

  get editFormControl() {
    return this.editForm?.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid && this.hasChange && this.hpValueRangeValidation) {
      this.loaderService.showLoader();
      this.carService
        .updateCar(this.id, this.editForm.value)
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          this.alertService.setAlertHandler(
            'success',
            'Data Successfully Saved'
          );
          this.loaderService.hideLoader();
          this.router.navigate(['/car/list']);
        });
    }
  }

  onCreateGroupFormValueChange() {
    //checking hpValue and form values are changed
    const initialValue = this.initialData;

    this.editForm.valueChanges.subscribe((value) => {
      if (value.hp > 550 || value.hp < 100) {
        this.hpValueRangeValidation = false;
      } else {
        this.hpValueRangeValidation = true;
      }
      console.log(this.hpValueRangeValidation);

      this.hasChange = Object.keys(initialValue).some((key) => {
        return this.editForm.value[key] != initialValue[key];
      });
    });
  }

  back() {
    this.router.navigate(['/car/list']);
  }
}
