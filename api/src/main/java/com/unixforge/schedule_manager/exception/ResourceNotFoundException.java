package com.unixforge.schedule_manager.exception;

/**
 * Recurso não encontrado (HTTP 404).
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

}
