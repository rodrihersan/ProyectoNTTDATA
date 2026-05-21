package com.codemage.service;

import com.codemage.dto.PeliculaRequestDTO;
import com.codemage.dto.PeliculaResponseDTO;
import com.codemage.model.Genero;
import com.codemage.model.Pelicula;
import com.codemage.repository.PeliculaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PeliculaService {

    private final PeliculaRepository peliculaRepository;
    private final GeneroService generoService;

    public PeliculaService(PeliculaRepository peliculaRepository, GeneroService generoService) {
        this.peliculaRepository = peliculaRepository;
        this.generoService = generoService;
    }

    public List<PeliculaResponseDTO> findAll() {
        return peliculaRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public PeliculaResponseDTO findById(Long id) {
        Pelicula pelicula = peliculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Película no encontrada con id: " + id));
        return toResponseDTO(pelicula);
    }

    // Cubre el endpoint GET /api/generos/{generoId}/peliculas que usa el frontend
    public List<PeliculaResponseDTO> findByGeneroId(Long generoId) {
        generoService.findById(generoId); // verifica que el género existe
        return peliculaRepository.findByGeneroId(generoId)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public PeliculaResponseDTO create(PeliculaRequestDTO dto) {
        Genero genero = generoService.findById(dto.getGeneroId());
        Pelicula pelicula = new Pelicula(
                dto.getTitulo(), dto.getDirector(), dto.getAnio(),
                dto.getSinopsis(), dto.getDuracion(), genero
        );
        return toResponseDTO(peliculaRepository.save(pelicula));
    }

    public PeliculaResponseDTO update(Long id, PeliculaRequestDTO dto) {
        Pelicula existing = peliculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Película no encontrada con id: " + id));

        Genero genero = generoService.findById(dto.getGeneroId());
        existing.setTitulo(dto.getTitulo());
        existing.setDirector(dto.getDirector());
        existing.setAnio(dto.getAnio());
        existing.setSinopsis(dto.getSinopsis());
        existing.setDuracion(dto.getDuracion());
        existing.setGenero(genero);

        return toResponseDTO(peliculaRepository.save(existing));
    }

    public void delete(Long id) {
        Pelicula pelicula = peliculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Película no encontrada con id: " + id));
        peliculaRepository.delete(pelicula);
    }

    private PeliculaResponseDTO toResponseDTO(Pelicula p) {
        return new PeliculaResponseDTO(
                p.getId(),
                p.getTitulo(),
                p.getDirector(),
                p.getAnio(),
                p.getSinopsis(),
                p.getDuracion(),
                p.getGenero().getId(),
                p.getImagen()
        );
    }
}
