import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment as env } from '../environments/environment';

// Custom packages
import { StatesModule } from '@core/+states';
import {
  SharedModule,
  HttpRequestInterceptor, HttpResponseInterceptor, JWTAuthInterceptor,
  AppEnvHelper
} from '@core/shared';

const CUSTOM_MODULES = [SharedModule, StatesModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...CUSTOM_MODULES
  ],
  providers: [
    AppEnvHelper.getValueProvider(env),
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JWTAuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'zh-Hant' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
