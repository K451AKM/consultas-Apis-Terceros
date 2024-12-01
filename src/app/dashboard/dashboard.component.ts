import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TablaConsultaComponent } from '../components/tabla-consulta/tabla-consulta.component';
import { TablaRickAndMortyComponent } from '../components/tabla-rick-and-morty/tabla-rick-and-morty.component';
import { SideMenuComponent } from './side-menu.component';
import { AuthService } from '../../app/services/auth.service';
import { User } from '../../app/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgIf, TablaConsultaComponent, TablaRickAndMortyComponent, SideMenuComponent],
  template: `
    <div class="dashboard">
      <header class="header">
        <div class="header-content">
          <button class="hamburger-btn" (click)="toggleMenu()">☰</button>
          <div class="user-info">
            <div class="avatar-container">
              <ng-container *ngIf="currentUser">
                <img *ngIf="currentUser.avatar" [src]="currentUser.avatar" alt="User Avatar" class="user-avatar">
                <div *ngIf="!currentUser.avatar" class="user-avatar-placeholder">
                  {{ getUserInitial() }}
                </div>
              </ng-container>
              <div *ngIf="!currentUser" class="user-avatar-placeholder">
                U
              </div>
            </div>
            <h1 class="title">Dashboard</h1>
          </div>
        </div>
      </header>
      <main class="main-content">
        <app-side-menu 
          [isOpen]="isMenuOpen" 
          (menuToggle)="toggleMenu()" 
          (showUsers)="toggleUsersTable()"
          (showRickAndMorty)="toggleRickAndMortyTable()"
          (logout)="onLogout()">
        </app-side-menu>
        @if (showUsersTable) {
          <app-tabla-consulta></app-tabla-consulta>
        }
        @if (showRickAndMortyTable) {
          <app-tabla-rick-and-morty></app-tabla-rick-and-morty>
        }
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      background-color: #f0f2f5;
    }
    .header {
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      display: flex;
      align-items: center;
    }
    .hamburger-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      margin-right: 1rem;
    }
    .user-info {
      display: flex;
      align-items: center;
    }
    .avatar-container {
      width: 40px;
      height: 40px;
      margin-right: 1rem;
    }
    .user-avatar, .user-avatar-placeholder {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    .user-avatar-placeholder {
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #fff;
      font-size: 1.2rem;
    }
    .title {
      font-size: 1.5rem;
      color: #333;
      margin: 0;
    }
    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
      position: relative;
    }
  `]
})
export class DashboardComponent implements OnInit {
  isMenuOpen = false;
  showUsersTable = false;
  showRickAndMortyTable = false;
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  getUserInitial(): string {
    return this.currentUser && this.currentUser.name 
      ? this.currentUser.name.charAt(0).toUpperCase() 
      : 'U';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUsersTable() {
    this.showUsersTable = true;
    this.showRickAndMortyTable = false;
  }

  toggleRickAndMortyTable() {
    this.showRickAndMortyTable = true;
    this.showUsersTable = false;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}