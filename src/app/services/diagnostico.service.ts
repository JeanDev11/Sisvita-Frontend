import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diagnostico } from '../model/diagnostico';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  private apiUrl = 'http://127.0.0.1:5002';

  constructor(private http: HttpClient) { }

  getAllDiagnosticos(): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(`${this.apiUrl}/diagnostico/getall`);
  }

  insertDiagnostico(diagnostico: Diagnostico): Observable<any> {
    return this.http.post(`${this.apiUrl}/diagnostico/insert`, diagnostico);
  }
}
