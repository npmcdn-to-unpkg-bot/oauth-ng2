import { Component, OnInit } from '@angular/core';
import { Authenticator, EndpointManager, DefaultEndpoints, TokenManager } from '../../src';
import { ProfileManager } from './profile.manager';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [EndpointManager, TokenManager]
})

export class AppComponent implements OnInit {
  profiles = {};

  private authenticator: Authenticator;
  private profileManager: ProfileManager;

  constructor(
    private endpointManager: EndpointManager,
    private tokenManager: TokenManager
  ) { }

  ngOnInit() {
    this.authenticator = new Authenticator(this.endpointManager, this.tokenManager);
    this.profileManager = new ProfileManager(this.endpointManager, this.tokenManager);
    this.endpointManager.registerGoogleAuth('255794345670-mmi8lbeifeb9pnstf3017vk8bcb83tlh.apps.googleusercontent.com');
    this.endpointManager.registerFacebookAuth('1504432696530015');
    this.endpointManager.registerMicrosoftAuth('e85cb43e-4521-498a-a6e2-e2d872c5760b');
    this.profiles = this.profileManager.lookup();
  }

  authenticate(provider: string) {
    this.notify(this.authenticator.authenticate(provider))
      .then(() => {
        this.profileManager.load(provider)
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
    return promise.then(response => console.log(response))
      .catch(error => console.error(error));
  }
}