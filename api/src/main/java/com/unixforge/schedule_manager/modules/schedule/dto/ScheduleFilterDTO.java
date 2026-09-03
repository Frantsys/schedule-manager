package com.unixforge.schedule_manager.modules.schedule.dto;

import java.time.LocalDate;
import java.util.List;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;

public record ScheduleFilterDTO(
    Long catalog,
    Long professional,
    Long customer,
    ScheduleStatus status,
    List<ScheduleStatus> multipleStatus,
    LocalDate startDateSchedule,
    LocalDate endDateSchedule,
    LocalDate startDate,
    LocalDate endDate
) {}
