import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tratamiento } from '../model/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private apiUrl = 'http://127.0.0.1:5002';

  constructor(private http: HttpClient) { }

  getAllTratamientos(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/tratamiento/getall`);
  }

  insertTratamiento(tratamiento: Tratamiento): Observable<any> {
    return this.http.post(`${this.apiUrl}/tratamiento/insert`, tratamiento);
  }
}
