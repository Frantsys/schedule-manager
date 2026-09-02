package com.unixforge.schedule_manager.modules.schedule.specification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;
import com.unixforge.schedule_manager.modules.schedule.dto.ScheduleResponseDTO;

public class ScheduleSpecification {

    public static Specification<ScheduleResponseDTO> createdAfter(LocalDate startDate){
        return (root, query, cb) -> {
            if (startDate == null) return cb.conjunction();

            LocalDateTime start = startDate.atStartOfDay();
            return cb.greaterThanOrEqualTo(root.get("startDate"), start);
        };
    }

    public static Specification<ScheduleResponseDTO> createdBefore(LocalDate endDate){
        return (root, query, cb) -> {
            if (endDate == null) return cb.conjunction();

            LocalDateTime end = endDate.atTime(LocalTime.MAX);
            return cb.lessThanOrEqualTo(root.get("endDate"), end);
        };
    }

    public static Specification<ScheduleResponseDTO> createdAfterAndBefore(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> {
            if (startDate == null) return cb.conjunction();
            if (endDate == null) return cb.conjunction();

            LocalDateTime start = startDate.atStartOfDay();
            LocalDateTime end = endDate.atTime(LocalTime.MAX);

            return cb.between(root.get("datesBetween"), start, end);
        };
    }

    public static Specification<ScheduleResponseDTO> filterStatus(ScheduleStatus status) {
        return (root, query, cb) -> {
            if (status == null) return cb.conjunction();

            return cb.equal(root.get("status"), status);
        };
    }

    public static Specification<ScheduleResponseDTO> filterMultipleStatus(List<ScheduleStatus> multipleStatus) {
        return (root, query, cb) -> {
            if (multipleStatus == null || multipleStatus.isEmpty()) return cb.conjunction();

            return root.get("status").in(multipleStatus);
        };
    }

    public static Specification<ScheduleResponseDTO> filterCustomerId(Long id){
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("customerId"), id);
        };
    }

    public static Specification<ScheduleResponseDTO> filterProfessionalId(Long id){
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("professionalId"), id);
        };
    }

    public static Specification<ScheduleResponseDTO> filterCatalogId(Long id){
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("catalogId"), id);
        };
    }
    

}
