package com.unixforge.schedule_manager.modules.Catalog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;

@Getter
@Setter
public class CatalogCreateRequest {

    @NotNull(message = "Profissional é obrigatório")
    private Long professionalId;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotNull(message = "Duração é obrigatória")
    private Duration duration;

    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser maior que zero")
    private Double price;

}
