import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestAnsiedadService {
  private apiUrl = 'http://127.0.0.1:5000/test_preguntas';

  constructor(private http: HttpClient) {}

  // Método para obtener todas las preguntas del test
  getPreguntas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar`);
  }
}