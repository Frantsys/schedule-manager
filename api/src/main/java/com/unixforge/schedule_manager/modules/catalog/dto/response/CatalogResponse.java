package com.unixforge.schedule_manager.modules.catalog.dto.response;

import java.time.Duration;
import java.time.LocalDateTime;

import com.unixforge.schedule_manager.domain.shared.UserSummaryDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CatalogResponse {

    private Long id;
    private UserSummaryDTO professional;
    private String name;
    private Duration duration;
    private Double price;
    private Boolean isActive;
    private LocalDateTime createdAt;
    
}
