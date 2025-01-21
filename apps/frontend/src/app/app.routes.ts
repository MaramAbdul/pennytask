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
  { path: '', component: LandingComponent }, // Landing Page (No Sidebar)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔥 Dashboard with Nested Routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protect this route
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' }, // Default route inside dashboard
      { path: 'general', component: GeneraldocsComponent }, // Main Dashboard Content
      { path: 'backend', component: BackendComponent },
      { path: 'frontend', component: FrontendComponent },
      { path: 'database', component: DatabaseComponent }
    ]
  },

  { path: '**', redirectTo: 'login' } // Redirect unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}