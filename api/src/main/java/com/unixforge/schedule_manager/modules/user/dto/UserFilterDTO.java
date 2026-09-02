package com.unixforge.schedule_manager.modules.user.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.unixforge.schedule_manager.modules.user.entity.UserRole;

public record UserFilterDTO(
    String name,
    UserRole role,
    List<UserRole> roles,
    String category,
    Boolean isActive,
    LocalDateTime createdAt
) {}
