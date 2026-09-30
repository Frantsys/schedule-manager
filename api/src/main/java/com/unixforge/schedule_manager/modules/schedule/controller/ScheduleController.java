package com.unixforge.schedule_manager.modules.schedule.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unixforge.schedule_manager.modules.schedule.dto.request.ScheduleCreateRequest;
import com.unixforge.schedule_manager.modules.schedule.dto.request.ScheduleUpdateActivationRequest;
import com.unixforge.schedule_manager.modules.schedule.dto.response.ScheduleFilterResponse;
import com.unixforge.schedule_manager.modules.schedule.dto.response.ScheduleResponse;
import com.unixforge.schedule_manager.modules.schedule.service.ScheduleService;

import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "Schedule", description = "API for managing schedules")
@RestController
@RequestMapping("/v1/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {
    
    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ScheduleResponse> create(@RequestBody @Valid ScheduleCreateRequest DTO) {
        ScheduleResponse createdSchedule = scheduleService.create(DTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule);
    }
    
    @GetMapping
    public ResponseEntity<List<ScheduleResponse>> findAll() {
        List<ScheduleResponse> schedules = scheduleService.findAll();
        
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponse> findById(@PathVariable Long id) {
        ScheduleResponse schedule = scheduleService.findById(id);

        return ResponseEntity.ok(schedule);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ScheduleResponse> updateStatus(@PathVariable Long id, @RequestBody @Valid ScheduleUpdateActivationRequest DTO) {
        ScheduleResponse updatedSchedules = scheduleService.updateStatus(id, DTO);

        return ResponseEntity.ok(updatedSchedules);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ScheduleResponse>> listSchedules(@RequestParam ScheduleFilterResponse filterDTO) {
        List<ScheduleResponse> schedules = scheduleService.listSchedules(filterDTO);

        return ResponseEntity.ok(schedules);
    }
    
    

}
