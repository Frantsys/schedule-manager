package com.unixforge.schedule_manager.modules.Schedule.service;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unixforge.schedule_manager.modules.Schedule.model.ScheduleStatus;
import com.unixforge.schedule_manager.modules.Catalog.model.Catalog;
import com.unixforge.schedule_manager.modules.Catalog.repository.CatalogRepository;
import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleCreateRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleUpdateActivationRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleFilterResponse;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleResponse;
import com.unixforge.schedule_manager.modules.Schedule.mapper.ScheduleMapper;
import com.unixforge.schedule_manager.modules.Schedule.model.Schedule;
import com.unixforge.schedule_manager.modules.Schedule.repository.ScheduleRepository;
import com.unixforge.schedule_manager.modules.Schedule.specification.ScheduleSpecs;
import com.unixforge.schedule_manager.modules.user.entity.User;
import com.unixforge.schedule_manager.modules.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final CatalogRepository catalogRepository;
    private final ScheduleMapper scheduleMapper;

    @Transactional
    public ScheduleResponse create(ScheduleCreateRequest requestDTO) {

        User customer = userRepository.findById(requestDTO.getCustomerId())
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID " + requestDTO.getCustomerId()));

        User professional = userRepository.findById(requestDTO.getProfessionalId())
            .orElseThrow(() -> new RuntimeException("Profissional não encontrado com ID " + requestDTO.getProfessionalId()));

        Catalog catalog = catalogRepository.findById(requestDTO.getCatalogId())
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado com ID " + requestDTO.getCatalogId()));
        
        Schedule schedule = scheduleMapper.toEntity(requestDTO);
        schedule.setCustomer(customer);
        schedule.setProfessional(professional);
        schedule.setCatalog(catalog);
        schedule.setStatus(ScheduleStatus.STATUS_PENDING);

        Schedule savedSchedule = scheduleRepository.save(schedule);

        return scheduleMapper.toDTO(savedSchedule);

    }

    @Transactional(readOnly = true)
    public List<ScheduleResponse> findAll() {
        return scheduleRepository.findAll()
            .stream()
            .map(scheduleMapper::toDTO)
            .toList();
    }

    @Transactional(readOnly = true)
    public ScheduleResponse findById(Long id) {

        Schedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Agendamento não foi encontrado com ID: " + id));

        return scheduleMapper.toDTO(schedule);
        
    }

    @Transactional
    public ScheduleResponse updateStatus(Long id, ScheduleUpdateActivationRequest requestDTO) {
        
        Schedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Agendamento não foi encontrado com ID: " + id));
        
        schedule.setStatus(requestDTO.getStatus());

        Schedule updatedSchedule = scheduleRepository.save(schedule);

        return scheduleMapper.toDTO(updatedSchedule);

    }

    @Transactional(readOnly = true)
    public List<ScheduleResponse> listSchedules(ScheduleFilterResponse requestDTO) {

        Specification<Schedule> spec = Specification.unrestricted();

        if (requestDTO.status() != null) {
            spec = spec.and(ScheduleSpecs.byStatus(requestDTO.status()));
        }

        if (requestDTO.multipleStatus() != null && !requestDTO.multipleStatus().isEmpty()) {
            spec = spec.and(ScheduleSpecs.byStatuses(requestDTO.multipleStatus()));
        }

        if (requestDTO.customer() != null) {
            spec = spec.and(ScheduleSpecs.byCustomerId(requestDTO.customer()));
        }

        if (requestDTO.professional() != null) {
            spec = spec.and(ScheduleSpecs.byProfessionalId(requestDTO.professional()));
        }

        if (requestDTO.catalog() != null) {
            spec = spec.and(ScheduleSpecs.byCatalogId(requestDTO.catalog()));
        }

        if(requestDTO.startDate() != null && requestDTO.endDate() == null) {
            spec = spec.and(ScheduleSpecs.byCreatedAfter(requestDTO.startDate()));
        }

        if(requestDTO.startDate() == null && requestDTO.endDate() != null) {
            spec = spec.and(ScheduleSpecs.byCreatedBefore(requestDTO.endDate()));
        }

        if(requestDTO.startDate() != null && requestDTO.endDate() != null) {
            spec = spec.and(ScheduleSpecs.byCreatedBetween(requestDTO.startDate(), requestDTO.endDate()));
        }

        return scheduleRepository.findAll(spec)
            .stream()
            .map(scheduleMapper::toDTO)
            .toList();

    }

}
