package com.unixforge.schedule_manager.modules.schedule.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleCreateDTO {
    
    @NotBlank(message = "Cliente é obrigatório")
    private Long customerId;

    @NotBlank(message = "Profissional é obrigatório")
    private Long professionalId;

    @NotBlank(message = "Serviço é obrigatório")
    private Long catalogId;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 5, max = 500, message = "Descrição deve ter entre 5 a 500 caracteres")
    private String description;

    @NotBlank(message = "Data inicial é obrigatória")
    @Future(message = "Data de inicial deve estar no futuro")
    private LocalDate initialDate;

    @NotBlank(message = "Data de início é obrigatória")
    @Future(message = "Data de início deve estar no futuro")
    private LocalDate startTime;

    @NotBlank(message = "Data de conclusão é obrigatória")
    @Future(message = "Data de conclusão deve estar no futuro")
    private LocalDate endTime;

}
