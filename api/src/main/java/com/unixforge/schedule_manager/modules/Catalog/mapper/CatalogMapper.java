package com.unixforge.schedule_manager.modules.Catalog.mapper;

import com.unixforge.schedule_manager.modules.Catalog.dto.request.CatalogCreateRequest;
import com.unixforge.schedule_manager.modules.Catalog.dto.response.CatalogResponse;
import com.unixforge.schedule_manager.modules.Catalog.dto.response.CatalogSummaryResponse;
import com.unixforge.schedule_manager.modules.Catalog.model.Catalog;
import com.unixforge.schedule_manager.modules.User.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface CatalogMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "professional", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Catalog toEntity(CatalogCreateRequest request);

    CatalogResponse toResponse(Catalog catalog);

    CatalogSummaryResponse toSummaryResponse(Catalog catalog);

}
