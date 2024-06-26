// import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.heat'; // Asegúrate de importar el plugin de heatmap

// @Component({
//   selector: 'app-mapa-calor',
//   standalone: true,
//   imports: [],
//   templateUrl: './mapa-calor.component.html',
//   styleUrl: './mapa-calor.component.css'
// })
// export class MapaCalorComponent implements OnInit {
//   private map: L.Map;

//   constructor() {
//     this.map = L.map('map');
//   }

//   ngOnInit(): void {
//     this.initMap();
//     this.loadHeatMapData();
//   }

//   private initMap(): void {
//     this.map = L.map('map').setView([-9.19, -75.0152], 5); // Coordenadas centrales de Perú

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 18,
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(this.map);
//   }

//   private loadHeatMapData(): void {
//     // Datos de ejemplo
//     const heatData = [
//       [-12.0464, -77.0428, 0.8], // Lima
//       [-13.1631, -72.5450, 0.5], // Cusco
//       [-16.4090, -71.5375, 0.7], // Arequipa
//       [-6.7714, -79.8409, 0.6],  // Chiclayo
//       [-8.1091, -79.0215, 0.9]   // Trujillo
//     ];

//     // Asegúrate de que L.heatLayer está disponible
//     const heat = (L as any).heatLayer(heatData, { radius: 25 }).addTo(this.map);
//   }
// }
