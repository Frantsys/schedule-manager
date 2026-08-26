package com.unixforge.schedule_manager.domain.shared;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CatalogSummaryDTO {

    private Long id;
    private String name;
    private String duration;
    private String price;
    
}
