package com.unixforge.schedule_manager.modules.catalog.dto.response;

import java.time.LocalDate;

public record CatalogFilterResponse(
    Long professional,
    String name,
    Double minPrice,
    Double maxPrice,
    Boolean isActive,
    LocalDate startDate,
    LocalDate endDate
) {}
