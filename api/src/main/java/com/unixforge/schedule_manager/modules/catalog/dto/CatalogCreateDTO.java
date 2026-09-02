package com.unixforge.schedule_manager.modules.catalog.dto;

import java.time.Duration;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CatalogCreateDTO {

    @NotNull(message = "Profissional é obrigatório")
    private Long professionalId;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotNull(message = "Duração é obrigatório")
    private Duration duration;

    @Positive(message = "Preço deve ser maior que zero")
    private double price;
    
}
