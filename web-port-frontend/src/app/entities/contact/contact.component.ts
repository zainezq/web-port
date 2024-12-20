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
  private apiUrl = 'http://localhost:9000/api/contact';
  constructor(private http: HttpClient) {}

  onSubmit(contactForm: any): void {
    const formData = contactForm.value;
    this.http.post(this.apiUrl, formData).subscribe({
      next: (response) => {
        alert('Message sent successfully!');
        contactForm.reset();
      },
      error: (error) => {
        alert('Failed to send message: ' + error.message);
      }
    });
  }
}
