import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { Authenticator } from '../../src';

declare var Office: any;

enableProdMode();

if (location.href.indexOf('addin') !== -1) Authenticator.isAddin = true;

// this code is running in the AddIn. If so then either initialize with Office.js or bootstrap 
Authenticator.isAddin ? Office.initialize = launch : launch();

function launch() {
    if (Authenticator.isDialog) return;
    bootstrap(AppComponent, [HTTP_PROVIDERS]);
}
