package com.codemage.service;

import com.codemage.model.Genero;
import com.codemage.repository.GeneroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneroService {

    private final GeneroRepository generoRepository;

    public GeneroService(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    public List<Genero> findAll() {
        return generoRepository.findAll();
    }

    public Genero findById(Long id) {
        return generoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Género no encontrado con id: " + id));
    }

    public Genero create(Genero genero) {
        if (generoRepository.existsByNombreIgnoreCase(genero.getNombre())) {
            throw new RuntimeException("Ya existe un género con el nombre: " + genero.getNombre());
        }
        return generoRepository.save(genero);
    }

    public Genero update(Long id, Genero generoData) {
        Genero existing = findById(id);

        generoRepository.findByNombreIgnoreCase(generoData.getNombre())
                .filter(g -> !g.getId().equals(id))
                .ifPresent(g -> { throw new RuntimeException("Ya existe un género con ese nombre"); });

        existing.setNombre(generoData.getNombre());
        existing.setDescripcion(generoData.getDescripcion());
        existing.setImagen(generoData.getImagen());
        return generoRepository.save(existing);
    }

    public void delete(Long id) {
        Genero genero = findById(id);
        if (!genero.getPeliculas().isEmpty()) {
            throw new RuntimeException("No se puede eliminar un género que tiene películas asociadas");
        }
        generoRepository.delete(genero);
    }
}
