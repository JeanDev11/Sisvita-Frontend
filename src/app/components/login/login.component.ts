import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isSwapped = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) { }

  swapContainers() {
    this.isSwapped = !this.isSwapped;
    const button1 = this.el.nativeElement.querySelector('#button1');
    const button2 = this.el.nativeElement.querySelector('#button2');
    const infoId = this.el.nativeElement.querySelector('#infoId');
    const formId = this.el.nativeElement.querySelector('#formId');
    const inputNombre = this.el.nativeElement.querySelector('#inputNombre');

    if (this.isSwapped) { // Form der
      button1.innerText = 'Crear Cuenta';
      button2.innerText = 'Iniciar Sesión';
      // this.renderer.removeClass(divInfo, 'swipeRight-info');
      this.renderer.addClass(formId, 'swipeLeft-form');
      inputNombre.hidden = false;
    } else { // Form izq
      button1.innerText = 'Iniciar Sesión';
      button2.innerText = 'Crear Cuenta';
      this.renderer.addClass(infoId, 'swipeRight-info');
      inputNombre.hidden = true;
    }

  }

  onSubmit() {
    this.router.navigate(['/main']);
  }

}
