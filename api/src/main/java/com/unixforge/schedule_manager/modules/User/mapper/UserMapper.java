package com.unixforge.schedule_manager.modules.User.mapper;

import com.unixforge.schedule_manager.modules.Auth.dto.request.UserRegisterRequest;
import com.unixforge.schedule_manager.modules.User.dto.request.UserAddressCreateRequest;
import com.unixforge.schedule_manager.modules.User.dto.response.UserResponse;
import com.unixforge.schedule_manager.modules.User.dto.response.UserSummaryResponse;
import com.unixforge.schedule_manager.modules.User.model.User;
import com.unixforge.schedule_manager.modules.User.model.UserAddress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    User toEntity(UserRegisterRequest request);

    UserAddress toAddressEntity(UserAddressCreateRequest request);

    UserResponse toResponse(User user);

    UserSummaryResponse toSummaryResponse(User user);

}
