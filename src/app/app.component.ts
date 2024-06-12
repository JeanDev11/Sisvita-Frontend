import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarTestComponent } from './registrar-test/registrar-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrarTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sisvita';
}
