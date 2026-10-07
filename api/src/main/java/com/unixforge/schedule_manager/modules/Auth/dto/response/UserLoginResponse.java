package com.unixforge.schedule_manager.modules.Auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginResponse {

    private String tokenType;
    private String token;

}
