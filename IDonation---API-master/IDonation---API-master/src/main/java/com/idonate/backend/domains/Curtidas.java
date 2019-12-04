package com.idonate.backend.domains;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "curtidas")
@TypeAlias("curtidas")
public class Curtidas{

    @Id
    private String idCurtida;

    private String idDoador;

    private String idOng;

    public Curtidas(String idCurtida, String idDoador, String idOng) {
        this.idCurtida = idCurtida;
        this.idDoador = idDoador;
        this.idOng = idOng;
    }

    public String getIdCurtida() {
        return this.idCurtida;
    }

    public void setIdCurtida(String idCurtida) {
        this.idCurtida = idCurtida;
    }

    public String getIdDoador() {
        return this.idDoador;
    }

    public void setIdDoador(String idDoador) {
        this.idDoador = idDoador;
    }

    public String getIdOng() {
        return this.idOng;
    }

    public void setIdOng(String idOng) {
        this.idOng = idOng;
    }
    
}