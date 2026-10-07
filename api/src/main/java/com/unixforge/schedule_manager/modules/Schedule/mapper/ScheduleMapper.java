package com.unixforge.schedule_manager.modules.Schedule.mapper;

import com.unixforge.schedule_manager.modules.Catalog.mapper.CatalogMapper;
import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleCreateRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleResponse;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleSummaryResponse;
import com.unixforge.schedule_manager.modules.Schedule.model.Schedule;
import com.unixforge.schedule_manager.modules.User.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, CatalogMapper.class})
public interface ScheduleMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "professional", ignore = true)
    @Mapping(target = "catalog", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Schedule toEntity(ScheduleCreateRequest request);

    ScheduleResponse toResponse(Schedule schedule);

    ScheduleSummaryResponse toSummaryResponse(Schedule schedule);

}
