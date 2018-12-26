import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { UserService } from './users/services/user.service';
import { BugService } from './bugs/services/bug.service';
import { AuthService } from './users/services/auth.service';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './users/login_register/register.component';
import { BugsShowComponent } from './bugs/bugs-show/bugs-show.component';
import { BugsCreateComponent } from './bugs/bugs-create/bugs-create.component';
import { BugsViewComponent } from './bugs/bugs-view/bugs-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavComponent,
    BugsShowComponent,
    BugsCreateComponent,
    BugsViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [UserService, AuthService, BugService],
  bootstrap: [AppComponent]
})
export class AppModule { }
