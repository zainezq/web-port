import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class ContactComponent {
  successMessage = false;
  errorMessage = false;

  private serviceId = 'service_s1lpqyn';
  private templateId = 'template_8n9ih8j';
  private publicKey = 'SmPb33DB3RySZOfPu';

  onSubmit(contactForm: any) {
    console.log('Form submitted:', contactForm.value);

    const templateParams = {
      email: contactForm.value.email,
      subject: contactForm.value.subject,
      message: contactForm.value.message,
    };


    emailjs
      .send(this.serviceId, this.templateId, templateParams, this.publicKey)
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
          }, 3000);
        },
        (error) => {
          console.error('Failed to send email:', error);
          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 3000);
        }
      );

    // Reset the form
    contactForm.reset();
  }
}
