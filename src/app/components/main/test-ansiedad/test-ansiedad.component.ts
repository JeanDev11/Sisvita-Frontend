import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestAnsiedadService } from '../../../services/test-ansiedad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-ansiedad',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './test-ansiedad.component.html',
  styleUrls: ['./test-ansiedad.component.css'],
  providers: [TestAnsiedadService]
})
export class TestAnsiedadComponent implements OnInit {
  preguntas: any[] = [];
  selectedTestId: number | null = null;
  loading: boolean = true;  // Variable para indicar si se está cargando

  constructor(
    private testAnsiedadService: TestAnsiedadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const testId = params.get('testId');
      this.selectedTestId = testId ? +testId : null;
      if (this.selectedTestId !== null) {
        this.loadPreguntas();
      }
    });
  }

  loadPreguntas(): void {
    if (this.selectedTestId !== null) {
      this.testAnsiedadService.getPreguntas(this.selectedTestId).subscribe(
        response => {
          this.preguntas = response.data;
          this.loading = false;  // Finalizar la carga
        },
        error => {
          console.error('Error al obtener las preguntas', error);
          this.loading = false;  // Finalizar la carga incluso en caso de error
        }
      );
    }
  }
}
