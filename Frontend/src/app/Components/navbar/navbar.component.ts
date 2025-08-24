import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token!: string | null;
  userRole!: string | null;
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }
 ngOnInit() {
    // Initial token and role
    this.token = this.authService.getAccessToken();
    this.userRole = this.authService.getUserRole();

    // Update token and role on every navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.token = this.authService.getAccessToken();
        this.userRole = this.authService.getUserRole();
      });
  }

  onLogout(event: Event) {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
