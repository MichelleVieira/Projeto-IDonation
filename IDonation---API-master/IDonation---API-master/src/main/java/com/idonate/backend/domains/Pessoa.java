package com.idonate.backend.domains;

import java.io.Serializable;

import javax.validation.constraints.Email;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.idonate.backend.domains.pass.PessoaPass;

@Document
public class Pessoa extends Doador implements Serializable {
	static final long serialVersionUID = 1L;

	@Id
	private String id;
	private String nome;
	private String sobrenome;
	@Email
	@Indexed(unique = true)
	private String email;

	private PessoaPass pass;

	public Pessoa() {
	}
	
	public Pessoa(String nome, String sobrenome, @Email String email, PessoaPass pass) {
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.email = email;
		this.pass = pass;
	}
	
	@PersistenceConstructor
	public Pessoa(String id, String nome, String sobrenome, @Email String email, PessoaPass pass) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.email = email;
		this.pass = pass;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}


	public PessoaPass getPass() {
		return pass;
	}

	public void setPass(PessoaPass pass) {
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
		Pessoa other = (Pessoa) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
