package com.unixforge.schedule_manager.modules.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.unixforge.schedule_manager.modules.user.dto.UserCreateDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserResponseDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserUpdateDTO;
import com.unixforge.schedule_manager.modules.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", source = "password")
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    User toEntity(UserCreateDTO dto);

    @Mapping(target = "addressDTO", source = "address")
    UserResponseDTO toDTO(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "role", ignore = true)
    void updateEntityFromDTO(UserUpdateDTO dto, @MappingTarget User user);


}
