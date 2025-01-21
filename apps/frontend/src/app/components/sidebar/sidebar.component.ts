import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../store/user.model';
import { selectUser } from '../../store/user.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { clearUser } from '../../store/user.actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit { // ✅ Implement OnInit
  user$: Observable<User | null>;
  isSidebarOpen: boolean = false;

  constructor(private store: Store, private router: Router) { 
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.store.subscribe((state) => console.log('NgRx Store State:', state));

    this.store.select(selectUser).subscribe(user => console.log('User from Store:', user));
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    localStorage.clear(); 
    this.store.dispatch(clearUser());
    console.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  // Close sideber
  @HostListener('document:click', ['$event'])
  closeSidebar(event: Event) {
    const sidebarElement = document.querySelector('.sidebar-container'); // Sidebar element
    const toggleButton = document.querySelector('.toggle-button'); // ☰ button

    if (this.isSidebarOpen && sidebarElement && !sidebarElement.contains(event.target as Node) && 
        toggleButton && !toggleButton.contains(event.target as Node)) {
      this.isSidebarOpen = false;
    }
  }
}