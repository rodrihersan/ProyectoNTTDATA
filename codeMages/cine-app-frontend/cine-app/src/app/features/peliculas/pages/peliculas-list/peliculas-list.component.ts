import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeliculaService } from '../../../../core/services/pelicula.service';
import { GeneroService } from '../../../../core/services/genero.service';
import { Pelicula } from '../../../../core/models/pelicula.model';
import { Genero } from '../../../../core/models/genero.model';

@Component({
  selector: 'app-peliculas-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="header-content">
          <a routerLink="/generos" class="back-link">← Géneros</a>
          <h1 class="page-title">{{ genero()?.nombre ?? 'Películas' }}</h1>
          <p class="page-subtitle">{{ genero()?.descripcion }}</p>
        </div>
        <a [routerLink]="['/peliculas/nueva']" [queryParams]="{ generoId: generoId }" class="btn-primary">
          + Nueva Película
        </a>
      </header>

      @if (cargando()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando películas...</p>
        </div>
      }

      @if (!cargando()) {
        <div class="peliculas-grid">
          @for (pelicula of peliculas(); track pelicula.id) {
            <div class="pelicula-card">
              <div class="card-meta">
                <span class="card-anio">{{ pelicula.anio }}</span>
                <span class="card-duracion">⏱ {{ pelicula.duracion }} min</span>
              </div>
              <h2 class="card-titulo">{{ pelicula.titulo }}</h2>
              <p class="card-director">Dir. {{ pelicula.director }}</p>
              <p class="card-sinopsis">{{ pelicula.sinopsis }}</p>
              <div class="card-actions">
                <a [routerLink]="['/peliculas', pelicula.id, 'editar']" class="btn-ghost">
                  Editar
                </a>
                <button class="btn-danger" (click)="eliminar(pelicula.id)">
                  Eliminar
                </button>
              </div>
            </div>
          }

          @empty {
            <div class="empty-state">
              <p>No hay películas en este género todavía.</p>
              <a [routerLink]="['/peliculas/nueva']" [queryParams]="{ generoId: generoId }" class="btn-primary" style="display:inline-block; margin-top: 1rem;">
                Añadir primera película
              </a>
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

    .back-link {
      color: #6060a0;
      text-decoration: none;
      font-size: 0.85rem;
      display: block;
      margin-bottom: 0.75rem;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: #f0c040;
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
      font-size: 0.9rem;
      max-width: 400px;
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

    .peliculas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .pelicula-card {
      background: #13131f;
      border: 1px solid #1e1e2e;
      border-radius: 8px;
      padding: 1.75rem;
      transition: all 0.2s;
    }

    .pelicula-card:hover {
      border-color: #3e3e6e;
      transform: translateY(-2px);
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .card-anio {
      color: #f0c040;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .card-duracion {
      color: #6060a0;
      font-size: 0.8rem;
    }

    .card-titulo {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      color: #f0f0ff;
      margin: 0 0 0.25rem;
    }

    .card-director {
      color: #8080b0;
      font-size: 0.85rem;
      margin: 0 0 1rem;
      font-style: italic;
    }

    .card-sinopsis {
      color: #6060a0;
      font-size: 0.85rem;
      line-height: 1.6;
      margin: 0 0 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
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
export class PeliculasListComponent implements OnInit {
  generoId!: number;
  peliculas = signal<Pelicula[]>([]);
  genero = signal<Genero | null>(null);
  cargando = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private generoService: GeneroService
  ) {}

  ngOnInit(): void {
    this.generoId = +this.route.snapshot.paramMap.get('id')!;

    this.generoService.getById(this.generoId).subscribe(g => this.genero.set(g));

    this.peliculaService.getByGenero(this.generoId).subscribe(peliculas => {
      this.peliculas.set(peliculas);
      this.cargando.set(false);
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      this.peliculaService.delete(id).subscribe(() => {
        this.peliculas.update(lista => lista.filter(p => p.id !== id));
      });
    }
  }
}
