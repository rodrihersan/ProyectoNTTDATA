export interface Pelicula {
  id: number;
  titulo: string;
  director: string;
  anio: number;
  sinopsis: string;
  duracion: number; // en minutos
  generoId: number;
  imagen?: string;
}

export interface PeliculaForm {
  titulo: string;
  director: string;
  anio: number;
  sinopsis: string;
  duracion: number;
  generoId: number;
}
