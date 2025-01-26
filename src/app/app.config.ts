import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  projectId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  appId: 'xxxxxxxxxxxxxxxxxxxxx',
  storageBucket: 'nxxxxxxxxxxxxxxxxxxxxx',
  apiKey: 'xxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'nxxxxxxxxxxxxxxxxxxxxxm',
  messagingSenderId: 'xxxxxxxxxxxxxxxxxxxxx',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Proveer el servicio de autenticación
    provideAuth(() => getAuth()),
  ],
};
