import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { Authenticator, TokenManager } from '../../src';

declare var Office: any;

enableProdMode();

if (location.href.indexOf('addin')) Authenticator.isAddin = true;

// this code is running in the AddIn. If so then either initialize with Office.js or bootstrap 
(Authenticator.isAddin ? Office.initialize = launch : launch());

function launch() {
    if (Authenticator.isTokenUrl(location.href)) {
        // use the authenticator to determine if our url contains either a code, access_token or errror
        // if so then this code should be running in Dialog API    
        var token = TokenManager.getToken(location.href, location.origin);

        if (Authenticator.isAddin) Office.context.ui.messageParent(JSON.stringify(token));
    }

    bootstrap(AppComponent, [HTTP_PROVIDERS]);
}
