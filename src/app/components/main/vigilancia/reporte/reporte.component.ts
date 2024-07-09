import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestResultadosImport } from '../../../../model/test-resultados';
import { TiposDiagnostico } from '../../../../model/tipos-diagnostico';
import { TiposTratamiento } from '../../../../model/tipos-tratamiento';
import { TestResultadosService } from '../../../../services/test-resultados.service';
import { TiposDiagnosticoService } from '../../../../services/tipos-diagnostico.service';
import { TiposTratamientoService } from '../../../../services/tipos-tratamiento.service';
import { DiagnosticoService } from '../../../../services/diagnostico.service';
import { EvaluacionPacienteService } from '../../../../services/evaluacion-paciente.service';
import { TratamientoService } from '../../../../services/tratamiento.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { EspecialistaService } from '../../../../services/especialista.service';
import { EmailService } from '../../../../services/email.service';
import { AlertService } from '../../../../services/alert.service';
import { Diagnostico } from '../../../../model/diagnostico';
import { Tratamiento } from '../../../../model/tratamiento';
import { EvaluacionPaciente } from '../../../../model/evaluacion-paciente';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit {
  testResultados: TestResultadosImport[] = [];
  filteredResultados: TestResultadosImport[] = [];
  listTT: TiposTratamiento[] = [];
  listTD: TiposDiagnostico[] = [];
  tipoTest: string = 'Todos';
  nivelAnsiedad: string = 'Todos';
  selectedDate: string = '';
  showModal = false;
  isChecked: boolean = false ;
  selectedResultado: TestResultadosImport | null = null;
  especialista_id: number = 0;
  especialista_nombre: string = '';

  selectedDiagnosticoId: number = 0;
  fundamentacionCientifica: string = '';
  selectedTratamientos: { id: number, descripcion: string }[] = [];

  tratamientoSeleccionado: number = 0; // Variable para almacenar el tratamiento seleccionado
  tratamientoDescripcion: string = ''; // Variable para la descripción del tratamiento en el textarea
  comuMensaje: string = ''; // Variable para el mensaje de la comunicación

  // Campos específicos para la alerta generalizada 
  alertMessage: string | null = null;
  alertType: string | null = null;
  
  constructor(private testResultadosService: TestResultadosService, private tiposDiagnosticoService: TiposDiagnosticoService,
    private tiposTratamientoService: TiposTratamientoService, private diagnosticoService: DiagnosticoService,
    private tratamientoService: TratamientoService, private evaluacionPacienteService: EvaluacionPacienteService,
    private usuarioService: UsuarioService, private especialistaService: EspecialistaService, private emailService: EmailService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.loadResultados();
    this.loadTiposTD();
    this.getIdUsuario();
  }

  loadResultados(): void {
    this.testResultadosService.getAllResultados().subscribe(
      (data) => {
        this.testResultados = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error al obtener resultados:', error);
      }
    );
  }

  loadTiposTD(): void {
    this.tiposTratamientoService.getAllTipoTratamiento().subscribe(
      (data) =>{
        this.listTT = data;
      },
      (error) => {
        console.error('Error al obtener tipos de tratamientos:', error);
      }
    )

    this.tiposDiagnosticoService.getAllTipoDiagnostico().subscribe(
      (data) =>{
        this.listTD = data;
      },
      (error) => {
        console.error('Error al obtener tipos de diagnostico:', error);
      }
    )
  }

  applyFilters(): void {
    this.filteredResultados = this.testResultados.filter(result => {
      const matchTipo = this.tipoTest === 'Todos' || result.test__rel?.titulo === this.tipoTest;
      const matchNivel = this.nivelAnsiedad === 'Todos' || result.nivel__rel?.semaforo === this.nivelAnsiedad;
      // Convertir la fecha de resultado al formato 'aaaa-mm-dd' para comparar con this.selectedDate
      const formattedFechaCreacion = result.fecha_creacion ?
        result.fecha_creacion.split(' ')[0].split('-').reverse().join('-') : '';
      const matchDate = this.selectedDate === '' || formattedFechaCreacion === this.selectedDate;
      return matchTipo && matchNivel && matchDate;
    });
  }

  onTipoTestChange(event: any): void {
    this.tipoTest = event.target.value;
    console.log(this.tipoTest)
    this.applyFilters();
  }

  onNivelAnsiedadChange(event: any): void {
    this.nivelAnsiedad = event.target.value;
    console.log(this.nivelAnsiedad)
    this.applyFilters();
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value.split('/').reverse().join('-');
    this.applyFilters();
  }

  // Método para determinar el color de fondo dinámico
  getBackgroundColor(resultado: TestResultadosImport): string {
    if (resultado.nivel__rel?.semaforo) {
      switch (resultado.nivel__rel.semaforo.toLowerCase()) {
        case 'alto':
          return 'red';
        case 'bajo':
          return 'green';
        case 'medio':
          return 'yellow';
        case 'naranja':
          return 'orange';
        default:
          return 'white'; // Color por defecto.
      }
    } else {
      return 'white'; // Manejar caso cuando no hay valor en resultado.nivel.semaforo
    }
  }

  openModal(resultado: TestResultadosImport): void {
    this.selectedResultado = resultado;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.limpiarCampos();
  }

  addTratamiento() {
    const selectedTratamientoId = Number((<HTMLSelectElement>document.getElementById('tratamiento')).value);
    const selectedTratamientoNombre = this.listTT.find(tt => tt.id_tipo_tratamiento === selectedTratamientoId)?.nombre_tratamiento;

    if (selectedTratamientoId !== 0 && selectedTratamientoNombre) {
      this.selectedTratamientos.push({
        id: selectedTratamientoId,
        descripcion: selectedTratamientoNombre,
      });

      // Obtener el número de tratamiento actual (índice)
      const numeroTratamiento = this.selectedTratamientos.length;

      // Agregar el nombre del tratamiento y la descripción al textarea
      this.tratamientoDescripcion += `${numeroTratamiento}. ${selectedTratamientoNombre}\n`;
      console.log('selectedTratamientos+:', this.selectedTratamientos);
      // Limpiar la selección del select
      this.tratamientoSeleccionado = 0;
    }
  }

  guardarEvaluacion() {    
    if (this.selectedResultado && this.selectedDiagnosticoId !== 0 ) {
      const resultado_id = this.selectedResultado.resultado_id;
      // Primero insertamos el diagnóstico
      const diagnostico: Diagnostico = {
        id_tipo_diagnostico: this.selectedDiagnosticoId,
        fundamentacion_cientifica: this.fundamentacionCientifica,
      };
  
      this.diagnosticoService.insertDiagnostico(diagnostico).subscribe(
        (response) => {
          console.log('Diagnóstico registrado correctamente:', response);
  
          // Ahora podemos insertar la evaluación del paciente
          const evaluacionPaciente: EvaluacionPaciente = {
            id_diagnostico: response.data.id_diagnostico,
            especialista_id: this.especialista_id,
            resultado_id: resultado_id,
          };
          
          this.evaluacionPacienteService.insertEvaluacionPaciente(evaluacionPaciente).subscribe(
            (response) => {
              console.log('Evaluación registrada correctamente:', response);

              // Por último, insertamos los tratamientos
              let tratamientosRegistrados = 0;
              const totalTratamientos = this.selectedTratamientos.length;

              this.selectedTratamientos.forEach((tratamiento) => {
                const tratamientoData: Tratamiento = {
                  id_tipo_tratamiento: tratamiento.id,
                  id_diagnostico: response.data.id_diagnostico,
                };
                console.log('tratamientoData :', tratamientoData);

                this.tratamientoService.insertTratamiento(tratamientoData).subscribe(
                  (response) => {
                    console.log('Tratamiento registrado correctamente:', response);
                    tratamientosRegistrados++;

                    // Verificar si todos los tratamientos se han registrado
                    if (tratamientosRegistrados === totalTratamientos) {
                      this.alertService.showAlert('La evaluación se registró exitosamente.', 'alert-success');
                      console.log('La evaluación se registró exitosamente.');

                      if (this.isChecked) {
                        // Llamar a la función para enviar el email
                        this.enviarEmail();
                        console.log(this.isChecked)
                      }
                      // Cerrar el modal aquí
                      this.closeModal();
                    }
                  },
                  (error) => {
                    console.error('Error al registrar tratamiento:', error);
                    this.alertService.showAlert('Se produjo un error al guardar la evaluación.', 'alert-warning');
                  }
                );
              });
            },
            (error) => {
              console.error('Error al registrar evaluación:', error);
              this.alertService.showAlert('Se produjo un error al guardar la evaluación.', 'alert-warning');
            }
          );
        },
        (error) => {
          console.error('Error al registrar diagnóstico:', error);
          this.alertService.showAlert('Se produjo un error al guardar la evaluación.', 'alert-warning');
        }
      );
    }
  }

  getIdUsuario(): void {
    this.usuarioService.currentUser.subscribe(user => {
      if (user) {
        this.especialistaService.getEspecialista(user.usuario_id).subscribe((especialista) => {
          if(especialista.especialista_id){
            this.especialista_id = especialista.especialista_id; // Asignar el especialista_id obtenido
            this.especialista_nombre = user.nombres;
          }
        }, (error) => {
          console.error('Error al obtener el especialista:', error);
        });
      }
    });
  }

  enviarEmail() {
    if (this.selectedResultado) {
      const emailData = {
        nombre_del_paciente: this.selectedResultado?.usuario__rel.nombres,
        nombre_de_la_especialista: this.especialista_nombre,
        nombre_del_test: this.selectedResultado?.test__rel.titulo,
        recomendaciones: this.tratamientoDescripcion,
        mensaje: this.comuMensaje,
        to_email: this.selectedResultado?.usuario__rel.correo_electronico,
      };

      this.emailService.sendEmail(emailData)
        .then(() => console.log('Email enviado con éxito'))
        .catch(error => console.error('Error al enviar email', error));
    }

  }

  toggleNotificacion(event: any) {
    this.isChecked = event.target.checked;
  }

  limpiarCampos() {
    this.selectedDiagnosticoId = 0;
    this.fundamentacionCientifica = '';
    this.selectedTratamientos = [];
    this.tratamientoSeleccionado = 0;
    this.tratamientoDescripcion = '';
    this.comuMensaje = '';
  }
}
