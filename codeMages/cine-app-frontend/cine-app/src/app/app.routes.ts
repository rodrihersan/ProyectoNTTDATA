import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'generos',
    pathMatch: 'full'
  },
  {
    path: 'generos',
    loadComponent: () =>
      import('./features/generos/pages/generos-list/generos-list.component')
        .then(m => m.GenerosListComponent)
  },
  {
    path: 'generos/nuevo',
    loadComponent: () =>
      import('./features/generos/pages/genero-form/genero-form.component')
        .then(m => m.GeneroFormComponent)
  },
  {
    path: 'generos/:id/editar',
    loadComponent: () =>
      import('./features/generos/pages/genero-form/genero-form.component')
        .then(m => m.GeneroFormComponent)
  },
  {
    path: 'generos/:id/peliculas',
    loadComponent: () =>
      import('./features/peliculas/pages/peliculas-list/peliculas-list.component')
        .then(m => m.PeliculasListComponent)
  },
  {
    path: 'peliculas/nueva',
    loadComponent: () =>
      import('./features/peliculas/pages/pelicula-form/pelicula-form.component')
        .then(m => m.PeliculaFormComponent)
  },
  {
    path: 'peliculas/:id/editar',
    loadComponent: () =>
      import('./features/peliculas/pages/pelicula-form/pelicula-form.component')
        .then(m => m.PeliculaFormComponent)
  },
  {
    path: '**',
    redirectTo: 'generos'
  }
];
