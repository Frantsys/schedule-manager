package com.unixforge.schedule_manager.modules.Catalog.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CatalogStatusActivationRequest {
    
    @NotNull(message = "Status de serviço não pode ser nulo")
    private Boolean isActive;

}
