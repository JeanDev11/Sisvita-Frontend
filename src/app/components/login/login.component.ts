import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Paciente } from '../../model/paciente';
import { Especialista } from '../../model/especialista';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombres: string = '';
  apellidos: string = '';
  correo_electronico: string = '';
  contrasena: string = '';
  telefono: string = '';
  rol: string = '';  // 'P' o 'E'
  fecha_nac: string = '';
  sexo: string = '';

  // Campos específicos de Especialista
  especialidad: string = '';
  nro_colegiado: number = 0;
  direccion_consultorio: string = '';

  // Campos específicos de Paciente
  ciclo: number = 0;
  facultad: string = '';
  carrera: string = '';

  isSwapped = false;
  showModal = false;
  dataRequired = false;
  especialista = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router, private usuarioService: UsuarioService) { }

  swapContainers() {
    this.isSwapped = !this.isSwapped;
    const button1 = this.el.nativeElement.querySelector('#button1');
    const button2 = this.el.nativeElement.querySelector('#button2');
    const infoId = this.el.nativeElement.querySelector('#infoId');
    const formId = this.el.nativeElement.querySelector('#formId');
    const typeUserContainer = this.el.nativeElement.querySelector('#typeUserContainer');

    if (this.isSwapped) { // Form der
      button1.innerText = 'Crear Cuenta';
      button2.innerText = 'Iniciar Sesión';
      // this.renderer.removeClass(divInfo, 'swipeRight-info');
      this.renderer.addClass(formId, 'swipeLeft-form');
      typeUserContainer.hidden = false;
    } else { // Form izq
      button1.innerText = 'Iniciar Sesión';
      button2.innerText = 'Crear Cuenta';
      this.renderer.addClass(infoId, 'swipeRight-info');
      typeUserContainer.hidden = true;
    }
  }

  onSubmit() {
    if (this.isSwapped) { // Nuevo usuario
      if (!this.correo_electronico || !this.contrasena || !this.rol) {
        // Mostrar mensaje de error al usuario indicando que los campos son requeridos
        console.error('Todos los campos son requeridos.');
        return;
      }

      this.especialista = (this.rol === 'E');

      this.showModal = true;

      console.log('Registro:');
    } else {  // Login
      if (!this.correo_electronico || !this.contrasena) {
        // Mostrar mensaje de error al usuario indicando que los campos son requeridos
        console.error('Todos los campos son requeridos');
        return;
      }
      console.log('Login:');
      console.log('Datos enviados:', { email: this.correo_electronico, password: this.contrasena });
      this.usuarioService.login(this.correo_electronico, this.contrasena).subscribe(
        response => {
          console.log('Login success:', response);
          // Redirigir a la otra ventana
          this.router.navigate(['/main']); 
        },
        error => {
          console.error('Login failed:', error);
          // Muestrar un mensaje de error al usuario.
        }
      );

    }
  }

  onSubmitModal(){
    if (this.rol === 'P') {
      const paciente: Paciente = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        correo_electronico: this.correo_electronico,
        contrasena: this.contrasena,
        rol: "P",
        es_paciente: true,
        telefono: this.telefono,
        fecha_nac: this.fecha_nac,
        sexo: this.sexo,
        ciclo: this.ciclo,
        facultad: this.facultad,
        carrera: this.carrera,
      };

      // Verificar campos vacíos o nulos
      if (!paciente.nombres || !paciente.apellidos || !paciente.telefono || !paciente.fecha_nac || !paciente.sexo || 
        !paciente.ciclo || !paciente.facultad || !paciente.carrera) {
        console.error('Todos los campos son requeridos.');
        return;
      }

      console.log('Datos enviados Paciente:', paciente); // Imprimir datos de paciente
      this.usuarioService.addPaciente(paciente).subscribe(
        response => {
          console.log('Registro exitoso P');
          // ** login
          this.usuarioService.login(this.correo_electronico, this.contrasena).subscribe(
            response => {
              console.log('Login success:', response);
              // Redirigir a la otra ventana
              this.router.navigate(['/main']); 
            },
            error => {
              console.error('Login failed:', error);
              // Muestrar un mensaje de error al usuario.
            }
          );
          this.router.navigate(['/main']);
        },
        error => {
          console.error('Registro fallido:', error);
        }
      );
    } else if (this.rol === 'E') {
      const especialista: Especialista = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        correo_electronico: this.correo_electronico,
        contrasena: this.contrasena,
        rol: "E",
        es_paciente: false,
        telefono: this.telefono,
        fecha_nac: this.fecha_nac,
        sexo: this.sexo,
        especialidad: this.especialidad,
        nro_colegiado: this.nro_colegiado,
        direccion_consultorio: this.direccion_consultorio
      };

      // Verificar campos vacíos o nulos
      if (!especialista.nombres || !especialista.apellidos || !especialista.telefono || !especialista.fecha_nac || 
        !especialista.sexo || !especialista.especialidad || !especialista.nro_colegiado || !especialista.direccion_consultorio) {
        console.error('Todos los campos son requeridos.');
        return;
      }

      this.usuarioService.addEspecialista(especialista).subscribe(
        response => {
          console.log('Registro exitoso E');
          // ** login
          this.usuarioService.login(this.correo_electronico, this.contrasena).subscribe(
            response => {
              console.log('Login success:', response);
              // Redirigir a la otra ventana
              this.router.navigate(['/main']); 
            },
            error => {
              console.error('Login failed:', error);
              // Muestrar un mensaje de error al usuario.
            }
          );
          this.router.navigate(['/main']);
        },
        error => {
          console.error('Registro fallido:', error);
        }
      );
      console.log('Datos enviados Especialista:', especialista); // Imprimir datos de paciente
    }
  }

  closeModal() {
    this.showModal = false;
  }

}
