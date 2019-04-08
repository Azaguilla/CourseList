import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';
import {SwPush} from '@angular/service-worker';
import {NewsletterService} from '../services/newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly VAPID_PUBLIC_KEY = 'BEdsuyw6Yyo3iUtrcSlTvzIMS9bL1ymRPOR6oi0V0Xt01eUx9Ty_Aw5Hi_6KjlwwQvKnQAVc6_fDtdWfFYt6sBY';

  constructor(private _loadingBar: SlimLoadingBarService,
              private _router: Router,
              private swPush: SwPush,
              private newsletterService: NewsletterService
              ) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  subscribeToNotifications() {
    // this.swPush.unsubscribe();
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  sendNotifications() {
    console.log('send by clicking on the button');
    this.newsletterService.send().subscribe();
  }
}
