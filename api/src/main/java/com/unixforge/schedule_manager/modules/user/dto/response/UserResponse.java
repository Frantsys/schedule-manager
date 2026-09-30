package com.unixforge.schedule_manager.modules.user.dto.response;

import java.time.LocalDateTime;

import com.unixforge.schedule_manager.modules.user.dto.request.AddressRequest;
import com.unixforge.schedule_manager.modules.user.entity.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    
    private Long id;
    private String username;
    private String name;
    private String email;
    private String phone;
    private AddressRequest addressDTO;
    private UserRole role;
    private Boolean isActive;
    private LocalDateTime createdAt;

}