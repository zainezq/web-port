import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {routes} from "../app.routes";
import {LoadingSpinnerComponent} from "../core/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ilm-learn-frontend';
}
