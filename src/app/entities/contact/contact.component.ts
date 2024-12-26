import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import {ContactService} from './service/contact.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass,
  ],
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  successMessage = false;
  errorMessage = false;
  constructor(private contactService: ContactService) {}

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const { email, subject, message } = contactForm.value;

      this.contactService.sendEmail({ userEmail: email, subject, message }).subscribe({
        next: (response) => {
          console.log('Response from server:', response);
          this.successMessage = true;

          // Hide the message after 3 seconds
          setTimeout(() => {
            this.successMessage = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.errorMessage = true;

          // Hide the message after 3 seconds
          setTimeout(() => {
            this.errorMessage = false;
          }, 3000);
        },
      });

      contactForm.reset();
    }
  }

/*  onSubmit(contactForm: any) {
    console.log('Form submitted:', contactForm.value);

    // Example: Simulate form validation or server response
    const isFormValid = Math.random() > 0.5; // Randomly simulate success or error

    if (isFormValid) {
      // Display success message
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 3000);
    } else {
      // Display error message
      this.errorMessage = true;
      setTimeout(() => {
        this.errorMessage = false;
      }, 3000);
    }

    // Reset the form
    contactForm.reset();
  }*/

}
