import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private baseUrl = 'https://64fc1c0c605a026163ae3021.mockapi.io';
  constructor(private http: HttpClient) {}

  //generate another mock data for colors can't hold colors data as a state,
  //If user refreshes the page in edit page; colors not gonna seen anymore I could add localStorage but it's not going to be a good solution
  //so lets get the data from mockapi...
  getColors(): Observable<any> {
    return this.http.get(this.baseUrl + '/color');
  }
}
