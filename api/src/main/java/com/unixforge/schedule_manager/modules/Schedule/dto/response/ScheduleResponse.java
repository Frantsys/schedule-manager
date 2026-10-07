package com.unixforge.schedule_manager.modules.Schedule.dto.response;

import com.unixforge.schedule_manager.modules.Catalog.dto.response.CatalogSummaryResponse;
import com.unixforge.schedule_manager.modules.Schedule.model.ScheduleStatus;
import com.unixforge.schedule_manager.modules.User.dto.response.UserSummaryResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponse {

    private Long id;
    private UserSummaryResponse customer;
    private UserSummaryResponse professional;
    private CatalogSummaryResponse catalog;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private ScheduleStatus status;
    private LocalDateTime createdAt;

}
