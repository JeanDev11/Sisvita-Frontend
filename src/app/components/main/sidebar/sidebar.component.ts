import { Component, OnInit } from '@angular/core';
import { ToggleSidebarService } from '../../../services/toggle-sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isMinimized:boolean = false;

  constructor(private toggleSidebarService: ToggleSidebarService){}

  ngOnInit() {
    // Suscribirse al observable.
    // La función de callback que se ejecuta cada vez que el BehaviorSubject emite un nuevo valor.
    // El parámetro toggle es el nuevo valor emitido por el BehaviorSubject.
    this.toggleSidebarService.toggleSidebar$.subscribe((toggle: boolean) => {
      this.isMinimized = toggle;
    });
  }

  

}
