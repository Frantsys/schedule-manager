package com.unixforge.schedule_manager.modules.Catalog.spec;

import com.unixforge.schedule_manager.modules.Catalog.model.Catalog;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class CatalogSpec {

    private CatalogSpec() {
    }

    public static Specification<Catalog> byProfessionalId(Long id) {
        return (root, query, cb) -> {
            if (id == null) return cb.conjunction();

            return cb.equal(root.get("professional").get("id"), id);
        };
    }

    // Busca parcial, sem diferenciar maiúsculas
    public static Specification<Catalog> byName(String name) {
        return (root, query, cb) -> {
            if (name == null || name.isBlank()) return cb.conjunction();

            String pattern = "%" + name.trim().toLowerCase() + "%";

            return cb.like(cb.lower(root.<String>get("name")), pattern);
        };
    }

    public static Specification<Catalog> byMinPrice(Double minPrice) {
        return (root, query, cb) -> {
            if (minPrice == null) return cb.conjunction();

            return cb.greaterThanOrEqualTo(root.<Double>get("price"), minPrice);
        };
    }

    public static Specification<Catalog> byMaxPrice(Double maxPrice) {
        return (root, query, cb) -> {
            if (maxPrice == null) return cb.conjunction();

            return cb.lessThanOrEqualTo(root.<Double>get("price"), maxPrice);
        };
    }

    public static Specification<Catalog> byPriceBetween(Double minPrice, Double maxPrice) {
        return (root, query, cb) -> {
            if (minPrice == null || maxPrice == null) return cb.conjunction();

            return cb.between(root.<Double>get("price"), minPrice, maxPrice);
        };
    }

    public static Specification<Catalog> byActivation(Boolean isActive) {
        return (root, query, cb) -> {
            if (isActive == null) return cb.conjunction();

            return cb.equal(root.get("isActive"), isActive);
        };
    }

    public static Specification<Catalog> byCreatedAfter(LocalDate startDate) {
        return (root, query, cb) -> {
            if (startDate == null) return cb.conjunction();

            LocalDateTime startDateTime = startDate.atStartOfDay();

            return cb.greaterThanOrEqualTo(root.get("createdAt"), startDateTime);
        };
    }

    public static Specification<Catalog> byCreatedBefore(LocalDate endDate) {
        return (root, query, cb) -> {
            if (endDate == null) return cb.conjunction();

            LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

            return cb.lessThanOrEqualTo(root.get("createdAt"), endDateTime);
        };
    }

    public static Specification<Catalog> byCreatedBetween(LocalDate startDate, LocalDate endDate) {
        return (root, query, cb) -> {
            if (startDate == null || endDate == null) return cb.conjunction();

            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

            return cb.between(root.get("createdAt"), startDateTime, endDateTime);
        };
    }

}
