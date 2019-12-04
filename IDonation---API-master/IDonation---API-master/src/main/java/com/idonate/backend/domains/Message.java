package com.idonate.backend.domains;

import org.springframework.data.annotation.Id;

/**
 * Classe para na qual serão enviadas as mensagens
 */
public class Message {

    @Id
    private String idMessage;

    private String idSender;

    private String idReceiver;

    private String message;

    public Message(String idMessage, String idSender, String idReceiver, String message) {
        this.idMessage = idMessage;
        this.idSender = idSender;
        this.idReceiver = idReceiver;
        this.message = message;
    }

	public String getIdMessage() {
		return this.idMessage;
    }

    public void setIdMessage(String idMessage) {
        this.idMessage = idMessage;
    }

    public String getIdSender() {
        return this.idSender;
    }

    public void setIdSender(String idSender) {
        this.idSender = idSender;
    }

    public String getIdReceiver() {
        return this.idReceiver;
    }

    public void setIdReceiver(String idReceiver) {
        this.idReceiver = idReceiver;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    
}