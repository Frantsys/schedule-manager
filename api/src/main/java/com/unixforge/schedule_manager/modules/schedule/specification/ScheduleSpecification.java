package com.unixforge.schedule_manager.modules.schedule.specification;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;
import com.unixforge.schedule_manager.modules.schedule.model.Schedule;

public class ScheduleSpecification {

    public static Specification<Schedule> byCreatedAfter(LocalDate startDate){
        return (root, query, cb) -> {
            if (startDate == null) return cb.conjunction();

            return cb.greaterThanOrEqualTo(root.get("startDate"), startDate);
        };
    }

    public static Specification<Schedule> byCreatedBefore(LocalDate endDate){
        return (root, query, cb) -> {
            if (endDate == null) return cb.conjunction();

            return cb.lessThanOrEqualTo(root.get("endDate"), endDate);
        };
    }

    public static Specification<Schedule> byCreatedBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> {
            if (startDate == null) return cb.conjunction();
            if (endDate == null) return cb.conjunction();

            return cb.between(root.get("startDate"), startDate, endDate);
        };
    }

    public static Specification<Schedule> byStatus(ScheduleStatus status) {
        return (root, query, cb) -> {
            if (status == null) return cb.conjunction();

            return cb.equal(root.get("status"), status);
        };
    }

    public static Specification<Schedule> byStatuses(List<ScheduleStatus> multipleStatus) {
        return (root, query, cb) -> {
            if (multipleStatus == null || multipleStatus.isEmpty()) return cb.conjunction();

            return root.get("status").in(multipleStatus);
        };
    }

    public static Specification<Schedule> byCustomerId(Long id){
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("customer").get("id"), id);
        };
    }

    public static Specification<Schedule> byProfessionalId(Long id){
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("professional").get("id"), id);
        };
    }

    public static Specification<Schedule> byCatalogId(Long id){
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("catalog").get("id"), id);
        };
    }
    

}
