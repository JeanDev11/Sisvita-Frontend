import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../model/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getAllTest(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/tests`);
  }

  getTest(testId: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/tests/${testId}`);
  }

  getPreguntas(testId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tests/${testId}/preguntas`);
  }

  getAlternativas(preguntaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/preguntas/${preguntaId}/alternativas`);
  }
}
