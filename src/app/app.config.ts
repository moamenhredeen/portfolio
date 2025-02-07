import {ApplicationConfig, CSP_NONCE, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation()
    ),
    provideHttpClient(), provideClientHydration(withEventReplay()),
  ]
};
