package com.idonate.backend.services.exceptions;

public class AuthenticationFailedException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public AuthenticationFailedException(String msg) {
		super(msg);
	}

}
