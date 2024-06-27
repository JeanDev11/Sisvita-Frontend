import { Component, OnInit } from '@angular/core';
import {GoogleMap, MapHeatmapLayer} from '@angular/google-maps';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../model/usuario';

@Component({
    selector: 'app-mapa-calor',
    standalone: true,
    imports: [GoogleMap, MapHeatmapLayer],
    templateUrl: './mapa-calor.component.html',
    styleUrl: './mapa-calor.component.css'
})
export class MapaCalorComponent implements OnInit {

    center = { lat: -9.189967, lng: -75.015152 }; // Centro de Perú
    zoom = 6;
    heatmapOptions = { radius: 20 };
    heatmapData: { lat: number, lng: number }[] = [];

    constructor(private usuarioService: UsuarioService) {}

    ngOnInit(): void {
        this.usuarioService.getUsuariosAll().subscribe(
            (usuarios: Usuario[]) => {
                this.heatmapData = usuarios
                    .filter(usuario => usuario.ubigeo) // Filtrar usuarios que tienen ubicación definida
                    .map(usuario => ({ lat: usuario.ubigeo!.latitud, lng: usuario.ubigeo!.longitud }));
            },
            error => {
                console.error('Error al obtener usuarios', error);
            }
        );
    }







    // center = { lat: -9.189967, lng: -75.015152 }; // Centro de Perú
    // zoom = 6; // Nivel de zoom adecuado para visualizar todo el país
    // heatmapOptions = { radius: 20 };
    // heatmapData = [
    //     { lat: -12.046374, lng: -77.042793 }, // Lima
    //     { lat: -13.53195, lng: -71.967463 },  // Cusco
    //     { lat: -16.409047, lng: -71.537451 }, // Arequipa
    //     { lat: -3.74912, lng: -73.25383 },    // Iquitos
    //     { lat: -12.058044, lng: -75.204826 }, // Huancayo
    //     { lat: -6.771431, lng: -79.840881 },  // Chiclayo
    //     { lat: -8.109052, lng: -79.021533 },  // Trujillo
    //     { lat: -5.19449, lng: -80.63282 },    // Piura
    //     { lat: -14.834308, lng: -74.932814 }, // Ayacucho
    //     { lat: -12.137, lng: -76.964 },       // Chosica
    //     { lat: -15.840221, lng: -70.021881 }, // Puno
    //     { lat: -6.495471, lng: -76.364468 },  // Tarapoto
    // ];
}
