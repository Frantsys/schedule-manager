package com.unixforge.schedule_manager.modules.schedule.dto;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleUpdateStatusDTO {
    
    @NotNull(message = "Status é obrigatório")
    private ScheduleStatus status;

}
