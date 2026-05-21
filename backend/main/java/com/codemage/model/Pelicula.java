package com.codemage.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "pelicula")
public class Pelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Todos los campos con los nombres exactos que usa el frontend
    @NotBlank(message = "El título no puede estar vacío")
    @Column(nullable = false)
    private String titulo;

    @NotBlank(message = "El director no puede estar vacío")
    @Column(nullable = false)
    private String director;

    @NotNull(message = "El año no puede ser nulo")
    @Min(value = 1888, message = "El año debe ser mayor a 1888")
    @Max(value = 2100, message = "El año no puede ser mayor a 2100")
    @Column(nullable = false)
    private Integer anio;

    @NotBlank(message = "La sinopsis no puede estar vacía")
    @Column(nullable = false, length = 1000)
    private String sinopsis;

    @NotNull(message = "La duración no puede ser nula")
    @Min(value = 1, message = "La duración debe ser mayor a 0 minutos")
    @Column(nullable = false)
    private Integer duracion;

    // "imagen" es opcional en el frontend (imagen?)
    @Column
    private String imagen;

    // Relación M:1 con Genero
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genero_id", nullable = false)
    @JsonBackReference
    private Genero genero;

    public Pelicula() {}

    public Pelicula(String titulo, String director, Integer anio,
                    String sinopsis, Integer duracion, Genero genero) {
        this.titulo = titulo;
        this.director = director;
        this.anio = anio;
        this.sinopsis = sinopsis;
        this.duracion = duracion;
        this.genero = genero;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public String getSinopsis() { return sinopsis; }
    public void setSinopsis(String sinopsis) { this.sinopsis = sinopsis; }

    public Integer getDuracion() { return duracion; }
    public void setDuracion(Integer duracion) { this.duracion = duracion; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public Genero getGenero() { return genero; }
    public void setGenero(Genero genero) { this.genero = genero; }
}
