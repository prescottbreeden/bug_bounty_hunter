import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './http.service';
import { AuthService } from './users/auth.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './users/login_register/register.component';
import { NavComponent } from './nav/nav.component';
import { BugsShowComponent } from './bugs/bugs-show/bugs-show.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavComponent,
    BugsShowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
