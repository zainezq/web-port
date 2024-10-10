import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-container">
      <div class="loading-spinner"></div>
    </div>
  `,
  standalone: true,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent { }
