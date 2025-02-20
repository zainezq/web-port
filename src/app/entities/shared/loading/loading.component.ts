import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-screen">
      <p>Loading...</p>
    </div>
  `,
  standalone: true,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {


}
