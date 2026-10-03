package com.unixforge.schedule_manager.modules.Schedule.spec;

import com.unixforge.schedule_manager.modules.Schedule.model.Schedule;
import com.unixforge.schedule_manager.modules.Schedule.model.ScheduleStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class ScheduleSpec {

    private ScheduleSpec() {
    }

    public static Specification<Schedule> byStatus(ScheduleStatus status) {
        return (root, query, cb) -> {
            if (status == null) return cb.conjunction();

            return cb.equal(root.get("status"), status);
        };
    }

    public static Specification<Schedule> byStatuses(List<ScheduleStatus> statuses) {
        return (root, query, cb) -> {
            if (statuses == null || statuses.isEmpty()) return cb.conjunction();

            return root.get("status").in(statuses);
        };
    }

    public static Specification<Schedule> byCustomerId(Long id) {
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("customer").get("id"), id);
        };
    }

    public static Specification<Schedule> byProfessionalId(Long id) {
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("professional").get("id"), id);
        };
    }

    public static Specification<Schedule> byCatalogId(Long id) {
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("catalog").get("id"), id);
        };
    }

    // FILTROS DA DATA EM QUE O AGENDAMENTO ACONTECE

    public static Specification<Schedule> byScheduledFrom(LocalDate startDate) {
        return (root, query, cb) -> {
            if (startDate == null) return cb.conjunction();

            return cb.greaterThanOrEqualTo(root.<LocalDate>get("startDate"), startDate);
        };
    }

    public static Specification<Schedule> byScheduledUntil(LocalDate endDate) {
        return (root, query, cb) -> {
            if (endDate == null) return cb.conjunction();

            return cb.lessThanOrEqualTo(root.<LocalDate>get("endDate"), endDate);
        };
    }

    // FILTROS DA DATA DE CRIAÇÃO DO AGENDAMENTO

    public static Specification<Schedule> byCreatedAfter(LocalDate startDate) {
        return (root, query, cb) -> {
            if (startDate == null) return cb.conjunction();

            LocalDateTime startDateTime = startDate.atStartOfDay();

            return cb.greaterThanOrEqualTo(root.get("createdAt"), startDateTime);
        };
    }

    public static Specification<Schedule> byCreatedBefore(LocalDate endDate) {
        return (root, query, cb) -> {
            if (endDate == null) return cb.conjunction();

            LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

            return cb.lessThanOrEqualTo(root.get("createdAt"), endDateTime);
        };
    }

    public static Specification<Schedule> byCreatedBetween(LocalDate startDate, LocalDate endDate) {
        return (root, query, cb) -> {
            if (startDate == null || endDate == null) return cb.conjunction();

            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

            return cb.between(root.get("createdAt"), startDateTime, endDateTime);
        };
    }

}
