import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginSystemComponent } from './components/login-system/login-system.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterSystemComponent } from './components/register-system/register-system.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  // {path: 'home', component: NavBarComponent, canActivate: [AuthGuard]},
  {path: "signup", component: RegisterSystemComponent},
  {path: "signin", component: LoginSystemComponent},
  {path: "**", redirectTo: 'signin', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
