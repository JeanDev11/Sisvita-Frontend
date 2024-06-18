import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  userType: string = '';  // 'paciente' o 'especialista'
  isSwapped = false;
  showModal = false;
  dataRequired = false;
  especialista = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router, private personaService: PersonaService) { }

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
    const apellido = "Gomez";
    const telefono = "987654321";
    const direccion = "Calle Principal 111";
    

    if (this.isSwapped) { // Nuevo usuario
      if (!this.email || !this.password || !this.userType) {
        // Mostrar mensaje de error al usuario indicando que los campos son requeridos
        console.error('Todos los campos son requeridos');
        return;
      }

      this.especialista = (this.userType === 'especialista');

      this.showModal = true;
      
      console.log('Registro:');
      console.log('Datos enviados:', { nombre: this.nombre, email: this.email, password: this.password });

      // this.personaService.addPersona(this.nombre, apellido, this.email, this.password, telefono, direccion).subscribe(
      //   response => {
      //     console.log('Registro exitoso');
      //     this.router.navigate(['/main']);
      //   },
      //   error => {
      //     console.error('Registro failed:', error);
      //   }
      // );

    } else {  // Login
      if (!this.email || !this.password) {
        // Mostrar mensaje de error al usuario indicando que los campos son requeridos
        console.error('Todos los campos son requeridos');
        return;
      }
      console.log('Login:');
      console.log('Datos enviados:', { email: this.email, password: this.password });
      this.personaService.login(this.email, this.password).subscribe(
        response => {
          console.log('Login success:', response);
          // Redirigir a la otra ventana
          this.router.navigate(['/main']); 
        },
        error => {
          console.error('Login failed:', error);
          // Muestra un mensaje de error al usuario si es necesario
        }
      );

    }
  }

  closeModal() {
    this.showModal = false;
  }

}
