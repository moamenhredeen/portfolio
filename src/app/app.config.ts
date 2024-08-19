import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import fm from 'front-matter';

import {routes} from './app.routes';
import {provideMarkdown} from "ngx-markdown";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideMarkdown({
      loader: HttpClient,
      markedExtensions: [
        {
          hooks: {
            preprocess(markdown: string): string {
              const {attributes, body} = fm(markdown);
              return body;
            }
          }
        }
      ]
    }), provideAnimationsAsync()
  ]
};
