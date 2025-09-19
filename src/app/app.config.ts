import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';

import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';

const MQTT_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  protocol: 'ws',
  username: 'admin',      // your MQTT username
  password: 'password',   // your MQTT password
  clientId: 'clientId-' + Math.random().toString(16).substr(2, 8), // optional  
};

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    importProvidersFrom(MqttModule.forRoot(MQTT_OPTIONS))  
  ]
};
