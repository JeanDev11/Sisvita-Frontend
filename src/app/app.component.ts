import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, LoginComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Asegúrate de que esto sea 'styleUrls' en lugar de 'styleUrl'
})
export class AppComponent {
  title = 'sisvita';
}

