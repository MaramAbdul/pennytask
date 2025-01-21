import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { BackendComponent } from './pages/backend/backend.component';
import { FrontendComponent } from './pages/frontend/frontend.component';
import { DatabaseComponent } from './pages/database/database.component';
import { GeneraldocsComponent } from './pages/generaldocs/generaldocs.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', component: GeneraldocsComponent },
      { path: 'backend', component: BackendComponent },
      { path: 'frontend', component: FrontendComponent },
      { path: 'database', component: DatabaseComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}