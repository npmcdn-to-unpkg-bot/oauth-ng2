import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { Authenticator, TokenManager } from '../../src';

declare var Office: any;

enableProdMode();

// this code is running in the AddIn. If so then either initialize with Office.js or bootstrap 
if (Authenticator.isAddin) {
    if (Authenticator.isTokenUrl(window.location.href)) {
        // use the authenticator to determine if our url contains either a code, access_token or errror
        // if so then this code should be running in Dialog API    
        var token = TokenManager.getToken(window.location.href, 'https://localhost:3000');
        Office.context.ui.messageParent(JSON.stringify(token));
    }
    else {
        Office.initialize = launch;
    }
}
else launch();


function launch() {
    bootstrap(AppComponent, [HTTP_PROVIDERS]);
}
