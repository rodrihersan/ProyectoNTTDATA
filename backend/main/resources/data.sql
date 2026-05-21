ALTER TABLE genero ALTER COLUMN id RESTART WITH 10;
ALTER TABLE pelicula ALTER COLUMN id RESTART WITH 10;

-- Géneros (mismos que los mock del frontend)
INSERT INTO genero (id, nombre, descripcion) VALUES (1, 'Acción', 'Películas llenas de adrenalina, persecuciones y combates.');
INSERT INTO genero (id, nombre, descripcion) VALUES (2, 'Drama', 'Historias profundas y emotivas centradas en personajes.');
INSERT INTO genero (id, nombre, descripcion) VALUES (3, 'Comedia', 'Películas diseñadas para hacer reír al espectador.');
INSERT INTO genero (id, nombre, descripcion) VALUES (4, 'Terror', 'Películas que buscan provocar miedo y tensión.');
INSERT INTO genero (id, nombre, descripcion) VALUES (5, 'Ciencia Ficción', 'Historias ambientadas en el futuro o con tecnología avanzada.');

-- Películas (mismas que los mock del frontend)
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (1, 'Mad Max: Furia en la Carretera', 'George Miller', 2015, 'En un futuro postapocalíptico, Max se une a Furiosa para escapar de un tirano del desierto.', 120, 1);
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (2, 'John Wick', 'Chad Stahelski', 2014, 'Un ex asesino vuelve al mundo criminal para vengar la muerte de su perro.', 101, 1);
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (3, 'El Padrino', 'Francis Ford Coppola', 1972, 'La historia de la familia mafiosa Corleone y su lucha por el poder.', 175, 2);
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (4, 'Forrest Gump', 'Robert Zemeckis', 1994, 'La vida de un hombre con baja inteligencia que vivió momentos clave de la historia americana.', 142, 2);
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (5, 'La Gran Evasión', 'John Sturges', 1963, 'Prisioneros de guerra aliados planean una fuga masiva de un campo alemán.', 172, 2);
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (6, 'Superbad', 'Greg Mottola', 2007, 'Dos amigos intentan conseguir alcohol para una fiesta antes de terminar el instituto.', 113, 3);
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (7, 'El Conjuro', 'James Wan', 2013, 'Una familia llama a investigadores paranormales tras aterradoras experiencias en su nueva casa.', 112, 4);
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (8, 'Interstellar', 'Christopher Nolan', 2014, 'Un equipo de astronautas viaja más allá de nuestra galaxia para encontrar un nuevo hogar para la humanidad.', 169, 5);
INSERT INTO pelicula (id, titulo, director, anio, sinopsis, duracion, genero_id) VALUES (9, 'Blade Runner 2049', 'Denis Villeneuve', 2017, 'Un agente de policía descubre un secreto que podría hundir a la sociedad.', 164, 5);
