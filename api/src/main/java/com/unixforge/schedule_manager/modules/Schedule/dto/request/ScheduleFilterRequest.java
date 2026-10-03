package com.unixforge.schedule_manager.modules.Schedule.dto.request;

import com.unixforge.schedule_manager.modules.Schedule.model.ScheduleStatus;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

public record ScheduleFilterRequest(
        Long catalog,
        Long professional,
        Long customer,
        ScheduleStatus status,
        List<ScheduleStatus> multipleStatus,
        // Período em que o agendamento acontece
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDateSchedule,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDateSchedule,
        // Período em que o agendamento foi criado
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
) {}
