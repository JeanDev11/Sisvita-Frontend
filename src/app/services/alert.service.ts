import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private alertSubject = new BehaviorSubject<{ message: string, type: string } | null>(null);
  alertState = this.alertSubject.asObservable();

  showAlert(message: string, type: string, duration: number = 2500) {
    this.alertSubject.next({ message, type });
    setTimeout(() => {
      this.clearAlert();
    }, duration);
  }

  clearAlert() {
    this.alertSubject.next(null);
  }
}
