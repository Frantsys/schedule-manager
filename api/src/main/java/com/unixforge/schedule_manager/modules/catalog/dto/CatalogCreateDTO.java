package com.unixforge.schedule_manager.modules.catalog.dto;

import java.time.Duration;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CatalogCreateDTO {

    @NotBlank(message = "Profissional é obrigatório")
    private Long professionalId;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Duração é obrigatório")
    private Duration duration;

    @NotBlank(message = "Preço é obrigatório")
    private double price;
    
}
