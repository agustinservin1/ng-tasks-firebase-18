import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  projectId: 'xxxxxxxxxxxxxx',
  appId: 'xxxxxxxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxx', 
  apiKey: 'xxxxxxxxxxxxxxxxxx',
  authDomain: 'xxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxxxxx',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
