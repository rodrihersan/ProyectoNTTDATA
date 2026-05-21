import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pelicula, PeliculaForm } from '../models/pelicula.model';

const API_URL = 'http://localhost:8080/api';

const MOCK_PELICULAS: Pelicula[] = [
  { id: 1, titulo: 'Mad Max: Furia en la Carretera', director: 'George Miller', anio: 2015, sinopsis: 'En un futuro postapocalíptico, Max se une a Furiosa para escapar de un tirano del desierto.', duracion: 120, generoId: 1 },
  { id: 2, titulo: 'John Wick', director: 'Chad Stahelski', anio: 2014, sinopsis: 'Un ex asesino vuelve al mundo criminal para vengar la muerte de su perro.', duracion: 101, generoId: 1 },
  { id: 3, titulo: 'El Padrino', director: 'Francis Ford Coppola', anio: 1972, sinopsis: 'La historia de la familia mafiosa Corleone y su lucha por el poder.', duracion: 175, generoId: 2 },
  { id: 4, titulo: 'Forrest Gump', director: 'Robert Zemeckis', anio: 1994, sinopsis: 'La vida de un hombre con baja inteligencia que vivió momentos clave de la historia americana.', duracion: 142, generoId: 2 },
  { id: 5, titulo: 'La Gran Evasión', director: 'John Sturges', anio: 1963, sinopsis: 'Prisioneros de guerra aliados planean una fuga masiva de un campo alemán.', duracion: 172, generoId: 2 },
  { id: 6, titulo: 'Superbad', director: 'Greg Mottola', anio: 2007, sinopsis: 'Dos amigos intentan conseguir alcohol para una fiesta antes de terminar el instituto.', duracion: 113, generoId: 3 },
  { id: 7, titulo: 'El Conjuro', director: 'James Wan', anio: 2013, sinopsis: 'Una familia llama a investigadores paranormales tras aterradoras experiencias en su nueva casa.', duracion: 112, generoId: 4 },
  { id: 8, titulo: 'Interstellar', director: 'Christopher Nolan', anio: 2014, sinopsis: 'Un equipo de astronautas viaja más allá de nuestra galaxia para encontrar un nuevo hogar para la humanidad.', duracion: 169, generoId: 5 },
  { id: 9, titulo: 'Blade Runner 2049', director: 'Denis Villeneuve', anio: 2017, sinopsis: 'Un agente de policía descubre un secreto que podría hundir a la sociedad.', duracion: 164, generoId: 5 },
];

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  peliculas = signal<Pelicula[]>([]);
  cargando = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pelicula[]> {
    this.cargando.set(true);
    return this.http.get<Pelicula[]>(`${API_URL}/peliculas`).pipe(
      tap(data => {
        this.peliculas.set(data);
        this.cargando.set(false);
      }),
      catchError(() => {
        this.peliculas.set(MOCK_PELICULAS);
        this.cargando.set(false);
        return of(MOCK_PELICULAS);
      })
    );
  }

  getByGenero(generoId: number): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${API_URL}/generos/${generoId}/peliculas`).pipe(
      catchError(() => {
        const filtradas = MOCK_PELICULAS.filter(p => p.generoId === generoId);
        return of(filtradas);
      })
    );
  }

  getById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${API_URL}/peliculas/${id}`).pipe(
      catchError(() => {
        const pelicula = MOCK_PELICULAS.find(p => p.id === id);
        return of(pelicula!);
      })
    );
  }

  create(form: PeliculaForm): Observable<Pelicula> {
    return this.http.post<Pelicula>(`${API_URL}/peliculas`, form).pipe(
      tap(nueva => this.peliculas.update(lista => [...lista, nueva])),
      catchError(() => {
        const nueva: Pelicula = { id: Date.now(), ...form };
        this.peliculas.update(lista => [...lista, nueva]);
        return of(nueva);
      })
    );
  }

  update(id: number, form: PeliculaForm): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${API_URL}/peliculas/${id}`, form).pipe(
      tap(actualizada => {
        this.peliculas.update(lista =>
          lista.map(p => p.id === id ? actualizada : p)
        );
      }),
      catchError(() => {
        const actualizada: Pelicula = { id, ...form };
        this.peliculas.update(lista =>
          lista.map(p => p.id === id ? actualizada : p)
        );
        return of(actualizada);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/peliculas/${id}`).pipe(
      tap(() => this.peliculas.update(lista => lista.filter(p => p.id !== id))),
      catchError(() => {
        this.peliculas.update(lista => lista.filter(p => p.id !== id));
        return of(undefined);
      })
    );
  }
}
