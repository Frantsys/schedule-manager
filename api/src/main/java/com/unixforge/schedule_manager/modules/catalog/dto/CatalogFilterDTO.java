package com.unixforge.schedule_manager.modules.catalog.dto;

import java.time.LocalDate;

public record CatalogFilterDTO(
    Long professional,
    String name,
    Double minPrice,
    Double maxPrice,
    Boolean isActive,
    LocalDate startDate,
    LocalDate endDate
) {}
