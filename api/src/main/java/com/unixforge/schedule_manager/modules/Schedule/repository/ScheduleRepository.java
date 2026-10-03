package com.unixforge.schedule_manager.modules.Schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.unixforge.schedule_manager.modules.Schedule.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>, JpaSpecificationExecutor<Schedule>{
    
}
