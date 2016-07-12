import { Component, OnInit } from '@angular/core';
import { Authenticator, EndpointManager, DefaultEndpoints, TokenManager, ProfileManager } from '../../src';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [Authenticator, EndpointManager, TokenManager, ProfileManager]
})

export class AppComponent implements OnInit {
  constructor(
    private authenticator: Authenticator,
    private endpointManager: EndpointManager,
    private tokenManager: TokenManager,
    private profileManager: ProfileManager
  ) { }

  ngOnInit() {
    this.endpointManager.registerGoogleAuth('255794345670-mmi8lbeifeb9pnstf3017vk8bcb83tlh.apps.googleusercontent.com');
    this.endpointManager.registerFacebookAuth('1504432696530015');
    this.endpointManager.registerMicrosoftAuth('e85cb43e-4521-498a-a6e2-e2d872c5760b');
  }

  googleAuth() {
    this.notify(this.authenticator.authenticate(DefaultEndpoints.Google))
      .then(() => { this.profileManager.load(DefaultEndpoints.Google); })      
  }

  microsoftAuth() {
    this.notify(this.authenticator.authenticate(DefaultEndpoints.Microsoft))
      .then(() => { this.profileManager.load(DefaultEndpoints.Microsoft); })
  }

  facebookAuth() {
    this.notify(this.authenticator.authenticate(DefaultEndpoints.Facebook))
      .then(() => { this.profileManager.load(DefaultEndpoints.Facebook); })
  }

  private notify(promise: Promise<any>) {
    return promise.then(response => console.log(response))
      .catch(error => console.error(error));
  }
}