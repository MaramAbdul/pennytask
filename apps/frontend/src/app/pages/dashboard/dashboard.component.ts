import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../store/user.model';
import { selectUser } from '../../store/user.selectors';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, SidebarComponent,RouterModule],
})
export class DashboardComponent {
  user$: Observable<User | null>;
  activeSection: string = 'general';  // Default section

  constructor(private store: Store, private router: Router) {
    this.user$ = this.store.select(selectUser);
  }



  setActiveSection(section: string) {
    this.activeSection = section;
  }
}