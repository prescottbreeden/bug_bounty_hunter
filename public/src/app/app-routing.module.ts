import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './users/login_register/register.component';
import { BugsShowComponent } from './bugs/bugs-show/bugs-show.component';

const routes: Routes = [
  { path: '', component: RegisterComponent},
  { path: 'bugs', component: BugsShowComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
