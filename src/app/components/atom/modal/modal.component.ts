import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() titulo: string = '';
  @Input() mensaje: string = '';
  @Input() showModal: boolean = false;
  @Input() redirectTo: string = '';

  constructor(private router: Router) {}

  closeModal() {
    this.showModal = false;
    if (this.redirectTo) {
      this.router.navigate([this.redirectTo]);
    }
  }
}
