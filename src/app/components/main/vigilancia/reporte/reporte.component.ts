import { Component, OnInit } from '@angular/core';
import { TestResultadosService } from '../../../../services/test-resultados.service';
import { TestResultados } from '../../../../model/test-resultados';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit {
  testResultados: TestResultados[] = [];
  filteredResultados: TestResultados[] = [];
  tipoTest: string = 'Todos';
  nivelAnsiedad: string = 'Todos';
  selectedDate: string = '';

  constructor(private testResultadosService: TestResultadosService) { }

  ngOnInit(): void {
    this.loadResultados();
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

  applyFilters(): void {
    this.filteredResultados = this.testResultados.filter(result => {
      const matchTipo = this.tipoTest === 'Todos' || result.test?.titulo === this.tipoTest;
      const matchNivel = this.nivelAnsiedad === 'Todos' || result.nivel?.semaforo === this.nivelAnsiedad;
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
  getBackgroundColor(resultado: TestResultados): string {
    if (resultado.nivel?.semaforo) {
      switch (resultado.nivel.semaforo.toLowerCase()) {
        case 'rojo':
          return 'red';
        case 'verde':
          return 'green';
        case 'amarillo':
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
}
