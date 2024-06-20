import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../model/paciente';
import { Especialista } from '../model/especialista';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    let currentUser = null;
    if (typeof window !== 'undefined' && localStorage.getItem('currentUser')) {
      currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    }
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private apiUrl = 'http://127.0.0.1:5000/usuarios';

  addEspecialista(especialista: Especialista): Observable<any> {
    let endpointUrl = `${this.apiUrl}/insert`;
    let body: any = {};
    body = {
      nombres: especialista.nombres,
      apellidos: especialista.apellidos,
      correo_electronico: especialista.correo_electronico,
      contrasena: especialista.contrasena,
      rol: especialista.rol,
      es_paciente: especialista.es_paciente,
      telefono: especialista.telefono,
      fecha_nac: especialista.fecha_nac,
      sexo: especialista.sexo,
      especialidad: especialista.especialidad,
      nro_colegiado: especialista.nro_colegiado,
      direccion_consultorio: especialista.direccion_consultorio
    };

    return this.http.post<any>(endpointUrl, body);
  }

  addPaciente(paciente: Paciente): Observable<any> {
    let endpointUrl = `${this.apiUrl}/insert`;
    let body: any = {};
    body = {
      nombres: paciente.nombres,
      apellidos: paciente.apellidos,
      correo_electronico: paciente.correo_electronico,
      contrasena: paciente.contrasena,
      rol: paciente.rol,
      es_paciente: paciente.es_paciente,
      telefono: paciente.telefono,
      fecha_nac: paciente.fecha_nac,
      sexo: paciente.sexo,
      ciclo: paciente.ciclo,
      facultad: paciente.facultad,
      carrera: paciente.carrera
    };

    return this.http.post<any>(endpointUrl, body);
  }

  login(correo_electronico: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo_electronico, contrasena }).pipe(
      tap(response => {
        if (response && response.data && response.data.token) {
          if (typeof window !== 'undefined') {
            // Guarda el token en el almacenamiento local
            localStorage.setItem('currentUser', JSON.stringify(response.data));
          }
          this.currentUserSubject.next(response.data);
        }
      })
    );
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      // Elimina el token y resetea el estado del usuario
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
}
