import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';  // Import Ionic Storage Module
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';

// Function to retrieve the token from Ionic Storage
export function tokenGetter() {
  return localStorage.getItem('token'); // Ensure this matches the key used in storage
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['http://localhost:5000/api/auth/login']
      }
    }),
    IonicStorageModule.forRoot()  // Add Ionic Storage Module here
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Add the AuthInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
