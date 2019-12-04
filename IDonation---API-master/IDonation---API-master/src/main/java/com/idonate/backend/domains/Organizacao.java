package com.idonate.backend.domains;

import java.io.Serializable;

import javax.validation.constraints.Email;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.idonate.backend.domains.pass.JuridicoPass;

@Document
public class Organizacao implements Serializable {
	static final long serialVersionUID = 1L;

	@Id
	private String id;
	private String razao_social;
	private String descricao;
	private String categoria;
	@Email
	@Indexed(unique = true)
	private String email;
	
	private JuridicoPass pass;

	public Organizacao() {
	}

	public Organizacao(String id, String razao_social, String descricao, String categoria, @Email String email,
			JuridicoPass pass) {
		super();
		this.id = id;
		this.razao_social = razao_social;
		this.descricao = descricao;
		this.categoria = categoria;
		this.email = email;
		this.pass = pass;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRazao_social() {
		return razao_social;
	}

	public void setRazao_social(String razao_social) {
		this.razao_social = razao_social;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public JuridicoPass getPass() {
		return pass;
	}

	public void setPass(JuridicoPass pass) {
		this.pass = pass;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		Organizacao other = (Organizacao) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
