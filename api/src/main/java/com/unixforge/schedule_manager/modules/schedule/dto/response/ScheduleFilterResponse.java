package com.unixforge.schedule_manager.modules.schedule.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.unixforge.schedule_manager.modules.schedule.model.ScheduleStatus;

public record ScheduleFilterResponse(
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
