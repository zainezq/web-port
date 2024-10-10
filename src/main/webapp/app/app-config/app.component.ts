import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {routes} from "../app.routes";
import {SpinnerComponent} from "../core/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent  {
  isLoading = true; // Initially set to true to show the spinner
  title = 'ilm-learn-frontend';
}
