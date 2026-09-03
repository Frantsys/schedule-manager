package com.unixforge.schedule_manager.modules.catalog.specification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.data.jpa.domain.Specification;

import com.unixforge.schedule_manager.modules.catalog.model.Catalog;

public class CatalogSpecification {
    
    public static Specification<Catalog> byProfessionalId(Long id) {
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("professional").get("id"), id);
        };
    }

    public static Specification<Catalog> byName(String name) {
        return (root, query, cb) -> {
            if (name == null || name.isBlank()) return cb.conjunction();

            return cb.equal(root.get("name"), name);
        };
    }

    public static Specification<Catalog> byPriceGreater(Double minPrice) {
        return (root, query, cb) -> {
            if (minPrice == null) return cb.conjunction();

            return cb.greaterThanOrEqualTo(root.get("price"), minPrice);
        };
    }

    public static Specification<Catalog> byPriceLess(Double maxPrice) {
        return (root, query, cb) -> {
            if (maxPrice == null) return cb.conjunction();

            return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }

    public static Specification<Catalog> byActivation(Boolean isActive) {
        return (root, query, cb) -> {
            if(isActive == null) return cb.conjunction();

            return cb.equal(root.get("isActive"), isActive);
        };
    }

    public static Specification<Catalog> byCreatedAfter(LocalDate startDate) {
        return (root, query, cb) -> {
            if(startDate == null) return cb.conjunction();

            LocalDateTime startDateTime = startDate.atStartOfDay();

            return cb.lessThanOrEqualTo(root.get("createdAt"), startDateTime);
        };
    }

    public static Specification<Catalog> byCreatedBefore(LocalDate endDate) {
        return (root, query, cb) -> {
            if(endDate == null) return cb.conjunction();

            LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

            return cb.greaterThanOrEqualTo(root.get("createdAt"), endDateTime);
        };
    }

    public static Specification<Catalog> byCreatedBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> {
            if (startDate == null) return cb.conjunction();
            if (endDate == null) return cb.conjunction();

            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

            return cb.between(root.get("createdAt"), startDateTime, endDateTime);
        };
    }

}
