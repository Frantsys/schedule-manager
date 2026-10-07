package com.unixforge.schedule_manager.modules.Schedule.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ScheduleCreateRequest {

    @NotNull(message = "Cliente é obrigatório")
    private Long customerId;

    @NotNull(message = "Profissional é obrigatório")
    private Long professionalId;

    @NotNull(message = "Serviço é obrigatório")
    private Long catalogId;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 5, max = 500, message = "Descrição deve ter entre 5 e 500 caracteres")
    private String description;

    @NotNull(message = "Data inicial é obrigatória")
    @FutureOrPresent(message = "Data inicial não pode estar no passado")
    private LocalDate startDate;

    @NotNull(message = "Data de conclusão é obrigatória")
    @FutureOrPresent(message = "Data de conclusão não pode estar no passado")
    private LocalDate endDate;

    @NotNull(message = "Horário de início é obrigatório")
    private LocalTime startTime;

    @NotNull(message = "Horário de conclusão é obrigatório")
    private LocalTime endTime;

}
