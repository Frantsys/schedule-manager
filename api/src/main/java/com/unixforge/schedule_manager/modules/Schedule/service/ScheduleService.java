package com.unixforge.schedule_manager.modules.Schedule.service;

import com.unixforge.schedule_manager.exception.BusinessException;
import com.unixforge.schedule_manager.exception.ResourceNotFoundException;
import com.unixforge.schedule_manager.modules.Catalog.model.Catalog;
import com.unixforge.schedule_manager.modules.Catalog.repository.CatalogRepository;
import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleCreateRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleFilterRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.request.ScheduleUpdateStatusRequest;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleResponse;
import com.unixforge.schedule_manager.modules.Schedule.dto.response.ScheduleSummaryResponse;
import com.unixforge.schedule_manager.modules.Schedule.mapper.ScheduleMapper;
import com.unixforge.schedule_manager.modules.Schedule.model.Schedule;
import com.unixforge.schedule_manager.modules.Schedule.model.ScheduleStatus;
import com.unixforge.schedule_manager.modules.Schedule.repository.ScheduleRepository;
import com.unixforge.schedule_manager.modules.Schedule.spec.ScheduleSpec;
import com.unixforge.schedule_manager.modules.User.model.User;
import com.unixforge.schedule_manager.modules.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final CatalogRepository catalogRepository;
    private final ScheduleMapper scheduleMapper;

    @Transactional(readOnly = true)
    public List<ScheduleResponse> findAll() {

        return scheduleRepository.findAll()
                .stream()
                .map(scheduleMapper::toResponse)
                .toList();

    }

    @Transactional(readOnly = true)
    public List<ScheduleSummaryResponse> findAllSummary() {

        return scheduleRepository.findAll()
                .stream()
                .map(scheduleMapper::toSummaryResponse)
                .toList();

    }

    @Transactional(readOnly = true)
    public ScheduleResponse findById(Long id) {

        Schedule schedule = findScheduleById(id);

        return scheduleMapper.toResponse(schedule);

    }

    @Transactional(readOnly = true)
    public List<ScheduleResponse> filter(ScheduleFilterRequest filter) {

        Specification<Schedule> spec = Specification.unrestricted();

        if (filter.status() != null) {
            spec = spec.and(ScheduleSpec.byStatus(filter.status()));
        }

        if (filter.multipleStatus() != null && !filter.multipleStatus().isEmpty()) {
            spec = spec.and(ScheduleSpec.byStatuses(filter.multipleStatus()));
        }

        if (filter.customer() != null) {
            spec = spec.and(ScheduleSpec.byCustomerId(filter.customer()));
        }

        if (filter.professional() != null) {
            spec = spec.and(ScheduleSpec.byProfessionalId(filter.professional()));
        }

        if (filter.catalog() != null) {
            spec = spec.and(ScheduleSpec.byCatalogId(filter.catalog()));
        }

        if (filter.startDateSchedule() != null) {
            spec = spec.and(ScheduleSpec.byScheduledFrom(filter.startDateSchedule()));
        }

        if (filter.endDateSchedule() != null) {
            spec = spec.and(ScheduleSpec.byScheduledUntil(filter.endDateSchedule()));
        }

        if (filter.startDate() != null && filter.endDate() != null) {
            spec = spec.and(ScheduleSpec.byCreatedBetween(filter.startDate(), filter.endDate()));
        } else if (filter.startDate() != null) {
            spec = spec.and(ScheduleSpec.byCreatedAfter(filter.startDate()));
        } else if (filter.endDate() != null) {
            spec = spec.and(ScheduleSpec.byCreatedBefore(filter.endDate()));
        }

        return scheduleRepository.findAll(spec)
                .stream()
                .map(scheduleMapper::toResponse)
                .toList();

    }

    @Transactional
    public ScheduleResponse create(ScheduleCreateRequest request) {

        validatePeriod(request);

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado com ID: " + request.getCustomerId()));

        User professional = userRepository.findById(request.getProfessionalId())
                .orElseThrow(() -> new ResourceNotFoundException("Profissional não encontrado com ID: " + request.getProfessionalId()));

        Catalog catalog = catalogRepository.findById(request.getCatalogId())
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado com ID: " + request.getCatalogId()));

        if (!Boolean.TRUE.equals(catalog.getIsActive())) {
            throw new BusinessException("Serviço está inativo");
        }

        if (!catalog.getProfessional().getId().equals(professional.getId())) {
            throw new BusinessException("Serviço não pertence ao profissional informado");
        }

        Schedule schedule = scheduleMapper.toEntity(request);

        schedule.setCustomer(customer);
        schedule.setProfessional(professional);
        schedule.setCatalog(catalog);
        schedule.setStatus(ScheduleStatus.STATUS_PENDING);

        Schedule savedSchedule = scheduleRepository.save(schedule);

        return scheduleMapper.toResponse(savedSchedule);

    }

    @Transactional
    public ScheduleResponse updateStatusById(Long id, ScheduleUpdateStatusRequest request) {

        Schedule schedule = findScheduleById(id);

        schedule.setStatus(request.getStatus());

        Schedule updatedSchedule = scheduleRepository.save(schedule);

        return scheduleMapper.toResponse(updatedSchedule);

    }

    // O fim do agendamento precisa ser posterior ao início
    private void validatePeriod(ScheduleCreateRequest request) {

        LocalDateTime start = LocalDateTime.of(request.getStartDate(), request.getStartTime());
        LocalDateTime end = LocalDateTime.of(request.getEndDate(), request.getEndTime());

        if (!end.isAfter(start)) {
            throw new BusinessException("O fim do agendamento deve ser posterior ao início");
        }

    }

    private Schedule findScheduleById(Long id) {

        return scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento não encontrado com ID: " + id));

    }

}
