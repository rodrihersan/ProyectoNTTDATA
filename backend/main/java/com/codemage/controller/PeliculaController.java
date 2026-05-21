package com.codemage.controller;

import com.codemage.dto.PeliculaRequestDTO;
import com.codemage.dto.PeliculaResponseDTO;
import com.codemage.service.PeliculaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/peliculas")
@CrossOrigin(origins = "http://localhost:4200")
public class PeliculaController {

    private final PeliculaService peliculaService;

    public PeliculaController(PeliculaService peliculaService) {
        this.peliculaService = peliculaService;
    }

    // GET /api/peliculas
    @GetMapping
    public ResponseEntity<List<PeliculaResponseDTO>> getAll() {
        return ResponseEntity.ok(peliculaService.findAll());
    }

    // GET /api/peliculas/{id}
    @GetMapping("/{id}")
    public ResponseEntity<PeliculaResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(peliculaService.findById(id));
    }

    // POST /api/peliculas
    @PostMapping
    public ResponseEntity<PeliculaResponseDTO> create(@Valid @RequestBody PeliculaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(peliculaService.create(dto));
    }

    // PUT /api/peliculas/{id}
    @PutMapping("/{id}")
    public ResponseEntity<PeliculaResponseDTO> update(@PathVariable Long id,
                                                      @Valid @RequestBody PeliculaRequestDTO dto) {
        return ResponseEntity.ok(peliculaService.update(id, dto));
    }

    // DELETE /api/peliculas/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        peliculaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
