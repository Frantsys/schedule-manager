package com.unixforge.schedule_manager.modules.schedule.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;
import com.unixforge.schedule_manager.domain.shared.CatalogSummaryDTO;
import com.unixforge.schedule_manager.domain.shared.UserSummaryDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponseDTO {
    
    private UserSummaryDTO customer;
    private UserSummaryDTO professional;
    private CatalogSummaryDTO catalog;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private ScheduleStatus status;
    private LocalDateTime createdAt;

}

