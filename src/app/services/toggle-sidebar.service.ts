import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSidebarService {
  private isMinimized = new BehaviorSubject<boolean>(false); // Comienza con false.

  toggleSidebar$ = this.isMinimized.asObservable(); // Exponer isMinimized como un observable para que otros componentes puedan suscribirse a él.

  toggleSidebar() {
    const currentState = this.isMinimized.value; // Obtiene el valor actual almacenado en el BehaviorSubject.
    this.isMinimized.next(!currentState); // Alterna el estado.
  }
}
