import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GeneroService } from '../../../../core/services/genero.service';
import { Genero } from '../../../../core/models/genero.model';

@Component({
  selector: 'app-generos-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">Géneros</h1>
          <p class="page-subtitle">Explora nuestra colección por categoría</p>
        </div>
        <a routerLink="/generos/nuevo" class="btn-primary">
          + Nuevo Género
        </a>
      </header>

      @if (cargando()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando géneros...</p>
        </div>
      }

      @if (!cargando()) {
        <div class="generos-grid">
          @for (genero of generos(); track genero.id) {
            <div class="genero-card">
              <div class="card-icon">{{ getEmoji(genero.nombre) }}</div>
              <h2 class="card-title">{{ genero.nombre }}</h2>
              <p class="card-desc">{{ genero.descripcion }}</p>
              <div class="card-actions">
                <a [routerLink]="['/generos', genero.id, 'peliculas']" class="btn-secondary">
                  Ver películas
                </a>
                <a [routerLink]="['/generos', genero.id, 'editar']" class="btn-ghost">
                  Editar
                </a>
                <button class="btn-danger" (click)="eliminar(genero.id)">
                  Eliminar
                </button>
              </div>
            </div>
          }

          @empty {
            <div class="empty-state">
              <p>No hay géneros. ¡Crea el primero!</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .page-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #1e1e2e;
    }

    .page-title {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      color: #f0f0ff;
      margin: 0 0 0.25rem;
    }

    .page-subtitle {
      color: #6060a0;
      margin: 0;
      font-size: 0.95rem;
      letter-spacing: 0.05em;
    }

    .btn-primary {
      background: #f0c040;
      color: #0a0a0f;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .btn-primary:hover {
      background: #ffd060;
      transform: translateY(-1px);
    }

    .generos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .genero-card {
      background: #13131f;
      border: 1px solid #1e1e2e;
      border-radius: 8px;
      padding: 2rem;
      transition: all 0.2s;
    }

    .genero-card:hover {
      border-color: #f0c040;
      transform: translateY(-2px);
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      color: #f0f0ff;
      margin: 0 0 0.75rem;
    }

    .card-desc {
      color: #6060a0;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0 0 1.5rem;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .btn-secondary {
      background: transparent;
      color: #f0c040;
      border: 1px solid #f0c040;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.8rem;
      letter-spacing: 0.04em;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: #f0c040;
      color: #0a0a0f;
    }

    .btn-ghost {
      background: transparent;
      color: #6060a0;
      border: 1px solid #2e2e4e;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.8rem;
      transition: all 0.2s;
    }

    .btn-ghost:hover {
      color: #f0f0ff;
      border-color: #6060a0;
    }

    .btn-danger {
      background: transparent;
      color: #c04040;
      border: 1px solid #c04040;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-danger:hover {
      background: #c04040;
      color: #fff;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 4rem;
      color: #6060a0;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #1e1e2e;
      border-top-color: #f0c040;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem;
      color: #6060a0;
    }
  `]
})
export class GenerosListComponent implements OnInit {
  generos = this.generoService.generos;
  cargando = this.generoService.cargando;

  constructor(private generoService: GeneroService) {}

  ngOnInit(): void {
    this.generoService.getAll().subscribe();
  }

  getEmoji(nombre: string): string {
    const mapa: Record<string, string> = {
      'Acción': '💥', 'Drama': '🎭', 'Comedia': '😂',
      'Terror': '👻', 'Ciencia Ficción': '🚀',
      'Romance': '❤️', 'Animación': '🎨', 'Thriller': '🔪'
    };
    return mapa[nombre] || '🎬';
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este género?')) {
      this.generoService.delete(id).subscribe();
    }
  }
}
