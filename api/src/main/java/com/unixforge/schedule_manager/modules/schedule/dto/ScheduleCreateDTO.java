package com.unixforge.schedule_manager.modules.schedule.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleCreateDTO {
    
    @NotNull(message = "Cliente é obrigatório")
    private Long customerId;

    @NotNull(message = "Profissional é obrigatório")
    private Long professionalId;

    @NotNull(message = "Serviço é obrigatório")
    private Long catalogId;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 5, max = 500, message = "Descrição deve ter entre 5 a 500 caracteres")
    private String description;

    @NotNull(message = "Data inicial é obrigatória")
    @Future(message = "Data inicial deve estar no futuro")
    private LocalDate startDate;

    @NotNull(message = "Data de conclusão é obrigatória")
    @Future(message = "Data de conclusão deve estar no futuro")
    private LocalDate endDate;

    @NotNull(message = "Horário de início é obrigatório")
    private LocalTime startTime;

    @NotNull(message = "Horário de conclusão é obrigatório")
    private LocalTime endTime;

}
