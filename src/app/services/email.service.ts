import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { EmailData } from '../model/email-data';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
  private serviceID = 'service_dcsaf9m';
  private templateID = 'template_ifzy1l9';
  private userID = '';

  sendEmail(emailData: EmailData): Promise<EmailJSResponseStatus> {
    const templateParams = {
      nombre_del_paciente: emailData.nombre_del_paciente,
      nombre_de_la_especialista: emailData.nombre_de_la_especialista,
      nombre_del_test: emailData.nombre_del_test,
      recomendaciones: emailData.recomendaciones,
      mensaje: emailData.mensaje,
      to_email: emailData.to_email
    };

    return emailjs.send(this.serviceID, this.templateID,templateParams, this.userID )
      .then((response: EmailJSResponseStatus) => {
        console.log('Correo enviado correctamente', response);
        return response;
      })
      .catch((error) => {
        console.error('Error al enviar el correo', error);
        throw error;
      });
  }
}
