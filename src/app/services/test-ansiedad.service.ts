import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestAnsiedadService {
  private apiUrl = 'http://127.0.0.1:5000/test_preguntas';

  constructor(private http: HttpClient) {}

  getPreguntas(testId?: number): Observable<any> {
    let params = new HttpParams();
    if (testId) {
      params = params.set('test_id', testId.toString());
    }
    return this.http.get<any>(`${this.apiUrl}/listar`, { params });
  }
}
