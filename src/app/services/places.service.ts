import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService extends ApiService {

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  getPlaces(latitude: number, longitude: number, radius: number): Observable<Place[]> {
    return this.httpClient.get<Place[]>(
      this.url + `get-places.php?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    );
  }
}
