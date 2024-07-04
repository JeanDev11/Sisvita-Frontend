import { Injectable } from '@angular/core';
import { EvaluacionPaciente } from '../model/evaluacion-paciente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionPacienteService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getAllEvaluacionPacientes(): Observable<EvaluacionPaciente[]> {
    return this.http.get<EvaluacionPaciente[]>(`${this.apiUrl}/evaluacionpaciente/getall`);
  }

  insertEvaluacionPaciente(evaluacionPaciente: EvaluacionPaciente): Observable<any> {
    return this.http.post(`${this.apiUrl}/evaluacionpaciente/insert`, evaluacionPaciente);
  }
}
