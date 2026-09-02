package com.unixforge.schedule_manager.modules.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleResponseDTO;
import com.unixforge.schedule_manager.modules.schedule.model.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>, JpaSpecificationExecutor<ScheduleResponseDTO>{
    
}
