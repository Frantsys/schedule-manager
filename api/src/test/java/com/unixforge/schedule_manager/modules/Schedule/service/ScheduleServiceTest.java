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
import com.unixforge.schedule_manager.modules.User.model.User;
import com.unixforge.schedule_manager.modules.User.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ScheduleServiceTest {

    @Mock
    private ScheduleRepository scheduleRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CatalogRepository catalogRepository;

    @Mock
    private ScheduleMapper scheduleMapper;

    @InjectMocks
    private ScheduleService scheduleService;

    private ScheduleCreateRequest request;
    private User customer;
    private User professional;
    private Catalog catalog;

    @BeforeEach
    void setUp() {
        request = new ScheduleCreateRequest();
        request.setCustomerId(1L);
        request.setProfessionalId(2L);
        request.setCatalogId(3L);
        request.setStartDate(LocalDate.now().plusDays(1));
        request.setEndDate(LocalDate.now().plusDays(1));
        request.setStartTime(LocalTime.of(9, 0));
        request.setEndTime(LocalTime.of(10, 0));

        customer = new User();
        customer.setId(1L);

        professional = new User();
        professional.setId(2L);

        catalog = new Catalog();
        catalog.setProfessional(professional);
        catalog.setIsActive(true);
    }

    @Test
    @DisplayName("create should link customer, professional and catalog and start as pending")
    void create_shouldLinkEntitiesAndSetPendingStatus() {
        Schedule mappedSchedule = new Schedule();
        ScheduleResponse response = new ScheduleResponse();

        when(userRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(userRepository.findById(2L)).thenReturn(Optional.of(professional));
        when(catalogRepository.findById(3L)).thenReturn(Optional.of(catalog));
        when(scheduleMapper.toEntity(request)).thenReturn(mappedSchedule);
        when(scheduleRepository.save(mappedSchedule)).thenReturn(mappedSchedule);
        when(scheduleMapper.toResponse(mappedSchedule)).thenReturn(response);

        ScheduleResponse result = scheduleService.create(request);

        assertThat(result).isSameAs(response);
        assertThat(mappedSchedule.getCustomer()).isSameAs(customer);
        assertThat(mappedSchedule.getProfessional()).isSameAs(professional);
        assertThat(mappedSchedule.getCatalog()).isSameAs(catalog);
        assertThat(mappedSchedule.getStatus()).isEqualTo(ScheduleStatus.STATUS_PENDING);
    }

    @Test
    @DisplayName("create should reject a schedule that ends before it starts")
    void create_shouldThrowExceptionWhenEndIsBeforeStart() {
        request.setEndTime(LocalTime.of(8, 0));

        assertThrows(BusinessException.class, () -> scheduleService.create(request));

        verify(scheduleRepository, never()).save(any());
    }

    @Test
    @DisplayName("create should reject an inactive catalog")
    void create_shouldThrowExceptionWhenCatalogIsInactive() {
        catalog.setIsActive(false);

        when(userRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(userRepository.findById(2L)).thenReturn(Optional.of(professional));
        when(catalogRepository.findById(3L)).thenReturn(Optional.of(catalog));

        assertThrows(BusinessException.class, () -> scheduleService.create(request));

        verify(scheduleRepository, never()).save(any());
    }

    @Test
    @DisplayName("create should reject a catalog that belongs to another professional")
    void create_shouldThrowExceptionWhenCatalogBelongsToAnotherProfessional() {
        User otherProfessional = new User();
        otherProfessional.setId(50L);
        catalog.setProfessional(otherProfessional);

        when(userRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(userRepository.findById(2L)).thenReturn(Optional.of(professional));
        when(catalogRepository.findById(3L)).thenReturn(Optional.of(catalog));

        assertThrows(BusinessException.class, () -> scheduleService.create(request));

        verify(scheduleRepository, never()).save(any());
    }

    @Test
    @DisplayName("create should throw an exception when the customer does not exist")
    void create_shouldThrowExceptionWhenCustomerNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> scheduleService.create(request));
    }

    @Test
    @DisplayName("findAll should return every schedule mapped to ScheduleResponse")
    void findAll_shouldReturnMappedSchedules() {
        Schedule schedule = new Schedule();
        ScheduleResponse response = new ScheduleResponse();

        when(scheduleRepository.findAll()).thenReturn(List.of(schedule));
        when(scheduleMapper.toResponse(schedule)).thenReturn(response);

        assertThat(scheduleService.findAll()).containsExactly(response);
    }

    @Test
    @DisplayName("findAllSummary should return every schedule mapped to ScheduleSummaryResponse")
    void findAllSummary_shouldReturnMappedSummaries() {
        Schedule schedule = new Schedule();
        ScheduleSummaryResponse summary = new ScheduleSummaryResponse();

        when(scheduleRepository.findAll()).thenReturn(List.of(schedule));
        when(scheduleMapper.toSummaryResponse(schedule)).thenReturn(summary);

        assertThat(scheduleService.findAllSummary()).containsExactly(summary);
    }

    @Test
    @DisplayName("findById should return the mapped schedule when found")
    void findById_shouldReturnSchedule() {
        Schedule schedule = new Schedule();
        ScheduleResponse response = new ScheduleResponse();

        when(scheduleRepository.findById(1L)).thenReturn(Optional.of(schedule));
        when(scheduleMapper.toResponse(schedule)).thenReturn(response);

        assertThat(scheduleService.findById(1L)).isSameAs(response);
    }

    @Test
    @DisplayName("findById should throw an exception when the schedule does not exist")
    void findById_shouldThrowExceptionWhenNotFound() {
        when(scheduleRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> scheduleService.findById(99L));
    }

    @Test
    @DisplayName("filter should query the repository with a specification and map the results")
    @SuppressWarnings("unchecked")
    void filter_shouldReturnMappedSchedules() {
        ScheduleFilterRequest filter = new ScheduleFilterRequest(
                1L, 2L, 3L, ScheduleStatus.STATUS_PENDING, null,
                LocalDate.now(), LocalDate.now().plusDays(7), null, null);
        Schedule schedule = new Schedule();
        ScheduleResponse response = new ScheduleResponse();

        when(scheduleRepository.findAll(any(Specification.class))).thenReturn(List.of(schedule));
        when(scheduleMapper.toResponse(schedule)).thenReturn(response);

        assertThat(scheduleService.filter(filter)).containsExactly(response);
    }

    @Test
    @DisplayName("updateStatusById should update the schedule status")
    void updateStatusById_shouldUpdateStatus() {
        Schedule schedule = new Schedule();
        schedule.setStatus(ScheduleStatus.STATUS_PENDING);

        ScheduleUpdateStatusRequest statusRequest = new ScheduleUpdateStatusRequest();
        statusRequest.setStatus(ScheduleStatus.STATUS_CANCELLED);

        when(scheduleRepository.findById(1L)).thenReturn(Optional.of(schedule));
        when(scheduleRepository.save(schedule)).thenReturn(schedule);
        when(scheduleMapper.toResponse(schedule)).thenReturn(new ScheduleResponse());

        scheduleService.updateStatusById(1L, statusRequest);

        assertThat(schedule.getStatus()).isEqualTo(ScheduleStatus.STATUS_CANCELLED);
        verify(scheduleRepository).save(schedule);
    }

}
