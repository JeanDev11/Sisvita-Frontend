import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { InicioComponent } from './components/main/inicio/inicio.component';
import { TestViewComponent } from './components/main/test/test-view/test-view.component';
import { TestComponent } from './components/main/test/test.component';
import { ReporteComponent } from './components/main/vigilancia/reporte/reporte.component';
import { MapaCalorComponent } from './components/main/vigilancia/mapa-calor/mapa-calor.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', component: LoginComponent},
    { path: 'main', component: MainComponent, children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioComponent },
        { path: 'test', component: TestComponent },
        { path: 'testView/:testId', component: TestViewComponent },
        { path: 'reporte', component: ReporteComponent},
        { path: 'mapa', component: MapaCalorComponent},
    
    ]}
];
