import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { userReducer } from './store/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),  // ✅ This allows interceptors to be injected dynamically
    provideStore({ user: userReducer }),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};