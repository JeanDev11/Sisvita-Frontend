import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiposDiagnostico } from '../model/tipos-diagnostico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposDiagnosticoService {
  private apiUrl = 'http://127.0.0.1:5002/tiposdiagnostico';

  constructor(private http: HttpClient) { }

  getAllTipoDiagnostico(): Observable<TiposDiagnostico[]> {
    return this.http.get<TiposDiagnostico[]>(`${this.apiUrl}/getall`);
  }

}
