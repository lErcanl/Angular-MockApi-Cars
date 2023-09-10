import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { CarComponent } from './car.component';
import { CarRoutingModule } from './car-routing.module';

@NgModule({
  declarations: [CarComponent],
  imports: [CommonModule, CarRoutingModule, EditComponent, ListComponent],
})
export class CarModule {}
