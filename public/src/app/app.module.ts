import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './common/app-routing.module';
import { UserService } from './common/services/user.service';
import { BugService } from './common/services/bug.service';
import { AuthService } from './common/services/auth.service';
import { AppComponent } from './app.component';
import { NavComponent } from './components/util/nav/nav.component';
import { RegisterComponent } from './components/users/users-reg/register.component';
import { BugsShowComponent } from './components/bugs/bugs-show/bugs-show.component';
import { BugsCreateComponent } from './components/bugs/bugs-create/bugs-create.component';
import { BugsViewComponent } from './components/bugs/bugs-view/bugs-view.component';
import { AboutComponent } from './components/util/about/about.component';
import { AutofocusDirective } from './common/directives/autofocus.directive';
import { UniqueEmailValidatorDirective } from './common/directives/unique-email-validator.directive';
import { UsersProfileComponent } from './components/users/users-profile/users-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavComponent,
    BugsShowComponent,
    BugsCreateComponent,
    BugsViewComponent,
    AboutComponent,
    AutofocusDirective,
    UniqueEmailValidatorDirective,
    UsersProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [UserService, AuthService, BugService],
  bootstrap: [AppComponent]
})
export class AppModule { }
