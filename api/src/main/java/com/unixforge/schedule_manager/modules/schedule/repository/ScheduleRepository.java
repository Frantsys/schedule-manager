package com.unixforge.schedule_manager.modules.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.unixforge.schedule_manager.modules.schedule.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>, JpaSpecificationExecutor<Schedule>{
    
}
