package com.unixforge.schedule_manager.modules.schedule.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleCreateDTO;
import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleResponseDTO;
import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleUpdateStatusDTO;
import com.unixforge.schedule_manager.modules.schedule.service.ScheduleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {
    
    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ScheduleResponseDTO> create(@RequestBody @Valid ScheduleCreateDTO dto) {
        ScheduleResponseDTO createdSchedule = scheduleService.create(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule);
    }
    
    @GetMapping
    public ResponseEntity<List<ScheduleResponseDTO>> findAll() {
        List<ScheduleResponseDTO> schedules = scheduleService.findAll();
        
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponseDTO> findById(@PathVariable Long id) {
        ScheduleResponseDTO schedule = scheduleService.findById(id);

        return ResponseEntity.ok(schedule);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ScheduleResponseDTO> updateStatus(@PathVariable Long id, @RequestBody @Valid ScheduleUpdateStatusDTO dto) {
        ScheduleResponseDTO updatedSchedules = scheduleService.updateStatus(id, dto);

        return ResponseEntity.ok(updatedSchedules);
    }

    

}
