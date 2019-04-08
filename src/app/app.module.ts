import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAddComponent } from './list-add/list-add.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ListService} from '../services/list.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {NewsletterService} from '../services/newsletter.service';

@NgModule({
  declarations: [
    AppComponent,
    ListAddComponent,
    ListDetailComponent,
    ListEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ListService,
    NewsletterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
