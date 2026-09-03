package com.unixforge.schedule_manager.modules.catalog.specification;

import java.time.LocalDateTime;

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

    public static Specification<Catalog> byPriceGreater(Double price) {
        return (root, query, cb) -> {
            if (price == null) return cb.conjunction();

            return cb.greaterThanOrEqualTo(root.get("price"), price);
        };
    }

    public static Specification<Catalog> byPriceLess(Double price) {
        return (root, query, cb) -> {
            if (price == null) return cb.conjunction();

            return cb.lessThanOrEqualTo(root.get("price"), price);
        };
    }

    public static Specification<Catalog> byActivation(Boolean isActive) {
        return (root, query, cb) -> {
            if(isActive == null) return cb.conjunction();

            return cb.equal(root.get("isActive"), isActive);
        };
    }

    public static Specification<Catalog> byCreationLess(LocalDateTime createdAt) {
        return (root, query, cb) -> {
            if(createdAt == null) return cb.conjunction();

            return cb.lessThanOrEqualTo(root.get("createdAt"), createdAt);
        };
    }

    public static Specification<Catalog> byCreationGreater(LocalDateTime createdAt) {
        return (root, query, cb) -> {
            if(createdAt == null) return cb.conjunction();

            return cb.greaterThanOrEqualTo(root.get("createdAt"), createdAt);
        };
    }

}
