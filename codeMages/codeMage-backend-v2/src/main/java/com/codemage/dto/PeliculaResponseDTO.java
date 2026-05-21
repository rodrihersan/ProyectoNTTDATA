package com.codemage.dto;

/**
 * Coincide exactamente con la interfaz Pelicula del frontend:
 * { id, titulo, director, anio, sinopsis, duracion, generoId, imagen? }
 */
public class PeliculaResponseDTO {

    private Long id;
    private String titulo;
    private String director;
    private Integer anio;
    private String sinopsis;
    private Integer duracion;
    private Long generoId;
    private String imagen;

    public PeliculaResponseDTO() {}

    public PeliculaResponseDTO(Long id, String titulo, String director, Integer anio,
                                String sinopsis, Integer duracion, Long generoId, String imagen) {
        this.id = id;
        this.titulo = titulo;
        this.director = director;
        this.anio = anio;
        this.sinopsis = sinopsis;
        this.duracion = duracion;
        this.generoId = generoId;
        this.imagen = imagen;
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

    public Long getGeneroId() { return generoId; }
    public void setGeneroId(Long generoId) { this.generoId = generoId; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
}
