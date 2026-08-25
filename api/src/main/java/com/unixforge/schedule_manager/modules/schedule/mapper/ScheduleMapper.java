package com.unixforge.schedule_manager.modules.schedule.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleCreateDTO;
import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleResponseDTO;
import com.unixforge.schedule_manager.modules.schedule.model.Schedule;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "professional", ignore = true)
    @Mapping(target = "catalog", ignore = true)
    @Mapping(target = "status", ignore = true)
    Schedule toEntity(ScheduleCreateDTO dto);

    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "professional", ignore = true)
    @Mapping(target = "catalog", ignore = true)
    ScheduleResponseDTO toDTO(Schedule schedule);

}
