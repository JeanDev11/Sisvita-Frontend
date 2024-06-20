import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  nombreUsuario: string = ""

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    // 'currentUser', es el observable que necesita suscribirse para obtener actualizaciones en tiempo real.
    this.usuarioService.currentUser.subscribe(user => {
      if (user) {
        this.nombreUsuario = user.nombres.toUpperCase();
      } else {
        this.nombreUsuario = "";
      }
    });
  }
}
