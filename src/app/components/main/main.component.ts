import { Component } from '@angular/core';
import { BodyComponent } from './body/body.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BodyComponent, SidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
