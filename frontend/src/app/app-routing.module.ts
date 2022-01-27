import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginSystemComponent } from './components/login-system/login-system.component';
import { RegisterSystemComponent } from './components/register-system/register-system.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: "signup", component: RegisterSystemComponent},
  {path: "signin", component: LoginSystemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
