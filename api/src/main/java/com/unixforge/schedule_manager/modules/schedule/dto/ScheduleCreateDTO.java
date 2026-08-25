package com.unixforge.schedule_manager.modules.schedule.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "Data e hora são obrigatórias")
    @Future(message = "A data do agendamento deve ser no futuro")
    private LocalDateTime dateTime;

}
