package com.codemage.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "genero")
public class Genero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // "nombre" coincide con el campo que espera el frontend
    @NotBlank(message = "El nombre del género no puede estar vacío")
    @Column(nullable = false, unique = true)
    private String nombre;

    // "descripcion" coincide con el campo que espera el frontend
    @NotBlank(message = "La descripción no puede estar vacía")
    @Column(nullable = false)
    private String descripcion;

    // "imagen" es opcional en el frontend (imagen?)
    @Column
    private String imagen;

    // Un género tiene muchas películas (relación 1:M)
    @OneToMany(mappedBy = "genero", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Pelicula> peliculas = new ArrayList<>();

    public Genero() {}

    public Genero(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public List<Pelicula> getPeliculas() { return peliculas; }
    public void setPeliculas(List<Pelicula> peliculas) { this.peliculas = peliculas; }
}
