import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Paciente } from '../../model/paciente';
import { Especialista } from '../../model/especialista';
import { UbigeoService } from '../../services/ubigeo.service';
import { Ubigeo } from '../../model/ubigeo';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  nombres: string = '';
  apellidos: string = '';
  correo_electronico: string = '';
  contrasena: string = '';
  telefono: string = '';
  dni: string = '';
  rol: string = '';  // 'P' o 'E'
  fecha_nac: string = '';
  sexo: string = '';

  // Campos específicos de Especialista
  especialidad: string = '';
  nro_colegiado!: number; // Operador ! para indicar que será inicializado más tarde.
  direccion_consultorio: string = '';

  // Campos específicos de Paciente
  ciclo: number = 1;
  facultad: string = '';
  carrera: string = '';

  // Campos específicos para Ubigeo
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];
  ubigeos: Ubigeo[] = [];
  selectedDepartamento: string = '';
  selectedProvincia: string = '';
  selectedDistrito: string = '';
  selectedUbigeoId: number = 0;

  // Campos específicos para la alerta generalizada 
  alertMessage: string | null = null;
  alertType: string | null = null;

  isSwapped = false;
  showModal = false;
  dataRequired = false;
  especialista = false;
  showSuccessAlert = false;
  showFailureAlert = false;
  showIncompleteFields = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router, private usuarioService: UsuarioService,
    private ubigeoService: UbigeoService, private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.ubigeoService.getUbigeoAll().subscribe((data: Ubigeo[]) => {
      this.ubigeos = data;
      this.departamentos = [...new Set(data.map((item: Ubigeo) => item.departamento))];
    });
  }

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
        this.openAlert('Completar los campos.', 'alert-warning');
        return;
      }

      this.especialista = (this.rol === 'E');

      this.showModal = true;

    } else {  // Login
      if (!this.correo_electronico || !this.contrasena) {
        this.openAlert('Completar los campos.', 'alert-warning');
        return;
      }

      this.usuarioService.login(this.correo_electronico, this.contrasena).subscribe(
        response => {
          this.router.navigate(['/main']);
          setTimeout(() => {
            this.alertService.showAlert('Inicio de sesión exitoso. ¡Bienvenido!', 'alert-success');
          }, 500);
        },
        error => {
          this.openAlert('Usuario no encontrado!.', 'alert-danger');
        }
      );

    }
  }

  onSubmitModal() {
    const handleSuccessfulRegistration = () => {
      this.usuarioService.login(this.correo_electronico, this.contrasena).subscribe(
        response => {
          console.log('Login success:', response);
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 300);
        },
        error => {
          console.error('Login failed:', error);
        }
      );

    };

    if (this.rol === 'P') {
      const paciente: Paciente = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        correo_electronico: this.correo_electronico,
        contrasena: this.contrasena,
        rol: "P",
        es_paciente: true,
        telefono: this.telefono,
        dni: this.dni,
        fecha_nac: this.fecha_nac,
        sexo: this.sexo,
        ciclo: this.ciclo,
        facultad: this.facultad,
        carrera: this.carrera,
        id_ubigeo: this.selectedUbigeoId,
      };

      // Verificar campos vacíos o nulos
      if (!paciente.nombres || !paciente.apellidos || !paciente.telefono || !paciente.fecha_nac || !paciente.sexo ||
        !paciente.ciclo || !paciente.facultad || !paciente.carrera || paciente.id_ubigeo === 0) {
        this.openAlert('Completar los campos.', 'alert-warning');
        return;
      }

      this.usuarioService.addPaciente(paciente).subscribe(
        response => {
          setTimeout(() => {
            this.alertService.showAlert('¡Registro exitoso! Bienvenido a nuestra plataforma.', 'alert-success');
          }, 800);
          handleSuccessfulRegistration(); // Llamar al manejo de inicio de sesión
        },
        error => {
          this.openAlert('Lo sentimos, ocurrió un error al intentar registrar tu cuenta. Por favor, inténtalo de nuevo más tarde.', 'alert-danger');
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
        dni: this.dni,
        fecha_nac: this.fecha_nac,
        sexo: this.sexo,
        especialidad: this.especialidad,
        nro_colegiado: this.nro_colegiado,
        direccion_consultorio: this.direccion_consultorio,
        id_ubigeo: this.selectedUbigeoId,
      };

      // Verificar campos vacíos o nulos
      if (!especialista.nombres || !especialista.apellidos || !especialista.telefono || !especialista.fecha_nac ||
        !especialista.sexo || !especialista.especialidad || especialista.nro_colegiado === undefined ||
        !especialista.direccion_consultorio || especialista.id_ubigeo === 0) {
        this.openAlert('Completar los campos.', 'alert-warning');
        return;
      }

      this.usuarioService.addEspecialista(especialista).subscribe(
        response => {
          setTimeout(() => {
            this.alertService.showAlert('¡Registro exitoso! Bienvenido a nuestra plataforma.', 'alert-success');
          }, 800);
          handleSuccessfulRegistration(); // Llamar al manejo de inicio de sesión
        },
        error => {
          this.openAlert('Lo sentimos, ocurrió un error al intentar registrar tu cuenta. Por favor, inténtalo de nuevo más tarde.', 'alert-danger');
        }
      );
      console.log('Datos enviados Especialista:', especialista); // Imprimir datos de paciente
    }
  }

  onDepartamentoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const departamento = target.value;
    this.selectedDepartamento = departamento;
    this.provincias = [...new Set(this.ubigeos.filter(item => item.departamento === departamento).map(item => item.provincia))];
    this.distritos = [];
    this.selectedProvincia = '';
    this.selectedDistrito = '';
    this.selectedUbigeoId = 0;
  }

  onProvinciaChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const provincia = target.value;
    this.selectedProvincia = provincia;
    this.distritos = this.ubigeos.filter(item => item.provincia === provincia).map(item => item.distrito);
    this.selectedDistrito = '';
    this.selectedUbigeoId = 0;
  }

  onDistritoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const distrito = target.value;
    this.selectedDistrito = distrito;
    this.updateUbigeoId();
  }

  updateUbigeoId() {
    const ubigeo = this.ubigeos.find(item =>
      item.departamento === this.selectedDepartamento &&
      item.provincia === this.selectedProvincia &&
      item.distrito === this.selectedDistrito
    );

    this.selectedUbigeoId = ubigeo ? ubigeo.id_ubigeo : 0;
    console.log('id: ', this.selectedUbigeoId)
  }

  closeModal() {
    this.showModal = false;
    // this.limpiarCampos();
  }

  limpiarCampos() {
    // Reiniciar las variables de los campos del modal
    this.nombres = '';
    this.apellidos = '';
    this.fecha_nac = ''; // O la fecha inicial que desees
    this.telefono = '';
    this.dni = '';
    this.sexo = ''; // O el valor por defecto que corresponda
    this.selectedDepartamento = '';
    this.selectedProvincia = '';
    this.selectedDistrito = '';
    this.provincias = [];
    this.distritos = [];

    this.especialidad = '';
    this.nro_colegiado = undefined!;
    this.direccion_consultorio = '';
    this.ciclo = 1;
    this.carrera = '';
    this.facultad = '';
  }

  openAlert(mensaje: string, tipo: string) {
    this.alertMessage = mensaje;
    this.alertType = tipo;

    setTimeout(() => {
      this.closeAlert();
    }, 1800);
  }

  closeAlert() {
    this.alertMessage = null;
    this.alertType = null;
  }


}
