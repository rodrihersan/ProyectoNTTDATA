import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GeneroService } from '../../../../core/services/genero.service';

@Component({
  selector: 'app-genero-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="form-card">
        <div class="form-header">
          <a routerLink="/generos" class="back-link">← Volver a géneros</a>
          <h1 class="form-title">{{ esEdicion ? 'Editar Género' : 'Nuevo Género' }}</h1>
        </div>

        <form [formGroup]="form" (ngSubmit)="guardar()" class="form-body">

          <div class="form-group">
            <label for="nombre" class="form-label">Nombre</label>
            <input
              id="nombre"
              type="text"
              formControlName="nombre"
              class="form-input"
              [class.input-error]="campoInvalido('nombre')"
              placeholder="Ej: Acción, Drama, Comedia..."
            />
            @if (campoInvalido('nombre')) {
              <span class="error-msg">
                @if (form.get('nombre')?.errors?.['required']) {
                  El nombre es obligatorio.
                }
                @if (form.get('nombre')?.errors?.['minlength']) {
                  Mínimo 2 caracteres.
                }
                @if (form.get('nombre')?.errors?.['maxlength']) {
                  Máximo 50 caracteres.
                }
              </span>
            }
          </div>

          <div class="form-group">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea
              id="descripcion"
              formControlName="descripcion"
              class="form-input form-textarea"
              [class.input-error]="campoInvalido('descripcion')"
              placeholder="Describe brevemente el género..."
              rows="4"
            ></textarea>
            @if (campoInvalido('descripcion')) {
              <span class="error-msg">
                @if (form.get('descripcion')?.errors?.['required']) {
                  La descripción es obligatoria.
                }
                @if (form.get('descripcion')?.errors?.['maxlength']) {
                  Máximo 300 caracteres.
                }
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
              {{ enviando ? 'Guardando...' : (esEdicion ? 'Actualizar' : 'Crear Género') }}
            </button>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 600px;
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
export class GeneroFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  enviando = false;
  generoId?: number;

  constructor(
    private fb: FormBuilder,
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.generoId = +id;
      this.generoService.getById(this.generoId).subscribe(genero => {
        this.form.patchValue(genero);
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
    const formValue = this.form.value;

    const operacion$ = this.esEdicion
      ? this.generoService.update(this.generoId!, formValue)
      : this.generoService.create(formValue);

    operacion$.subscribe({
      next: () => this.router.navigate(['/generos']),
      error: () => { this.enviando = false; }
    });
  }
}
