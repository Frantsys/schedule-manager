package com.unixforge.schedule_manager.modules.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.unixforge.schedule_manager.modules.user.dto.request.UserCreateRequest;
import com.unixforge.schedule_manager.modules.user.dto.request.UserUpdateRequest;
import com.unixforge.schedule_manager.modules.user.dto.response.UserResponse;
import com.unixforge.schedule_manager.modules.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", source = "password")
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    User toEntity(UserCreateRequest dto);

    @Mapping(target = "addressDTO", source = "address")
    UserResponse toDTO(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "role", ignore = true)
    void updateEntityFromDTO(UserUpdateRequest dto, @MappingTarget User user);


}
