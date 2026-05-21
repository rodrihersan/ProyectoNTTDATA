export interface Genero {
  id: number;
  nombre: string;
  descripcion: string;
  imagen?: string;
}

export interface GeneroForm {
  nombre: string;
  descripcion: string;
}
