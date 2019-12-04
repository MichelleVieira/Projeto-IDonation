package com.idonate.backend.domains;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "donations")
@TypeAlias("donation")
public class Donation {

	@Id
	private String idDoacao;

	private String tipoDoacao;

	private String descricao;

	private String dataCriacao;

	private String categoria;
	
	@DBRef(lazy = true)
	private Empresa empresa;

	@DBRef(lazy = true)
	private Pessoa pessoa;

	@DBRef(lazy = true)
	private List<Organizacao> ong;

	public Donation() {}
	
	public Donation(String idDoacao, String tipoDoacao, String descricao, String dataCriacao, String categoria,
			Empresa empresa, Pessoa pessoa, List<Organizacao> ong, String nmOng) {
		this.idDoacao = idDoacao;
		this.tipoDoacao = tipoDoacao;
		this.descricao = descricao;
		this.dataCriacao = dataCriacao;
		this.categoria = categoria;
		this.empresa = empresa;
		this.pessoa = pessoa;
		this.ong = ong;
	}

	public String getIdDoacao() {
		return this.idDoacao;
	}

	public void setIdDoacao(String idDoacao) {
		this.idDoacao = idDoacao;
	}

	public String getTipoDoacao() {
		return this.tipoDoacao;
	}

	public void setTipoDoacao(String tipoDoacao) {
		this.tipoDoacao = tipoDoacao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getDataCriacao() {
		return this.dataCriacao;
	}

	public void setDataCriacao(String dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public List<Organizacao> getOng() {
		return ong;
	}

	public void setOng(List<Organizacao> ong) {
		this.ong = ong;
	}

	public List<Organizacao> getOrganizacao() {
		return this.ong;
	}

	public void setOrganizacao(List<Organizacao> ong) {
		this.ong = ong;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idDoacao == null) ? 0 : idDoacao.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Donation other = (Donation) obj;
		if (idDoacao == null) {
			if (other.idDoacao != null)
				return false;
		} else if (!idDoacao.equals(other.idDoacao))
			return false;
		return true;
	}

}