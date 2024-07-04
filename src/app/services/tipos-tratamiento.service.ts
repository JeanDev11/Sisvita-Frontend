import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiposTratamiento } from '../model/tipos-tratamiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposTratamientoService {
  private apiUrl = 'http://127.0.0.1:5000/tipostratamiento';

  constructor(private http: HttpClient) { }

  getAllTipoTratamiento(): Observable<TiposTratamiento[]> {
    return this.http.get<TiposTratamiento[]>(`${this.apiUrl}/getall`);
  }

}
