import { Component, OnInit } from '@angular/core';
import { ToggleSidebarService } from '../../../services/toggle-sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isMinimized: boolean = false;
  submenuOpen = false;
  isSpecialist: boolean = false;
  rol:String = '';

  constructor(private toggleSidebarService: ToggleSidebarService, private usuarioService: UsuarioService, private router: Router){}

  toggleVigilanciaSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }
  
  ngOnInit() {
    // Suscribirse al observable.
    // La función de callback que se ejecuta cada vez que el BehaviorSubject emite un nuevo valor.
    // El parámetro toggle es el nuevo valor emitido por el BehaviorSubject.
    this.toggleSidebarService.toggleSidebar$.subscribe((toggle: boolean) => {
      this.isMinimized = toggle;
    });
    this.getRolUsuario();
    if(this.rol === 'E'){
      this.isSpecialist = true;
    }

  }

  logout(){
    this.usuarioService.logout()
  }

  getRolUsuario(): void {
    // 'currentUser', es el observable que necesita suscribirse para obtener actualizaciones en tiempo real.
    this.usuarioService.currentUser.subscribe(user => {
      if (user) {
        this.rol = user.rol;
      }
    });
  }

}
