package com.codemage.repository;

import com.codemage.model.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {

    // Películas de un género — cubre el endpoint /api/generos/{id}/peliculas del frontend
    List<Pelicula> findByGeneroId(Long generoId);

    List<Pelicula> findByTituloContainingIgnoreCase(String titulo);
}
