import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ToggleSidebarService } from '../../../services/toggle-sidebar.service';
import { RouterOutlet } from '@angular/router';
import { PersonaService } from '../../../services/persona.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  nombreUsuario: string = ""
  constructor(private toggleSidebarService: ToggleSidebarService, private el: ElementRef, private renderer: Renderer2,
    private personaService: PersonaService
  ){}

  ngOnInit(): void {
    this.personaService.currentUserSubject.subscribe(user => {
      if (user) {
        this.nombreUsuario = user.nombre;
      } else {
        this.nombreUsuario = "";
      }
    });
  }

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
