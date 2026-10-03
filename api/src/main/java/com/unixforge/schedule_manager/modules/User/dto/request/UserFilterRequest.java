package com.unixforge.schedule_manager.modules.User.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.unixforge.schedule_manager.modules.User.model.UserRole;

public record UserFilterResponse(
        String name,
        UserRole role,
        List<UserRole> roles,
        String category,
        Boolean isActive,
        LocalDate startDate,
        LocalDate endDate
) {}