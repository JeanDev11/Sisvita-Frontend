import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelTestService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  obtenerNivel(puntaje: number, test_id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/nivel_test/obtener_nivel`, { puntaje, test_id });
  }

}
