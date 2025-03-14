import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { inject } from '@vercel/analytics';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {ConfigService} from './app/config.service';
import {APP_BOOTSTRAP_LISTENER} from '@angular/core';

inject();

function loadConfig(configService: ConfigService) {
  return () => {
    return configService.loadConfig().then(() => {
      console.log("✅ Firebase config loaded!");
    }).catch(err => console.error("❌ Failed to load config:", err));
  };
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ConfigService,
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true
    }
    ]
}).catch((err) => console.error(err));
