package com.unixforge.schedule_manager.modules.User.dto.response;

import com.unixforge.schedule_manager.modules.User.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserSummaryResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private UserRole role;

}
