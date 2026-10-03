package com.unixforge.schedule_manager.modules.Catalog.dto.request;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public record CatalogFilterRequest(
        Long professional,
        String name,
        Double minPrice,
        Double maxPrice,
        Boolean isActive,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
) {}
