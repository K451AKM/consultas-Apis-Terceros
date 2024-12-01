import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-tabla-consulta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Tabla de Usuarios</h2>
        </div>
        <div class="card-content">
          @if (loading) {
            <div class="skeleton-container">
              @for (item of [1,2,3,4,5]; track $index) {
                <div class="skeleton"></div>
              }
            </div>
          } @else {
            <div class="table-responsive">
              <table>
                <thead style="background-color: #bee9e8;">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Avatar</th>
                  </tr>
                </thead>
                <tbody>
                  @for (user of displayedUsers; track user.id) {
                    <tr>
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.role }}</td>
                      <td>
                        <img [src]="user.avatar" [alt]="user.name" class="avatar">
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <div class="pagination">
              <span>Mostrando {{ startIndex + 1 }} a {{ endIndex }} de {{ users.length }} entradas</span>
              <div class="pagination-buttons">
                <button (click)="previousPage()" [disabled]="currentPage === 1" class="btn">Anterior</button>
                <button (click)="nextPage()" [disabled]="endIndex >= users.length" class="btn">Siguiente</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table-container {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      padding: 1rem;
    }
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .card-header {
      background: #f0f0f0;
      padding: 1rem;
    }
    .card-title {
      margin: 0;
      font-size: 1.25rem;
      color: #333;
    }
    .card-content {
      padding: 1rem;
    }
    .skeleton-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .skeleton {
      height: 2.5rem;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
    .table-responsive {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 1px solid #e0e0e0;
    }
    th {
      font-weight: bold;
    }
    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
    }
    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
    .pagination-buttons {
      display: flex;
      gap: 0.5rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .btn:hover {
      background: #0056b3;
    }
    .btn:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class TablaConsultaComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 5;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.updateDisplayedUsers();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        this.loading = false;
      }
    });
  }

  updateDisplayedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.users.slice(start, end);
  }

  nextPage() {
    if (this.endIndex < this.users.length) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.users.length);
  }
}