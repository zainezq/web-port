import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var SMTPJS: any;

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private smtpServer = 'smtp.gmail.com';
  private smtpPort = 587;
  private userEmail = 'aphophus03@gmail.com'; // Your Gmail address
  private userPassword = 'yourAppPassword';

  constructor() {}

  sendEmail(emailData: { userEmail: string; subject: string; message: string }): Observable<any> {
    return new Observable(observer => {
      const smtpOptions = {
        Host: this.smtpServer,
        Port: this.smtpPort,
        Username: this.userEmail,
        Password: this.userPassword,
        To: 'zaineulabideen@outlook.com', // Receiving your email
        From: this.userEmail, // Sender email (your Gmail)
        Subject: emailData.subject,
        Body: `Message from: ${emailData.userEmail}\n\n${emailData.message}`,
      };

      // Send email using SMTPJS
      SMTPJS.send(smtpOptions)
        .then(
          (response: any) => {
            observer.next(response);
            observer.complete();
          },
          (error: any) => {
            observer.error(error);
          }
        );
    });
  }
}
