import { Component, OnInit } from '@angular/core';
import { TestAnsiedadService } from '../../../services/test-ansiedad.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './test-ansiedad.component.html',
  styleUrls: ['./test-ansiedad.component.css']
})
export class TestAnsiedadComponent implements OnInit {
  preguntas: any[] = [];

  constructor(private testAnsiedadService: TestAnsiedadService) {}

  ngOnInit(): void {
    this.testAnsiedadService.getPreguntas().subscribe(
      response => {
        this.preguntas = response.data;
      },
      error => {
        console.error('Error al obtener las preguntas', error);
      }
    );
  }
}