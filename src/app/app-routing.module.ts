import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'car',
    pathMatch: 'full',
  },
  {
    path: 'car',
    loadChildren: () =>
      import('./modules/car/car.module').then((m) => m.CarModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
