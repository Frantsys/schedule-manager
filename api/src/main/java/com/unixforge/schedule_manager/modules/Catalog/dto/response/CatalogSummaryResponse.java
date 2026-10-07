package com.unixforge.schedule_manager.modules.Catalog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.Duration;

@Getter
@Setter
public class CatalogSummaryResponse {

    private Long id;
    private String name;
    private Duration duration;
    private Double price;
    private Boolean isActive;

}
