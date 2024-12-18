import {Component, NgModule} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './entities/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  //imports: [RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent],
  imports: [RouterOutlet, SidebarComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'web-port-frontend';

}
