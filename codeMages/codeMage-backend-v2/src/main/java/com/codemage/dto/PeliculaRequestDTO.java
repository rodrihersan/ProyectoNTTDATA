package com.codemage.dto;

import jakarta.validation.constraints.*;

/**
 * Coincide exactamente con la interfaz PeliculaForm del frontend:
 * { titulo, director, anio, sinopsis, duracion, generoId }
 */
public class PeliculaRequestDTO {

    @NotBlank(message = "El título no puede estar vacío")
    private String titulo;

    @NotBlank(message = "El director no puede estar vacío")
    private String director;

    @NotNull(message = "El año no puede ser nulo")
    @Min(value = 1888, message = "El año debe ser mayor a 1888")
    @Max(value = 2100, message = "El año no puede ser mayor a 2100")
    private Integer anio;

    @NotBlank(message = "La sinopsis no puede estar vacía")
    private String sinopsis;

    @NotNull(message = "La duración no puede ser nula")
    @Min(value = 1, message = "La duración debe ser mayor a 0")
    private Integer duracion;

    @NotNull(message = "El género es obligatorio")
    private Long generoId;

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

    public Long getGeneroId() { return generoId; }
    public void setGeneroId(Long generoId) { this.generoId = generoId; }
}
