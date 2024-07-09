import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-cuenta',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './cuenta.component.html',
    styleUrl: './cuenta.component.css'
})
export class CuentaComponent implements OnInit {
    usuario_id: number = 0;
    nombres: string = '';
    apellidos: string = '';
    fecha_nac: string = '';
    telefono: string = '';
    sexo: string = '';
    contrasenaNueva: string = '';
    contrasenaNueva2: string = '';
    contrasenaActual: string = '';

    placeholderNombres: string = '';
    placeholderApellidos: string = '';
    placeholderTelefono: string = '';
    placeholderSexo: string = '';

    constructor(private usuarioService: UsuarioService, private alertService: AlertService) { }

    ngOnInit() {
        this.getIdUsuario();
    }

    getIdUsuario(): void {
        this.usuarioService.currentUser.subscribe(user => {
            if (user) {
                this.usuario_id = user.usuario_id;
                this.cargarDatosUsuario();
            }
        });
    }
    
    cargarDatosUsuario() {
        this.usuarioService.getUsuario(this.usuario_id).subscribe(
            (usuario) => {
                this.placeholderNombres = usuario.nombres;
                this.placeholderApellidos = usuario.apellidos;
                this.fecha_nac = usuario.fecha_nac;
                this.placeholderTelefono = usuario.telefono;
                this.placeholderSexo = usuario.sexo;
            },
            (error) => {
                console.error('Error al obtener los datos del usuario:', error);
                this.alertService.showAlert('Se produjo un error al cargar los datos del usuario. Intente nuevamente.', 'alert-danger');
            }
        );
    }

    guardarCambios() {
        const datosActualizados = {
            nombres: this.nombres || undefined,
            apellidos: this.apellidos || undefined,
            fecha_nac: this.fecha_nac || undefined,
            telefono: this.telefono || undefined,
            sexo: this.sexo || undefined,
            contrasena_nueva: this.contrasenaNueva || undefined,
            contrasena_nueva2: this.contrasenaNueva2 || undefined,
            contrasena_actual: this.contrasenaActual,
        };

        if (this.contrasenaNueva) {
            if (this.contrasenaNueva !== this.contrasenaNueva2) {
                this.alertService.showAlert('Las contraseñas no coinciden.', 'alert-warning');
                return
            }
        }

        console.log(datosActualizados);
        this.usuarioService.updateUsuario(datosActualizados).subscribe(
            response => {
                console.log('Datos actualizados correctamente:', response);
                this.alertService.showAlert('Los datos se han actualizado correctamente.', 'alert-success');
            },
            error => {
                console.error('Error al actualizar los datos del usuario:', error);
                this.alertService.showAlert('Se produjo un error. Intente nuevamente.', 'alert-danger');
            }
        );
    }

    
}
