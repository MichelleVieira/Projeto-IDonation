package com.idonate.backend.domains;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

public class Match implements Serializable{
    static final long serialVersionUID = 1L;

    @Id
    private String idMatch;

    private String idDoador;

    private String idOng;
    
    private String idDoacao;

    public Match(String idMatch, String idDoador, String idOng, String idDoacao) {
        this.idMatch = idMatch;
        this.idDoador = idDoador;
        this.idOng = idOng;
        this.idDoacao = idDoacao;
    }

    public Match(){}

    public String getidDoacao() {
        return this.idDoacao;
    }

    public void setidDoacao(String idDoacao) {
        this.idDoacao = idDoacao;
    }

    public String getIdMatch() {
        return this.idMatch;
    }

    public void setIdMatch(String idMatch) {
        this.idMatch = idMatch;
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