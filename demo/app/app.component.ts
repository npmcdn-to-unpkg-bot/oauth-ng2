import { Component, OnInit, OnDestroy } from '@angular/core';
import { Authenticator, EndpointManager, DefaultEndpoints, TokenManager, ProfileManager } from '../../src';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [Authenticator, EndpointManager, TokenManager, ProfileManager]
})

export class AppComponent implements OnInit, OnDestroy {
  profiles = {};
  subscribers: Subscription[] = [];

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
    this.profiles = this.profileManager.lookup();
  }

  ngOnDestroy() {
    this.subscribers.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  authenticate(provider: string) {
    this.notify(this.authenticator.authenticate(provider))
      .then(() => {
        var subscription = this.profileManager.load(provider)
          .subscribe(next => {
            if (this.profiles == null) this.profiles = {};
            this.profiles[provider] = next;
          });

        this.subscribers.push(subscription);
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