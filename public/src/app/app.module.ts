import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './common/app-routing.module';
import { UserService } from './common/services/user.service';
import { BugService } from './common/services/bug.service';
import { AuthService } from './common/services/auth.service';
import { AppComponent } from './app.component';
import { NavComponent } from './components/util/nav/nav.component';
import { FooterComponent } from './components/util/footer/footer.component';
import { RegisterComponent } from './components/users/users-reg/register.component';
import { BugsShowComponent } from './components/bugs/bugs-show/bugs-show.component';
import { BugsCreateComponent } from './components/bugs/bugs-create/bugs-create.component';
import { BugsViewComponent } from './components/bugs/bugs-view/bugs-view.component';
import { AboutComponent } from './components/util/about/about.component';
import { AutofocusDirective } from './common/directives/autofocus.directive';
import { UniqueEmailValidatorDirective } from './common/directives/unique-email-validator.directive';
import { UsersProfileComponent } from './components/users/users-profile/users-profile.component';
import { FilterPipe } from './common/filter.pipe';
import { PrettyPrintPipe } from './common/prettyprint.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavComponent,
    FooterComponent,
    BugsShowComponent,
    BugsCreateComponent,
    BugsViewComponent,
    AboutComponent,
    AutofocusDirective,
    UniqueEmailValidatorDirective,
    UsersProfileComponent,
    FilterPipe,
    PrettyPrintPipe,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          ['link'],                         // link and image, video
        ],
      }
    })
  ],
  providers: [UserService, AuthService, BugService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
