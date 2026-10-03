package com.unixforge.schedule_manager.modules.Catalog.dto.response;

import com.unixforge.schedule_manager.modules.User.dto.response.UserSummaryResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CatalogResponse {

    private Long id;
    private UserSummaryResponse professional;
    private String name;
    private Duration duration;
    private Double price;
    private Boolean isActive;
    private LocalDateTime createdAt;

}
