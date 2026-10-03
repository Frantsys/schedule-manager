package com.unixforge.schedule_manager.modules.Schedule.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleCreateRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleResponse;
import com.unixforge.schedule_manager.modules.Schedule.model.Schedule;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "professional", ignore = true)
    @Mapping(target = "catalog", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Schedule toEntity(ScheduleCreateRequest dto);

    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "professional", ignore = true)
    @Mapping(target = "catalog", ignore = true)
    ScheduleResponse toDTO(Schedule schedule);

}
