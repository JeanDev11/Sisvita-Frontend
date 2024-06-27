import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../../services/test.service';
import { NivelTestService } from '../../../../services/nivel-test.service';
import { TestResultadosService } from '../../../../services/test-resultados.service';
import { TestResultados } from '../../../../model/test-resultados';
import { Test } from '../../../../model/test';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { ModalComponent } from '../../../atom/modal/modal.component';

@Component({
  selector: 'app-test-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './test-view.component.html',
  styleUrl: './test-view.component.css'
})
export class TestViewComponent {
  preguntas: any[] = [];
  test: Test | undefined;
  puntajeTotal: number = 0;
  id_nivel: number = 0;
  usuario_id: number = 0;

  constructor(private route: ActivatedRoute, private testService: TestService, private nivelTestService: NivelTestService,
    private testResultadosService: TestResultadosService, private usuarioService: UsuarioService, private router: Router
  ) { }

  ngOnInit(): void {
    this.getIdUsuario();
    // Obtener el parámetro 'testId' de la URL.
    this.route.params.subscribe(params => {
      const testId = +params['testId']; // Convierte el parámetro a número entero.

      this.testService.getTest(testId).subscribe(
        (test: Test) => {
          this.test = test;

          // Llamada al servicio para obtener las preguntas del test específico.
          this.testService.getPreguntas(testId).subscribe((data: any[]) => {
            this.preguntas = data;

            // Obtencion de las alternativas para cada pregunta.
            this.preguntas.forEach(pregunta => {
              this.testService.getAlternativas(pregunta.pregunta_id).subscribe((alternativas: any[]) => {
                pregunta.alternativas = alternativas;
              });
            });
          });
        },
        error => {
          console.error('Error al obtener el test:', error);
          // Manejar el error, mostrando un mensaje al usuario.
        }
      );
    });
  }

  submitTest() {
    // Calcular puntaje total
    this.puntajeTotal = 0;
    this.preguntas.forEach(pregunta => {
      if (pregunta.respuesta !== undefined) {
        this.puntajeTotal += pregunta.respuesta;
      }
    });

    // Aquí podrías enviar el puntaje a algún servicio o mostrarlo en la interfaz de usuario
    console.log('Puntaje total:', this.puntajeTotal);

    // Verificar si test_id está definido antes de llamar a obtenerNivel
    const testId = this.test?.test_id;
    if (testId !== undefined) {
      this.nivelTestService.obtenerNivel(this.puntajeTotal, testId).subscribe(
        response => {
          if (response.id_nivel) {
            this.id_nivel = response.id_nivel;
            console.log('Id del nivel:', this.id_nivel);
            const descripcion = response.descripcion;

            const testResultados: TestResultados = {
              test_id: testId,
              usuario_id: this.usuario_id,
              puntaje_obtenido: this.puntajeTotal,
              id_nivel: this.id_nivel
            };

            this.testResultadosService.addResultados(testResultados).subscribe(
              response => {
                console.log('Resultados guardados exitosamente:', response);
                // Mostrar el modal con los resultados
                this.modalMensaje = `Puntaje obtenido: ${this.puntajeTotal}<br>Prescripción: ${descripcion}`;
                this.openModal();
              },
              error => {
                console.error('Error al guardar los resultados:', error);
                // Maneja el error según sea necesario
              }
            );

          } else {
            console.error('Error en la respuesta:', response);
          }
        },
        error => {
          console.error('Error al obtener el nivel:', error);
        }
      );
    } else {
      console.error('test_id is undefined');
    }
  }


  getIdUsuario(): void {
    // 'currentUser', es el observable que necesita suscribirse para obtener actualizaciones en tiempo real.
    this.usuarioService.currentUser.subscribe(user => {
      if (user) {
        this.usuario_id = user.usuario_id;
      }
    });
  }

  // MODAL
  modalTitulo: string = 'Resultado del Test';
  modalMensaje: string = '';
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}