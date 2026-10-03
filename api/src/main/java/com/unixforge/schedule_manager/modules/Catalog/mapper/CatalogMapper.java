package com.unixforge.schedule_manager.modules.Catalog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.unixforge.schedule_manager.modules.Catalog.dto.request.CatalogCreateRequest;
import com.unixforge.schedule_manager.modules.Catalog.dto.response.CatalogResponse;
import com.unixforge.schedule_manager.modules.Catalog.model.Catalog;

@Mapper(componentModel = "spring")
public interface CatalogMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "professional", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Catalog toEntity(CatalogCreateRequest dto);

    @Mapping(target = "professional", ignore = true)
    CatalogResponse toDTO(Catalog catalog);

}
