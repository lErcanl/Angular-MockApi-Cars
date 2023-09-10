import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditCarIn, GetCarOut, GetCarsOut } from './car.interface';
@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseUrl = 'https://64fc1c0c605a026163ae3021.mockapi.io/car';
  constructor(private http: HttpClient) {}

  getCars(): Observable<GetCarsOut> {
    return this.http.get<GetCarsOut>(this.baseUrl);
  }

  getCar(carId: number): Observable<GetCarOut> {
    return this.http.get<GetCarOut>(this.baseUrl + '/' + carId);
  }

  updateCar(carId: number, requestData: EditCarIn): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + carId, requestData);
  }
}
