import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { EmailData } from '../model/email-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5004/notify/send-email';

  sendEmail(emailData: EmailData): Observable<any> {
    return this.http.post(this.apiUrl, emailData);
  }

  // sendEmail(emailData: EmailData): Promise<EmailJSResponseStatus> {
  //   const templateParams = {
  //     nombre_del_paciente: emailData.nombre_del_paciente,
  //     nombre_de_la_especialista: emailData.nombre_de_la_especialista,
  //     nombre_del_test: emailData.nombre_del_test,
  //     recomendaciones: emailData.recomendaciones,
  //     mensaje: emailData.mensaje,
  //     to_email: emailData.to_email
  //   };
  //   return emailjs.send(this.serviceID, this.templateID,templateParams, this.userID )
  //     .then((response: EmailJSResponseStatus) => {
  //       console.log('Correo enviado correctamente', response);
  //       return response;
  //     })
  //     .catch((error) => {
  //       console.error('Error al enviar el correo', error);
  //       throw error;
  //     });
  // }
}
