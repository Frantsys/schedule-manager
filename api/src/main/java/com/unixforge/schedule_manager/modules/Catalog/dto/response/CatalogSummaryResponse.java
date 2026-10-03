package com.unixforge.schedule_manager.modules.Schedule.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CatalogSummaryResponse {

    private Long id;
    private String name;
    private String duration;
    private String price;
    
}
