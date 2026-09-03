package com.unixforge.schedule_manager.modules.catalog.dto;

import java.time.LocalDateTime;

public record CatalogFilterDTO(
    Long professional,
    String name,
    Double price,
    Boolean isActive,
    LocalDateTime createdAt
) {}
