import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { withInMemoryScrolling } from '@angular/router';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      // 2. Zid l partie hethi 👇
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // Hetha y9ollou dima arja3 lfou9
      })),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
