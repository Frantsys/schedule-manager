package com.unixforge.schedule_manager.modules.Schedule.dto.response;

import com.unixforge.schedule_manager.modules.Schedule.model.ScheduleStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ScheduleSummaryResponse {

    private Long id;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private ScheduleStatus status;

}
