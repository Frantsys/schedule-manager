package com.unixforge.schedule_manager.exception;

/**
 * Violação de regra de negócio, como senha atual incorreta (HTTP 400).
 */
public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }

}
