package com.unixforge.schedule_manager.modules.Schedule.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.unixforge.schedule_manager.modules.Schedule.model.ScheduleStatus;

import com.unixforge.schedule_manager.modules.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponse {
    
    private User customer;
    private User professional;
    private CatalogSummaryResponse catalog;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private ScheduleStatus status;
    private LocalDateTime createdAt;

}

