import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app-config/app.component';
import { config } from './app/app-config/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
