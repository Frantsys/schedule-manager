package com.unixforge.schedule_manager.modules.Schedule.controller;

import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleCreateRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleFilterRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleUpdateStatusRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleResponse;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleSummaryResponse;
import com.unixforge.schedule_manager.modules.Schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Schedule", description = "API path for managing schedules")
@RestController
@RequestMapping("/v1/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<ScheduleResponse>> findAll() {

        List<ScheduleResponse> schedules = scheduleService.findAll();

        return ResponseEntity.ok(schedules);

    }

    @GetMapping("/summary")
    public ResponseEntity<List<ScheduleSummaryResponse>> findAllSummary() {

        List<ScheduleSummaryResponse> schedules = scheduleService.findAllSummary();

        return ResponseEntity.ok(schedules);

    }

    @GetMapping("/filter")
    public ResponseEntity<List<ScheduleResponse>> filter(@ModelAttribute ScheduleFilterRequest filter) {

        List<ScheduleResponse> schedules = scheduleService.filter(filter);

        return ResponseEntity.ok(schedules);

    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponse> findById(@PathVariable Long id) {

        ScheduleResponse schedule = scheduleService.findById(id);

        return ResponseEntity.ok(schedule);

    }

    @PostMapping
    public ResponseEntity<ScheduleResponse> create(@RequestBody @Valid ScheduleCreateRequest request) {

        ScheduleResponse schedule = scheduleService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(schedule);

    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ScheduleResponse> updateStatus(@PathVariable Long id, @RequestBody @Valid ScheduleUpdateStatusRequest request) {

        ScheduleResponse schedule = scheduleService.updateStatusById(id, request);

        return ResponseEntity.ok(schedule);

    }

}
