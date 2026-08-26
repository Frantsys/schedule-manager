package com.unixforge.schedule_manager.domain.shared;

import com.unixforge.schedule_manager.modules.user.entity.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryDTO {

    private Long id;
    private String name;
    private UserRole role;
    
}