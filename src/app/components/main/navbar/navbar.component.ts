import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ToggleSidebarService } from '../../../services/toggle-sidebar.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private toggleSidebarService: ToggleSidebarService, private el: ElementRef, private renderer: Renderer2){}

  toggleSidebar() {
    this.toggleSidebarService.toggleSidebar();
    const button = this.el.nativeElement.querySelector('#btn-desplegable');

    // Verificar si el botón ya tiene la clase.
    if (button.classList.contains('btn-slidebar')) {
      this.renderer.removeClass(button, 'btn-slidebar');
    } else {
      this.renderer.addClass(button, 'btn-slidebar');
    }
  }
}
