import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Genero, GeneroForm } from '../models/genero.model';

const API_URL = 'http://localhost:8080/api';

// Datos mock para trabajar sin backend
const MOCK_GENEROS: Genero[] = [
  { id: 1, nombre: 'Acción', descripcion: 'Películas llenas de adrenalina, persecuciones y combates.' },
  { id: 2, nombre: 'Drama', descripcion: 'Historias profundas y emotivas centradas en personajes.' },
  { id: 3, nombre: 'Comedia', descripcion: 'Películas diseñadas para hacer reír al espectador.' },
  { id: 4, nombre: 'Terror', descripcion: 'Películas que buscan provocar miedo y tensión.' },
  { id: 5, nombre: 'Ciencia Ficción', descripcion: 'Historias ambientadas en el futuro o con tecnología avanzada.' },
];

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  // Signal para estado reactivo
  generos = signal<Genero[]>([]);
  cargando = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getAll(): Observable<Genero[]> {
    this.cargando.set(true);
    return this.http.get<Genero[]>(`${API_URL}/generos`).pipe(
      tap(data => {
        this.generos.set(data);
        this.cargando.set(false);
      }),
      catchError(() => {
        // Si el backend no está disponible, usamos mock
        this.generos.set(MOCK_GENEROS);
        this.cargando.set(false);
        return of(MOCK_GENEROS);
      })
    );
  }

  getById(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${API_URL}/generos/${id}`).pipe(
      catchError(() => {
        const genero = MOCK_GENEROS.find(g => g.id === id);
        return of(genero!);
      })
    );
  }

  create(form: GeneroForm): Observable<Genero> {
    return this.http.post<Genero>(`${API_URL}/generos`, form).pipe(
      tap(nuevo => this.generos.update(lista => [...lista, nuevo])),
      catchError(() => {
        const nuevo: Genero = { id: Date.now(), ...form };
        this.generos.update(lista => [...lista, nuevo]);
        return of(nuevo);
      })
    );
  }

  update(id: number, form: GeneroForm): Observable<Genero> {
    return this.http.put<Genero>(`${API_URL}/generos/${id}`, form).pipe(
      tap(actualizado => {
        this.generos.update(lista =>
          lista.map(g => g.id === id ? actualizado : g)
        );
      }),
      catchError(() => {
        const actualizado: Genero = { id, ...form };
        this.generos.update(lista =>
          lista.map(g => g.id === id ? actualizado : g)
        );
        return of(actualizado);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/generos/${id}`).pipe(
      tap(() => this.generos.update(lista => lista.filter(g => g.id !== id))),
      catchError(() => {
        this.generos.update(lista => lista.filter(g => g.id !== id));
        return of(undefined);
      })
    );
  }
}
