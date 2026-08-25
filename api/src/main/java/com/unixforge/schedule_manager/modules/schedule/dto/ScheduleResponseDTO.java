package com.unixforge.schedule_manager.modules.schedule.dto;

import java.time.LocalDateTime;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;

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
    private LocalDateTime dateTime;
    private ScheduleStatus status;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserSummaryDTO {
        private Long id;
        private String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CatalogSummaryDTO {
        private Long id;
        private String name;
        private String duration;
        private String price;
    }


}

