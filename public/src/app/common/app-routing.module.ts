import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '../components/util/about/about.component';
import { RegisterComponent } from '../components/users/users-reg/register.component';
import { UsersProfileComponent } from '../components/users/users-profile/users-profile.component';
import { BugsShowComponent } from '../components/bugs/bugs-show/bugs-show.component';
import { BugsCreateComponent } from '../components/bugs/bugs-create/bugs-create.component';
import { BugsViewComponent } from '../components/bugs/bugs-view/bugs-view.component';

const routes: Routes = [
  { path: '', component: RegisterComponent},
  { path: 'about', component: AboutComponent},
  { path: 'profile', component: UsersProfileComponent},
  { path: 'bugs', component: BugsShowComponent},
  { path: 'new-bug', component: BugsCreateComponent},
  { path: 'bugs/:id', component: BugsViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
