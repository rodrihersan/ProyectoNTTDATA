# ProyectoNTTDATA - CineApp

Aplicación full stack de gestión de películas por géneros.

## Tecnologías
- Frontend: Angular 21
- Backend: Java Spring Boot
- Base de datos: H2 (en memoria)

## Arranque

### Backend
1. Abrir la carpeta backend en VS Code
2. Ejecutar CodeMageApplication.java
3. El servidor arranca en http://localhost:8080

### Frontend
1. Entrar en la carpeta del proyecto Angular:
bash
   cd frontend/cine-app
   npm install --legacy-peer-deps
   ng serve

2. Abrir http://localhost:4200

## Endpoints API
- GET /api/generos
- POST /api/generos
- PUT /api/generos/{id}
- DELETE /api/generos/{id}
- GET /api/generos/{id}/peliculas
- POST /api/peliculas
- PUT /api/peliculas/{id}
- DELETE /api/peliculas/{id}
