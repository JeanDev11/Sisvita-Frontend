import { Injectable } from '@angular/core';
import { Especialista } from '../model/especialista';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getEspecialista(usuario_id: number): Observable<Especialista> {
    return this.http.get<Especialista>(`${this.apiUrl}/especialista/${usuario_id}`);
  }
}
