# 🎬 CineApp — Frontend Angular 21

Aplicación web de gestión de un cine. Frontend desarrollado en **Angular 21** con todos los requisitos obligatorios del proyecto.

---

## ▶️ Cómo arrancar el proyecto

### Requisitos previos
- Node.js 20+ instalado
- Angular CLI 21: `npm install -g @angular/cli@21`

### Pasos
```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar el servidor de desarrollo
ng serve

# 3. Abrir en el navegador
http://localhost:4200
```

> **Sin backend:** La app funciona con datos mock. Cuando el backend esté listo, simplemente arranca Spring Boot en `localhost:8080` y todo funcionará automáticamente.

---

## 📁 Estructura del proyecto

```
src/app/
├── core/
│   ├── models/
│   │   ├── genero.model.ts      → Interfaces Genero y GeneroForm
│   │   └── pelicula.model.ts    → Interfaces Pelicula y PeliculaForm
│   └── services/
│       ├── genero.service.ts    → CRUD de géneros (Observables + Signals)
│       └── pelicula.service.ts  → CRUD de películas (Observables + Signals)
├── features/
│   ├── generos/
│   │   └── pages/
│   │       ├── generos-list/    → Lista de géneros
│   │       └── genero-form/     → Formulario crear/editar género
│   └── peliculas/
│       └── pages/
│           ├── peliculas-list/  → Lista de películas por género
│           └── pelicula-form/   → Formulario crear/editar película
├── app.component.ts             → Componente raíz (navbar)
├── app.routes.ts                → Rutas con lazy loading
└── app.config.ts                → Configuración (HttpClient, Router)
```

---

## ✅ Requisitos cubiertos

| Requisito | Implementación |
|-----------|----------------|
| Componentes StandAlone | Todos los componentes usan `standalone: true` |
| Signals | `generos = signal<Genero[]>([])` y `cargando = signal<boolean>()` en servicios |
| Formularios reactivos | `FormBuilder`, `FormGroup`, `Validators` en ambos formularios |
| Llamadas a API REST | `HttpClient` en `GeneroService` y `PeliculaService` |
| Observables en servicios | Todos los métodos devuelven `Observable<T>` con `catchError` |
| Navegación (Rutas) | `app.routes.ts` con lazy loading y `RouterLink` |

---

## 🔌 Endpoints que necesita el backend (Spring Boot)

El frontend espera la API en `http://localhost:8080/api`.

### Géneros

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/generos` | Obtener todos los géneros |
| GET | `/api/generos/{id}` | Obtener un género por ID |
| POST | `/api/generos` | Crear un género |
| PUT | `/api/generos/{id}` | Actualizar un género |
| DELETE | `/api/generos/{id}` | Eliminar un género |

### Películas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/peliculas` | Obtener todas las películas |
| GET | `/api/peliculas/{id}` | Obtener una película por ID |
| GET | `/api/generos/{id}/peliculas` | Películas de un género (relación 1:M) |
| POST | `/api/peliculas` | Crear una película |
| PUT | `/api/peliculas/{id}` | Actualizar una película |
| DELETE | `/api/peliculas/{id}` | Eliminar una película |

### Modelos JSON esperados

**Género:**
```json
{
  "id": 1,
  "nombre": "Acción",
  "descripcion": "Películas llenas de adrenalina"
}
```

**Película:**
```json
{
  "id": 1,
  "titulo": "Mad Max",
  "director": "George Miller",
  "anio": 2015,
  "sinopsis": "...",
  "duracion": 120,
  "generoId": 1
}
```

---

## 🗺️ Rutas de la aplicación

| Ruta | Componente |
|------|-----------|
| `/generos` | Lista de géneros |
| `/generos/nuevo` | Formulario nuevo género |
| `/generos/:id/editar` | Formulario editar género |
| `/generos/:id/peliculas` | Películas de un género |
| `/peliculas/nueva` | Formulario nueva película |
| `/peliculas/:id/editar` | Formulario editar película |
