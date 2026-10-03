package com.unixforge.schedule_manager.modules.User.dto.response;

import com.unixforge.schedule_manager.modules.User.dto.request.UserAddressCreateRequest;
import com.unixforge.schedule_manager.modules.User.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    
    private Long id;
    private String cpf;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String gender;
    private String course;
    private UserAddressCreateRequest address;
    private LocalDate birthDate;
    private UserRole role;
    private LocalDateTime createdAt;
    private Boolean isActive;

}
