package com.unixforge.schedule_manager.modules.schedule.dto;

import java.time.LocalDate;
import java.util.List;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;

public record ScheduleFilterDTO(
    Long catalogId,
    Long professionalId,
    Long customerId,
    LocalDate startDate,
    LocalDate endDate,
    ScheduleStatus status,
    List<ScheduleStatus> multipleStatus
) {}
