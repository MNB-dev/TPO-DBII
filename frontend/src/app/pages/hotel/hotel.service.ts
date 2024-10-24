import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../../models/Hotel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = `${environment.api}hoteles/`; 

  constructor(private readonly httpClient: HttpClient) { }

  // Obtener todos los hoteles
  getAll(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(this.apiUrl);
  }

  // Obtener un hotel por ID
  getById(id: string): Observable<Hotel> {
    return this.httpClient.get<Hotel>(`${this.apiUrl}${id}`);
  }

  // Crear un nuevo hotel
  create(hotel: Hotel): Observable<Hotel> {
    return this.httpClient.post<Hotel>(this.apiUrl, hotel);
  }

  // Actualizar un hotel
  update(id: string, hotel: Hotel): Observable<Hotel> {
    return this.httpClient.put<Hotel>(`${this.apiUrl}${id}`, hotel);
  }

  // Eliminar un hotel
  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}${id}`);
  }

}
