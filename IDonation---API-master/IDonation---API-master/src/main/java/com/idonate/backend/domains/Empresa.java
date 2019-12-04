package com.idonate.backend.domains;

import java.io.Serializable;

import javax.validation.constraints.Email;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.idonate.backend.domains.pass.JuridicoPass;

@Document
public class Empresa extends Doador implements Serializable {
	static final long serialVersionUID = 1L;

	@Id
	private String id;
	@Email
	@Indexed(unique = true)
	private String email;
	private String razao_social;

	private JuridicoPass pass;

	public Empresa() {
	}

	public Empresa(String id, @Email String email, String razao_social, JuridicoPass pass) {
		this.id = id;
		this.email = email;
		this.razao_social = razao_social;
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

	public String getRazao_social() {
		return razao_social;
	}

	public void setRazao_social(String razao_social) {
		this.razao_social = razao_social;
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
		Empresa other = (Empresa) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
