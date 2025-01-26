import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  projectId: 'ng-task-18-11b50',
  appId: '1:243933716167:web:db8cc3d6a53e187e7568e2',
  storageBucket: 'ng-task-18-11b50.appspot.com', 
  apiKey: 'AIzaSyCDqup8hfLby0R8PVPJCK9spSTQFcMXpQI',
  authDomain: 'ng-task-18-11b50.firebaseapp.com',
  messagingSenderId: '243933716167',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
