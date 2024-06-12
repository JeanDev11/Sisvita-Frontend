import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestAnsiedadComponent } from './test-ansiedad/test-ansiedad.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestAnsiedadComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sisvita';
}
