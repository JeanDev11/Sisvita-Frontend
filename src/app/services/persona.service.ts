import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../interfaces/persona';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    // Inicializar el sujeto de comportamiento con null
    this.currentUserSubject = new BehaviorSubject<any>(null);
  }

  private apiUrl = 'http://127.0.0.1:5000/personas';

  addPersona(nombre: string, apellido: string, email: string, password: string, telefono: string, direccion: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insert`, { nombre, apellido, email, password, telefono, direccion });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        // Almacenar los datos del usuario en el sujeto de comportamiento
        this.currentUserSubject.next(user);
      })
    );
  }

}
