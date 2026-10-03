package com.unixforge.schedule_manager.modules.Schedule.dto.request;

import com.unixforge.schedule_manager.modules.Schedule.model.ScheduleStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleUpdateActivationRequest {
    
    @NotNull(message = "Status é obrigatório")
    private ScheduleStatus status;

}
