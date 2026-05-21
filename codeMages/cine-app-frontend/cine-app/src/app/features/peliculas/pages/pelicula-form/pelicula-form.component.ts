import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeliculaService } from '../../../../core/services/pelicula.service';
import { GeneroService } from '../../../../core/services/genero.service';
import { Genero } from '../../../../core/models/genero.model';

@Component({
  selector: 'app-pelicula-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="form-card">
        <div class="form-header">
          <a routerLink="/generos" class="back-link">← Volver a géneros</a>
          <h1 class="form-title">{{ esEdicion ? 'Editar Película' : 'Nueva Película' }}</h1>
        </div>

        <form [formGroup]="form" (ngSubmit)="guardar()" class="form-body">

          <div class="form-group">
            <label for="titulo" class="form-label">Título</label>
            <input
              id="titulo"
              type="text"
              formControlName="titulo"
              class="form-input"
              [class.input-error]="campoInvalido('titulo')"
              placeholder="Título de la película"
            />
            @if (campoInvalido('titulo')) {
              <span class="error-msg">
                @if (form.get('titulo')?.errors?.['required']) { El título es obligatorio. }
                @if (form.get('titulo')?.errors?.['maxlength']) { Máximo 100 caracteres. }
              </span>
            }
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="director" class="form-label">Director</label>
              <input
                id="director"
                type="text"
                formControlName="director"
                class="form-input"
                [class.input-error]="campoInvalido('director')"
                placeholder="Nombre del director"
              />
              @if (campoInvalido('director')) {
                <span class="error-msg">El director es obligatorio.</span>
              }
            </div>

            <div class="form-group">
              <label for="anio" class="form-label">Año</label>
              <input
                id="anio"
                type="number"
                formControlName="anio"
                class="form-input"
                [class.input-error]="campoInvalido('anio')"
                placeholder="Ej: 2024"
              />
              @if (campoInvalido('anio')) {
                <span class="error-msg">
                  @if (form.get('anio')?.errors?.['required']) { El año es obligatorio. }
                  @if (form.get('anio')?.errors?.['min']) { Mínimo año 1888. }
                  @if (form.get('anio')?.errors?.['max']) { El año no puede ser futuro. }
                </span>
              }
            </div>
          </div>

          <div class="form-group">
            <label for="duracion" class="form-label">Duración (minutos)</label>
            <input
              id="duracion"
              type="number"
              formControlName="duracion"
              class="form-input"
              [class.input-error]="campoInvalido('duracion')"
              placeholder="Ej: 120"
            />
            @if (campoInvalido('duracion')) {
              <span class="error-msg">
                @if (form.get('duracion')?.errors?.['required']) { La duración es obligatoria. }
                @if (form.get('duracion')?.errors?.['min']) { Mínimo 1 minuto. }
              </span>
            }
          </div>

          <div class="form-group">
            <label for="generoId" class="form-label">Género</label>
            <select
              id="generoId"
              formControlName="generoId"
              class="form-input form-select"
              [class.input-error]="campoInvalido('generoId')"
            >
              <option value="">-- Selecciona un género --</option>
              @for (genero of generos; track genero.id) {
                <option [value]="genero.id">{{ genero.nombre }}</option>
              }
            </select>
            @if (campoInvalido('generoId')) {
              <span class="error-msg">El género es obligatorio.</span>
            }
          </div>

          <div class="form-group">
            <label for="sinopsis" class="form-label">Sinopsis</label>
            <textarea
              id="sinopsis"
              formControlName="sinopsis"
              class="form-input form-textarea"
              [class.input-error]="campoInvalido('sinopsis')"
              placeholder="Breve descripción de la trama..."
              rows="4"
            ></textarea>
            @if (campoInvalido('sinopsis')) {
              <span class="error-msg">
                @if (form.get('sinopsis')?.errors?.['required']) { La sinopsis es obligatoria. }
                @if (form.get('sinopsis')?.errors?.['maxlength']) { Máximo 500 caracteres. }
              </span>
            }
          </div>

          <div class="form-actions">
            <a routerLink="/generos" class="btn-cancel">Cancelar</a>
            <button
              type="submit"
              class="btn-submit"
              [disabled]="form.invalid || enviando"
            >
              {{ enviando ? 'Guardando...' : (esEdicion ? 'Actualizar' : 'Crear Película') }}
            </button>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .form-card {
      background: #13131f;
      border: 1px solid #1e1e2e;
      border-radius: 8px;
      overflow: hidden;
    }

    .form-header {
      padding: 2rem 2rem 0;
    }

    .back-link {
      color: #6060a0;
      text-decoration: none;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      transition: color 0.2s;
      display: inline-block;
      margin-bottom: 1.5rem;
    }

    .back-link:hover {
      color: #f0c040;
    }

    .form-title {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      color: #f0f0ff;
      margin: 0 0 2rem;
    }

    .form-body {
      padding: 0 2rem 2rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      color: #a0a0c0;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .form-input {
      width: 100%;
      background: #0a0a0f;
      border: 1px solid #2e2e4e;
      color: #f0f0ff;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      font-size: 0.95rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
      font-family: inherit;
    }

    .form-input:focus {
      outline: none;
      border-color: #f0c040;
    }

    .form-input.input-error {
      border-color: #c04040;
    }

    .form-select {
      cursor: pointer;
    }

    .form-select option {
      background: #13131f;
    }

    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }

    .error-msg {
      display: block;
      color: #c04040;
      font-size: 0.8rem;
      margin-top: 0.4rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #1e1e2e;
    }

    .btn-cancel {
      background: transparent;
      color: #6060a0;
      border: 1px solid #2e2e4e;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.2s;
    }

    .btn-cancel:hover {
      color: #f0f0ff;
      border-color: #6060a0;
    }

    .btn-submit {
      background: #f0c040;
      color: #0a0a0f;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-submit:hover:not(:disabled) {
      background: #ffd060;
    }

    .btn-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class PeliculaFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  enviando = false;
  peliculaId?: number;
  generos: Genero[] = [];

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const anioActual = new Date().getFullYear();

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      director: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1888), Validators.max(anioActual + 1)]],
      duracion: ['', [Validators.required, Validators.min(1)]],
      sinopsis: ['', [Validators.required, Validators.maxLength(500)]],
      generoId: ['', Validators.required]
    });

    // Cargar géneros para el select
    this.generoService.getAll().subscribe(data => {
      this.generos = data;
    });

    // Preseleccionar género si viene por query param
    const generoIdParam = this.route.snapshot.queryParamMap.get('generoId');
    if (generoIdParam) {
      this.form.patchValue({ generoId: +generoIdParam });
    }

    // Si es edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.peliculaId = +id;
      this.peliculaService.getById(this.peliculaId).subscribe(pelicula => {
        this.form.patchValue(pelicula);
      });
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    const formValue = { ...this.form.value, generoId: +this.form.value.generoId };

    const operacion$ = this.esEdicion
      ? this.peliculaService.update(this.peliculaId!, formValue)
      : this.peliculaService.create(formValue);

    operacion$.subscribe({
      next: () => this.router.navigate(['/generos']),
      error: () => { this.enviando = false; }
    });
  }
}
