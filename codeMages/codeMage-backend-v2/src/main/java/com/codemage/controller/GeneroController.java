package com.codemage.controller;

import com.codemage.dto.PeliculaResponseDTO;
import com.codemage.model.Genero;
import com.codemage.service.GeneroService;
import com.codemage.service.PeliculaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/generos")
@CrossOrigin(origins = "http://localhost:4200")
public class GeneroController {

    private final GeneroService generoService;
    private final PeliculaService peliculaService;

    public GeneroController(GeneroService generoService, PeliculaService peliculaService) {
        this.generoService = generoService;
        this.peliculaService = peliculaService;
    }

    // GET /api/generos
    @GetMapping
    public ResponseEntity<List<Genero>> getAll() {
        return ResponseEntity.ok(generoService.findAll());
    }

    // GET /api/generos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Genero> getById(@PathVariable Long id) {
        return ResponseEntity.ok(generoService.findById(id));
    }

    // GET /api/generos/{id}/peliculas  ← URL exacta que usa el frontend
    @GetMapping("/{id}/peliculas")
    public ResponseEntity<List<PeliculaResponseDTO>> getPeliculas(@PathVariable Long id) {
        return ResponseEntity.ok(peliculaService.findByGeneroId(id));
    }

    // POST /api/generos
    @PostMapping
    public ResponseEntity<Genero> create(@Valid @RequestBody Genero genero) {
        return ResponseEntity.status(HttpStatus.CREATED).body(generoService.create(genero));
    }

    // PUT /api/generos/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Genero> update(@PathVariable Long id,
                                         @Valid @RequestBody Genero genero) {
        return ResponseEntity.ok(generoService.update(id, genero));
    }

    // DELETE /api/generos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        generoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
