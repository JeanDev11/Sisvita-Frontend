import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { GoogleMap, MapHeatmapLayer } from '@angular/google-maps';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../model/usuario';
import { TestResultadosImport } from '../../../../model/test-resultados';
import { TestResultadosService } from '../../../../services/test-resultados.service';

@Component({
    selector: 'app-mapa-calor',
    standalone: true,
    imports: [GoogleMap, MapHeatmapLayer],
    templateUrl: './mapa-calor.component.html',
    styleUrl: './mapa-calor.component.css'
})
export class MapaCalorComponent implements OnInit {
    testResultados: TestResultadosImport[] = [];
    filteredResultados: TestResultadosImport[] = [];
    tipoTest: string = 'Todos';
    nivelAnsiedad: string = 'Todos';
    selectedDate: string = '';

    center = { lat: -9.189967, lng: -75.015152 }; // Centro de Perú
    zoom = 6;
    heatmapOptions = { radius: 20 };
    heatmapData: { lat: number, lng: number }[] = [];

    constructor(private testResultadosService: TestResultadosService) { }

    ngOnInit(): void {
        this.loadResultados();
    }

    // ngOnInit(): void {
    //     this.usuarioService.getUsuariosAll().subscribe(
    //         (usuarios: Usuario[]) => {
    //             this.heatmapData = usuarios
    //                 .filter(usuario => usuario.ubigeo) // Filtrar usuarios que tienen ubicación definida
    //                 .map(usuario => ({ lat: usuario.ubigeo!.latitud, lng: usuario.ubigeo!.longitud }));
    //         },
    //         error => {
    //             console.error('Error al obtener usuarios', error);
    //         }
    //     );
    // }

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
        // this.heatmapData = this.testResultados
        //     .filter(us => us.usuario.ubigeo) // Filtrar usuarios que tienen ubicación definida
        //     .map(us => ({ lat: us.usuario.ubigeo.latitud, lng: us.usuario.ubigeo.longitud }));
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
        this.heatmapData = this.filteredResultados
        .filter(us => us.usuario__rel.ubigeo) // Filtrar usuarios que tienen ubicación definida
        .map(us => ({ lat: us.usuario__rel.ubigeo.latitud, lng: us.usuario__rel.ubigeo.longitud }));

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
}
