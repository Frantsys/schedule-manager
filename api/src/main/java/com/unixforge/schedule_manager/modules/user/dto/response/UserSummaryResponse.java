package com.unixforge.schedule_manager.modules.user.dto.response;

import com.unixforge.schedule_manager.modules.user.entity.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSummaryResponse {

    private Long id;
    private String name;
    private UserRole role;
    
}