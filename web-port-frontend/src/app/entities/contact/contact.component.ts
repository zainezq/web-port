import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [
    FormsModule,
  ],
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private apiUrl = 'http://localhost:9000/api/email';

  constructor(private http: HttpClient) {}

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const { to, subject, message } = contactForm.value;
      const emailData = { to, subject, message };

      this.http.post(this.apiUrl, emailData)
        .subscribe({
          next: (response) => {
            console.log('Email sent successfully:', response);
            alert('Your message has been sent!');
            contactForm.reset();
          },
          error: (error) => {
            console.error('Error sending email:', error);
            alert('Failed to send the email. Please try again.');
          }
        });

    }
  }
}
