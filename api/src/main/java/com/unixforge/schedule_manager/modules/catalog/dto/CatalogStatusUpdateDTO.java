package com.unixforge.schedule_manager.modules.catalog.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CatalogStatusUpdateDTO {
    
    @NotNull(message = "Status de serviço não pode ser nulo")
    private Boolean isActive;

}
