package com.unixforge.schedule_manager.modules.user.dto;

import java.time.LocalDateTime;

import com.unixforge.schedule_manager.modules.user.entity.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
    
    private Long id;
    private String username;
    private String name;
    private String email;
    private String phone;
    private AddressDTO addressDTO;
    private UserRole role;
    private Boolean isActive;
    private LocalDateTime createdAt;

}