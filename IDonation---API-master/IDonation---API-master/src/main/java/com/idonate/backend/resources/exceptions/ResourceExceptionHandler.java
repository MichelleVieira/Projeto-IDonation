package com.idonate.backend.resources.exceptions;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.idonate.backend.services.exceptions.AuthenticationFailedException;
import com.idonate.backend.services.exceptions.ObjectNotFoundException;
import com.mongodb.MongoWriteException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler
	public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e, HttpServletRequest request){
		HttpStatus status = HttpStatus.NO_CONTENT;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Não encontrado!",
				e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}

	@ExceptionHandler
	public ResponseEntity<StandardError> autenticationNotFound(AuthenticationFailedException e, HttpServletRequest request){
		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Erro ao autenticar!",
				e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}

	@ExceptionHandler
	public ResponseEntity<StandardError> autenticationNotFound(MongoWriteException e, HttpServletRequest request){
		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Elemento já exite na base de dados",
				e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}
	
}
