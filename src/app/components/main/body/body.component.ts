import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ToggleSidebarService } from '../../../services/toggle-sidebar.service';
import { RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  nombreUsuario: string = "";
  isMinimized: boolean = false;

  constructor(private toggleSidebarService: ToggleSidebarService, private el: ElementRef, private renderer: Renderer2,
    private usuarioService: UsuarioService
  ){}

  ngOnInit(): void {
    // 'currentUser', es el observable que necesita suscribirse para obtener actualizaciones en tiempo real.
    this.usuarioService.currentUser.subscribe(user => {
      if (user) {
        this.nombreUsuario = user.nombres;
      } else {
        this.nombreUsuario = "";
      }
    });

    // El parámetro toggle es el nuevo valor emitido por el BehaviorSubject.
    this.toggleSidebarService.toggleSidebar$.subscribe((toggle: boolean) => {
      this.isMinimized = toggle;
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
    // if(button.classList.contains('submenu-open-btn')){
    //   this.renderer.addClass(button, 'submenu-open-btn');
    // } else{
    //   this.renderer.removeClass(button, 'submenu-open-btn');
    // }
  }
}
