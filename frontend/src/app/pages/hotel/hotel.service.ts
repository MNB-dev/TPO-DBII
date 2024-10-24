import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../../models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private readonly httpClient: HttpClient) { }

  getAll() {
    const url = `${environment.api}hoteles/`;
    console.log(url);
    return this.httpClient.get<Hotel[]>(url);
  }

}
