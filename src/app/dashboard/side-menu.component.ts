import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  template: `
    <div class="side-menu" [class.open]="isOpen">
      <button class="close-btn" (click)="closeMenu()">×</button>
      <nav>
        <ul>
          <li>
            <button (click)="onShowUsers()" class="menu-item">
              <i class="fas fa-users icon"></i>
              Usuarios
            </button>
          </li>
          <li>
            <button (click)="onShowRickAndMorty()" class="menu-item">
              <i class="fas fa-tv icon"></i>
              Rick and Morty
            </button>
          </li>
          <li>
            <button (click)="onLogout()" class="menu-item">
              <i class="fas fa-sign-out-alt icon"></i>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .side-menu {
      position: fixed;
      top: 0;
      left: -250px;
      width: 250px;
      height: 100vh;
      background-color: #ffffff;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      transition: left 0.3s ease;
      z-index: 1000;
    }
    .side-menu.open {
      left: 0;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    nav ul {
      list-style: none;
      padding: 20px;
    }
    nav ul li {
      margin-bottom: 10px;
    }
    .menu-item {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      color: #333;
      width: 100%;
      padding: 10px;
      transition: background-color 0.3s ease;
    }
    .menu-item:hover {
      background-color: #f0f0f0;
    }
    .icon {
      margin-right: 10px;
    }
  `]
})
export class SideMenuComponent {
  @Input() isOpen = false;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() showUsers = new EventEmitter<void>();
  @Output() showRickAndMorty = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  closeMenu() {
    this.menuToggle.emit();
  }

  onShowUsers() {
    this.showUsers.emit();
    this.closeMenu();
  }

  onShowRickAndMorty() {
    this.showRickAndMorty.emit();
    this.closeMenu();
  }

  onLogout() {
    this.logout.emit();
  }
}