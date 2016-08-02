import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
declare var Office: any;

enableProdMode();
if (window.location.hash) {
    var token = {};
    var segments = window.location.hash.replace('#', '').split('&');
    segments.forEach(segment => {
        var items = segment.split('=')
        token[items[0]] = items[1];
        Office.context.ui.messageParent(JSON.stringify(token));
    });
}


if (window.hasOwnProperty('Office')) {
    Office.initialize = bootstrap;
}
else {
    bootstrap(AppComponent, [HTTP_PROVIDERS]);
}
