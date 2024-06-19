import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestAnsiedadService } from '../../../services/test-ansiedad.service';

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
  selectedTestId: number = 1; // Declaración y asignación inicial

  constructor(private testAnsiedadService: TestAnsiedadService) {}

  ngOnInit(): void {
    this.loadPreguntas();
  }

  loadPreguntas(): void {
    this.testAnsiedadService.getPreguntas(this.selectedTestId).subscribe(
      response => {
        this.preguntas = response.data;
      },
      error => {
        console.error('Error al obtener las preguntas', error);
      }
    );
  }

  onTestChange(testId: string): void {
    this.selectedTestId = parseInt(testId, 10); // Convertir el valor a número
    this.loadPreguntas();
  }
}