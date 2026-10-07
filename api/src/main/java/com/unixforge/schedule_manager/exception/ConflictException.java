package com.unixforge.schedule_manager.exception;

/**
 * Conflito com o estado atual dos dados, como e-mail ou CPF já cadastrados (HTTP 409).
 */
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }

}
