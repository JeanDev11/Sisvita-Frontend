import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { InicioComponent } from './components/main/inicio/inicio.component';
import { TestAnsiedadComponent } from './components/main/test-ansiedad/test-ansiedad.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'main', component: MainComponent, children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioComponent },
        { path: 'test', component: TestAnsiedadComponent },

    ]}
];
