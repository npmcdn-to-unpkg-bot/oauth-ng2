import { Component, OnInit } from '@angular/core';
import { Authenticator, EndpointManager, TokenManager, DefaultEndpoints } from '../../src';
import { ProfileManager } from './profile.manager';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [EndpointManager, TokenManager]
})

export class AppComponent implements OnInit {
  profiles = {};
  profileUrls = {};

  private authenticator: Authenticator;
  private profileManager: ProfileManager;
  debug = {
    url: location.href,
    isToken: Authenticator.isTokenUrl(location.href),
    token: TokenManager.getToken(location.href, location.origin),
    isAddin: Authenticator.isAddin
  }

  constructor(
    private endpointManager: EndpointManager,
    private tokenManager: TokenManager
  ) {
    this.profileUrls[DefaultEndpoints.Facebook] = "https://graph.facebook.com/v2.5/me";
    this.profileUrls[DefaultEndpoints.Microsoft] = "https://graph.microsoft.com/beta/me";
    this.profileUrls[DefaultEndpoints.Google] = "https://www.googleapis.com/plus/v1/people/me";
    this.profileUrls['StackExchange'] = "https://api.stackexchange.com/2.2/me?order=desc&sort=reputation&site=stackoverflow";
  }

  ngOnInit() {
    // Instantiate authenticator
    this.authenticator = new Authenticator(this.endpointManager, this.tokenManager);

    // Instantiate our custom profile manager which uses the helpers  
    this.profileManager = new ProfileManager(this.tokenManager);

    // Register Google OAuth 
    this.endpointManager.registerGoogleAuth('255794345670-mmi8lbeifeb9pnstf3017vk8bcb83tlh.apps.googleusercontent.com');

    // Register Facebook OAuth
    this.endpointManager.registerFacebookAuth('1504432696530015');

    // Register Microsoft OAuth
    this.endpointManager.registerMicrosoftAuth('e85cb43e-4521-498a-a6e2-e2d872c5760b');

    // Demo showing custom endpoint registration
    this.endpointManager.add('StackExchange', {
      clientId: '7613',
      scope: 'no_expiry',
      baseUrl: 'https://stackexchange.com',
      authorizeUrl: '/oauth',
      responseType: 'token',
      state: true
    });

    this.profiles = this.profileManager.lookup();
  }

  authenticate(provider: string) {
    this.notify(this.authenticator.authenticate(provider))
      .then(() => {

        // our custom profile manager, reuses the TokenManager helper to get 
        // the appropriate token
        this.profileManager.load(provider, this.profileUrls[provider])
          .then(next => {
            if (this.profiles == null) this.profiles = {};
            this.profiles[provider] = next;
          });
      })
  }

  logout() {
    this.profileManager.clear();
    this.tokenManager.clear();
    this.profiles = this.profileManager.lookup();
  }

  private notify(promise: Promise<any>) {
    if (promise == null) return;
    return promise.then(response => console.log(response))
      .catch(error => console.error(error));
  }
}