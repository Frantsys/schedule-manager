package com.unixforge.schedule_manager.modules.schedule.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;
import com.unixforge.schedule_manager.modules.catalog.model.Catalog;
import com.unixforge.schedule_manager.modules.catalog.repository.CatalogRepository;
import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleCreateDTO;
import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleResponseDTO;
import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleUpdateStatusDTO;
import com.unixforge.schedule_manager.modules.schedule.mapper.ScheduleMapper;
import com.unixforge.schedule_manager.modules.schedule.model.Schedule;
import com.unixforge.schedule_manager.modules.schedule.repository.ScheduleRepository;
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
    public ScheduleResponseDTO create(ScheduleCreateDTO requestDTO) {

        User customer = userRepository.findById(requestDTO.getCustomerId())
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID " + requestDTO.getCustomerId()));

        User professional = userRepository.findById(requestDTO.getProfessionalId())
            .orElseThrow(() -> new RuntimeException("Profissional não encontrado com ID " + requestDTO.getProfessionalId()));

        Catalog catalog = catalogRepository.findById(requestDTO.getCatalogId())
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado com ID " + requestDTO.getCatalogId()));
        
        Schedule schedule = scheduleMapper.toEntity(requestDTO);
        schedule.setCustomer(customer);
        schedule.setCustomer(professional);
        schedule.setCatalog(catalog);
        schedule.setStatus(ScheduleStatus.STATUS_PENDING);

        Schedule savedSchedule = scheduleRepository.save(schedule);

        return scheduleMapper.toDTO(savedSchedule);

    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDTO> findAll() {
        return scheduleRepository.findAll()
            .stream()
            .map(scheduleMapper::toDTO)
            .toList();
    }

    @Transactional(readOnly = true)
    public ScheduleResponseDTO findById(Long id) {

        Schedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Agendamento não foi encontrado com ID: " + id));

        return scheduleMapper.toDTO(schedule);
        
    }

    @Transactional(readOnly = true)
    public ScheduleResponseDTO updateStatus(Long id, ScheduleUpdateStatusDTO requestDTO) {
        
        Schedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Agendamento não foi encontrado com ID: " + id));
        
        schedule.setStatus(requestDTO.getStatus());

        Schedule updatedSchedule = scheduleRepository.save(schedule);

        return scheduleMapper.toDTO(updatedSchedule);

    }

}
