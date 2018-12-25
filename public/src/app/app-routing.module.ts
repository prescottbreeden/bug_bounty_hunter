import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './users/login_register/register.component';
import { BugsShowComponent } from './bugs/bugs-show/bugs-show.component';
import { BugsCreateComponent } from './bugs/bugs-create/bugs-create.component';
import { BugsViewComponent } from './bugs/bugs-view/bugs-view.component';

const routes: Routes = [
  { path: '', component: RegisterComponent},
  { path: 'bugs', component: BugsShowComponent},
  { path: 'bugs/create', component: BugsCreateComponent},
  { path: 'bugs/:id', component: BugsViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
