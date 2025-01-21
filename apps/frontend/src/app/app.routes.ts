import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: '',component: LandingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // ✅ Protect Dashboard
  { path: '**', redirectTo: 'login' }, // Redirect unknown routes
];