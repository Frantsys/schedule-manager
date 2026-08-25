package com.unixforge.schedule_manager.modules.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserActivationDTO {
    
    @NotNull(message = "Status do usuário não pode ser nulo")
    private Boolean isActive;

}
