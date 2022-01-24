import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterSystemComponent } from './components/register-system/register-system.component';
import { LoginSystemComponent } from './components/login-system/login-system.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterSystemComponent,
    LoginSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
