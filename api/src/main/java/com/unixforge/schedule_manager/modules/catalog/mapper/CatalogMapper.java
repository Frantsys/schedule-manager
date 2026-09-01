package com.unixforge.schedule_manager.modules.catalog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.unixforge.schedule_manager.modules.catalog.dto.CatalogCreateDTO;
import com.unixforge.schedule_manager.modules.catalog.dto.CatalogResponseDTO;
import com.unixforge.schedule_manager.modules.catalog.model.Catalog;

@Mapper(componentModel = "spring")
public interface CatalogMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "professional", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Catalog toEntity(CatalogCreateDTO dto);

    @Mapping(target = "professional", ignore = true)
    CatalogResponseDTO toDTO(Catalog catalog);

}
