import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestResultados } from '../model/test-resultados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestResultadosService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  addResultados(testResultados: TestResultados): Observable<any> {
    let endpointUrl = `${this.apiUrl}/test_resultado/insert`;
    let body: any = {};
    body = {
      test_id: testResultados.test_id,
      usuario_id: testResultados.usuario_id,
      puntaje_obtenido: testResultados.puntaje_obtenido,
      descripcion: testResultados.descripcion
    };

    return this.http.post<any>(endpointUrl, body);
  }
}
