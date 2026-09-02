package com.unixforge.schedule_manager.modules.user.specification;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.unixforge.schedule_manager.modules.user.entity.User;
import com.unixforge.schedule_manager.modules.user.entity.UserRole;

public class UserSpecification {
    
    public static Specification<User> byName(String name){
        return (root, query, cb) -> {
            if (name == null || name.isBlank()) return cb.conjunction();

            return cb.equal(root.get("name"), name);
        };
    }

    public static Specification<User> byRole(UserRole role) {
        return (root, query, cb) -> {
            if (role == null) return cb.conjunction();

            return cb.equal(root.get("role"), role);
        };
    }

    public static Specification<User> byRoles(List<UserRole> roles) {
        return (root, query, cb) -> {
            if (roles == null || roles.isEmpty()) return cb.conjunction();

            return root.get("roles").in(roles);
        };
    }

    public static Specification<User> byCategory(String category) {
        return (root, query, cb) -> {
            if (category == null || category.isBlank()) return cb.conjunction();

            return cb.equal(root.get("categor"), category);
        };
    }

    public static Specification<User> byActivation(Boolean isActive) {
        return (root, query, cb) -> {
            if(isActive == null) return cb.conjunction();

            return cb.equal(root.get("isActive"), isActive);
        };
    }

    public static Specification<User> byCreation(LocalDateTime createdAt) {
        return (root, query, cb) -> {
            if(createdAt == null) return cb.conjunction();

            return cb.lessThanOrEqualTo(root.get("createdAt"), createdAt);
        };
    }


}
